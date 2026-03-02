const STORAGE_KEY = "todo_jquery_notes";
const PRIORITY_ORDER = { High: 3, Normal: 2, Low: 1 };

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function nowISO() {
  return new Date().toISOString();
}

function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleString();
}

function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

function saveNotes(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function sortNotes(list) {
  return list.slice().sort((a, b) => {
    const byPriority = PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
    if (byPriority !== 0) return byPriority;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}

function render(list, animateNewId) {
  const $ul = $("#todo-list");
  $ul.empty();
  const sorted = sortNotes(list);
  sorted.forEach(n => {
    const $li = $("<li>").addClass("todo-item").attr("data-id", n.id);
    if (n.completed) $li.addClass("completed");
    if (animateNewId && n.id === animateNewId) $li.addClass("new");

    const $circle = $("<div>").addClass("circle").attr("title", "Completar");
    const $text = $("<div>").addClass("text").text(n.text);
    const $meta = $("<div>").addClass("meta").text(formatTime(n.createdAt));

    const $actions = $("<div>").addClass("actions");
    const $btnLow = $("<button>").addClass("priority-btn priority-low").text("Low");
    const $btnNormal = $("<button>").addClass("priority-btn priority-normal").text("Normal");
    const $btnHigh = $("<button>").addClass("priority-btn priority-high").text("High");
    const $del = $("<button>").addClass("delete").attr("title", "Eliminar").html("&#10005;");

    $actions.append($btnLow, $btnNormal, $btnHigh);
    $li.append($circle, $text, $meta, $actions, $del);
    $ul.append($li);
  });
  updateCounter(list);
}

function updateCounter(list) {
  const total = list.length;
  const pending = list.filter(n => !n.completed).length;
  $("#counter").text(`Pendientes: ${pending} / Total: ${total}`);
}

$(function() {
  let notes = loadNotes();
  render(notes);

  $("#new-todo").on("keydown", function(e) {
    if (e.key === "Enter") {
      const text = $(this).val().trim();
      if (!text) return;
      const pr = $("#new-priority").val() || "Normal";
      const n = { id: uid(), text, priority: pr, createdAt: nowISO(), completed: false };
      notes.push(n);
      saveNotes(notes);
      $(this).val("");
      render(notes, n.id);
    }
  });
  
  $("#add-btn").on("click", function() {
    const $input = $("#new-todo");
    const text = $input.val().trim();
    if (!text) return;
    const pr = $("#new-priority").val() || "Normal";
    const n = { id: uid(), text, priority: pr, createdAt: nowISO(), completed: false };
    notes.push(n);
    saveNotes(notes);
    $input.val("");
    render(notes, n.id);
  });

  $("#todo-list").on("click", ".circle", function() {
    const id = $(this).closest(".todo-item").data("id");
    notes = notes.map(n => n.id === id ? { ...n, completed: !n.completed } : n);
    saveNotes(notes);
    render(notes);
  });

  $("#todo-list").on("click", ".delete", function() {
    const id = $(this).closest(".todo-item").data("id");
    notes = notes.filter(n => n.id !== id);
    saveNotes(notes);
    render(notes);
  });

  $("#todo-list").on("click", ".priority-btn", function() {
    const id = $(this).closest(".todo-item").data("id");
    const newPriority = $(this).text();
    notes = notes.map(n => n.id === id ? { ...n, priority: newPriority } : n);
    saveNotes(notes);
    render(notes);
  });

  $("#clear-completed").on("click", function(e) {
    e.preventDefault();
    const hasCompleted = notes.some(n => n.completed);
    if (!hasCompleted) return;
    notes = notes.filter(n => !n.completed);
    saveNotes(notes);
    render(notes);
  });
});
