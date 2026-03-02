const DATA_URL = "mails.json";
const SENT_DATA_URL = "sent.json";
const SEND_URL = "/send";
const POLL_MS = 5000;

function formatDate(iso) {
  return new Date(iso).toLocaleString();
}

function renderItem(m) {
  const $li = $("<li>").addClass("item").attr("data-id", m.id);
  const $left = $("<div>");
  const $from = $("<div>").addClass("from").text(m.from);
  const $subject = $("<div>").addClass("subject").text(m.subject);
  const $preview = $("<div>").addClass("preview").text(m.preview);
  const $right = $("<div>").addClass("right");
  const $date = $("<div>").addClass("meta").text(formatDate(m.date));
  const $pill = $("<div>").addClass("pill").text("Nuevo");
  $left.append($from, $subject, $preview);
  $right.append($date, $pill);
  $li.append($left, $right);
  return $li;
}

function insertSorted($list, items) {
  items.forEach(m => {
    const $el = renderItem(m).addClass("new");
    const $siblings = $list.children();
    if ($siblings.length === 0) {
      $list.append($el);
    } else {
      let placed = false;
      $siblings.each(function() {
        const curText = $(this).find(".meta").text();
        const curDate = new Date(curText);
        if (new Date(m.date) > curDate && !placed) {
          $(this).before($el);
          placed = true;
        }
      });
      if (!placed) $list.append($el);
    }
  });
}

function keyFor(m) {
  return (m.folder || "inbox") + ":" + m.id;
}

$(function() {
  const $list = $("#mail-list");
  const $badge = $("#new-badge");
  const $lastCheck = $("#last-check");
  const $compose = $("#compose");
  const $listSection = $("#list-section");
  const $cancelCompose = $("#cancel-compose");
  const $sendBtn = $("#send-btn");
  const $status = $("#compose-status");
  const $tabInbox = $("#tab-inbox");
  const $tabSent = $("#tab-sent");
  const $tabCompose = $("#tab-compose");
  const $to = $("#to");
  const $subject = $("#subject");
  const $body = $("#body");
  let seen = new Set();
  let activeFolder = "inbox";
  let all = [];

  function setLastCheck() {
    $lastCheck.text("Última comprobación: " + new Date().toLocaleTimeString());
  }

  function byDateDesc(a, b) {
    return new Date(b.date) - new Date(a.date);
  }

  function fetchData(cb) {
    $.ajax({
      url: DATA_URL,
      dataType: "json",
      cache: false
    }).done(cb);
  }

  function renderFolder(folder) {
    $list.empty();
    const items = all.filter(m => (m.folder || "inbox") === folder).sort(byDateDesc);
    items.forEach(m => $list.append(renderItem(m)));
  }

  $.when($.getJSON(DATA_URL), $.getJSON(SENT_DATA_URL)).done(function(inboxData, sentData) {
    const inbox = Array.isArray(inboxData[0]) ? inboxData[0] : [];
    const sent = Array.isArray(sentData[0]) ? sentData[0] : [];
    const normalizedInbox = inbox.map(m => ({ ...m, folder: m.folder || "inbox" }));
    const normalizedSent = sent.map(m => ({ ...m, folder: m.folder || "sent" }));
    const merged = normalizedInbox.concat(normalizedSent).sort(byDateDesc);
    all = merged;
    merged.forEach(m => { seen.add(keyFor(m)); });
    renderFolder(activeFolder);
    setLastCheck();
  }).fail(function() {
    // Fallback a solo inbox si sent.json no existe
    fetchData(function(data) {
      const sorted = (data || []).slice().sort(byDateDesc).map(m => ({ ...m, folder: m.folder || "inbox" }));
      all = sorted;
      sorted.forEach(m => { seen.add(keyFor(m)); });
      renderFolder(activeFolder);
      setLastCheck();
    });
  });

  setInterval(function() {
    $.when($.getJSON(DATA_URL), $.getJSON(SENT_DATA_URL)).done(function(inboxData, sentData) {
      const inbox = Array.isArray(inboxData[0]) ? inboxData[0] : [];
      const sent = Array.isArray(sentData[0]) ? sentData[0] : [];
      const normalized = []
        .concat(inbox.map(m => ({ ...m, folder: m.folder || "inbox" })))
        .concat(sent.map(m => ({ ...m, folder: m.folder || "sent" })));
      const fresh = normalized.filter(m => !seen.has(keyFor(m)));
      if (fresh.length > 0) {
        const ordered = fresh.slice().sort(byDateDesc);
        all = all.concat(ordered).sort(byDateDesc);
        const toShow = ordered.filter(m => (m.folder || "inbox") === activeFolder);
        if (toShow.length > 0) insertSorted($list, toShow);
        ordered.forEach(m => seen.add(keyFor(m)));
        const count = ordered.length;
        $badge.removeClass("hidden").text(count + " nuevos");
        setTimeout(function() { $badge.addClass("hidden"); }, 2500);
      }
      setLastCheck();
    }).fail(function() {
      // Si falla una de las fuentes, intentamos al menos la de inbox
      fetchData(function(data) {
        const normalized = (data || []).map(m => ({ ...m, folder: m.folder || "inbox" }));
        const fresh = normalized.filter(m => !seen.has(keyFor(m)));
        if (fresh.length > 0) {
          const ordered = fresh.slice().sort(byDateDesc);
          all = all.concat(ordered).sort(byDateDesc);
          const toShow = ordered.filter(m => (m.folder || "inbox") === activeFolder);
          if (toShow.length > 0) insertSorted($list, toShow);
          ordered.forEach(m => seen.add(keyFor(m)));
          const count = ordered.length;
          $badge.removeClass("hidden").text(count + " nuevos");
          setTimeout(function() { $badge.addClass("hidden"); }, 2500);
        }
        setLastCheck();
      });
    });
  }, POLL_MS);

  $cancelCompose.on("click", function() {
    $status.text("");
    activateTab("inbox");
  });

  function activateTab(folder) {
    activeFolder = folder;
    const isCompose = folder === "compose";
    $tabInbox.toggleClass("active", folder === "inbox");
    $tabSent.toggleClass("active", folder === "sent");
    $tabCompose.toggleClass("active", isCompose);
    $compose.toggleClass("hidden", !isCompose);
    $listSection.toggleClass("hidden", isCompose);
    if (!isCompose) renderFolder(folder);
  }
  $tabInbox.on("click", function(e) { e.preventDefault(); activateTab("inbox"); });
  $tabSent.on("click", function(e) { e.preventDefault(); activateTab("sent"); });
  $tabCompose.on("click", function(e) { e.preventDefault(); activateTab("compose"); });
  $tabInbox.on("keydown", function(e){ if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activateTab("inbox"); }});
  $tabSent.on("keydown", function(e){ if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activateTab("sent"); }});
  $tabCompose.on("keydown", function(e){ if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activateTab("compose"); }});

  $sendBtn.on("click", function() {
    const payload = {
      to: $to.val().trim(),
      subject: $subject.val().trim(),
      body: $body.val().trim(),
      from: "yo@example.com"
    };
    if (!payload.to || !payload.subject || !payload.body) {
      $status.text("Completa todos los campos.");
      return;
    }
    const allowedPorts = ["8000", "8001"];
    if (!allowedPorts.includes(window.location.port)) {
      $status.text("Abre la app desde http://localhost:8000 o http://localhost:8001");
      return;
    }
    $.ajax({
      url: SEND_URL,
      method: "POST",
      // Usar formulario urlencoded para evitar preflight CORS
      data: payload,
      dataType: "json",
      cache: false
    }).done(function(newMail) {
      all = [newMail].concat(all).sort(byDateDesc);
      seen.add(keyFor(newMail));
      if (activeFolder === "sent" && (newMail.folder || "inbox") === "sent") {
        insertSorted($list, [newMail]);
      }
      $status.text("Enviado");
      $to.val(""); $subject.val(""); $body.val("");
      $compose.addClass("hidden");
      activateTab("sent");
    }).fail(function() {
      $status.text("Error al enviar");
    });
  });
});
