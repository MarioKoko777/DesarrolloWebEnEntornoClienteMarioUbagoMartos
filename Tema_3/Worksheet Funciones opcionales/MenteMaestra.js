document.addEventListener("DOMContentLoaded", () => {
  const root = document.createElement("div");
  root.style.maxWidth = "800px";
  root.style.margin = "24px auto";
  root.style.fontFamily = "system-ui, -apple-system, Segoe UI, Roboto, Arial";
  root.style.color = "#222";
  document.body.appendChild(root);

  const state = {
    type: "emojis",
    allowedCount: 6,
    codeLen: 4,
    maxAttempts: 15,
    attemptsLeft: 15,
    ascending: false,
    allowed: [],
    code: [],
    guess: [],
    guesses: [],
    finished: false,
    won: false,
    history: [],
    customTokens: [],
  };

  const emojiPalette = ["🔴","🔵","🟢","🟡","🟣","🟠","🟤"];
  const blackHint = "⚫️";
  const whiteHint = "⚪️";

  const header = document.createElement("h2");
  header.textContent = "Mente Maestra";
  header.style.margin = "0 0 12px";
  root.appendChild(header);

  const settings = document.createElement("div");
  settings.style.display = "grid";
  settings.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))";
  settings.style.gap = "12px";
  settings.style.padding = "12px";
  settings.style.border = "1px solid #ddd";
  settings.style.borderRadius = "8px";
  root.appendChild(settings);

  const typeLabel = document.createElement("label");
  typeLabel.textContent = "Tipo de valores";
  const typeSelect = document.createElement("select");
  ["emojis","letras","numeros","personalizado"].forEach(t => {
    const o = document.createElement("option");
    o.value = t;
    o.textContent = t.charAt(0).toUpperCase() + t.slice(1);
    typeSelect.appendChild(o);
  });
  const typeWrap = document.createElement("div");
  typeWrap.appendChild(typeLabel);
  typeWrap.appendChild(typeSelect);
  settings.appendChild(typeWrap);

  const countLabel = document.createElement("label");
  countLabel.textContent = "Cantidad de valores (6–8)";
  const countInput = document.createElement("input");
  countInput.type = "number";
  countInput.min = "6";
  countInput.max = "8";
  countInput.value = "6";
  const countWrap = document.createElement("div");
  countWrap.appendChild(countLabel);
  countWrap.appendChild(countInput);
  settings.appendChild(countWrap);

  const codeLenLabel = document.createElement("label");
  codeLenLabel.textContent = "Longitud del código";
  const codeLenInput = document.createElement("input");
  codeLenInput.type = "number";
  codeLenInput.min = "3";
  codeLenInput.max = "6";
  codeLenInput.value = "4";
  const codeLenWrap = document.createElement("div");
  codeLenWrap.appendChild(codeLenLabel);
  codeLenWrap.appendChild(codeLenInput);
  settings.appendChild(codeLenWrap);

  const attemptsLabel = document.createElement("label");
  attemptsLabel.textContent = "Intentos (por defecto 15)";
  const attemptsInput = document.createElement("input");
  attemptsInput.type = "number";
  attemptsInput.min = "5";
  attemptsInput.max = "30";
  attemptsInput.value = "15";
  const attemptsWrap = document.createElement("div");
  attemptsWrap.appendChild(attemptsLabel);
  attemptsWrap.appendChild(attemptsInput);
  settings.appendChild(attemptsWrap);

  const orderLabel = document.createElement("label");
  orderLabel.textContent = "Orden de jugadas";
  const orderSelect = document.createElement("select");
  [["desc","Descendente (última arriba)"],["asc","Ascendente (primera arriba)"]].forEach(([v,t])=>{
    const o = document.createElement("option");
    o.value = v;
    o.textContent = t;
    orderSelect.appendChild(o);
  });
  const orderWrap = document.createElement("div");
  orderWrap.appendChild(orderLabel);
  orderWrap.appendChild(orderSelect);
  settings.appendChild(orderWrap);

  const customLabel = document.createElement("label");
  customLabel.textContent = "Valores personalizados (separados por espacio)";
  const customInput = document.createElement("textarea");
  customInput.rows = 2;
  customInput.placeholder = "Ej: rojo azul verde amarillo morado naranja";
  const customWrap = document.createElement("div");
  customWrap.appendChild(customLabel);
  customWrap.appendChild(customInput);
  settings.appendChild(customWrap);

  const actions = document.createElement("div");
  actions.style.display = "flex";
  actions.style.gap = "8px";
  actions.style.marginTop = "12px";
  const startBtn = document.createElement("button");
  startBtn.textContent = "Comenzar";
  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reiniciar";
  const continueBtn = document.createElement("button");
  continueBtn.textContent = "Nueva partida";
  continueBtn.disabled = true;
  actions.appendChild(startBtn);
  actions.appendChild(resetBtn);
  actions.appendChild(continueBtn);
  root.appendChild(actions);

  const info = document.createElement("div");
  info.style.margin = "12px 0";
  info.style.minHeight = "24px";
  root.appendChild(info);

  const board = document.createElement("div");
  board.style.display = "grid";
  board.style.gridTemplateColumns = "1fr";
  board.style.gap = "12px";
  root.appendChild(board);

  const paletteWrap = document.createElement("div");
  const paletteTitle = document.createElement("div");
  paletteTitle.textContent = "Valores disponibles";
  paletteTitle.style.fontWeight = "600";
  const palette = document.createElement("div");
  palette.style.display = "flex";
  palette.style.flexWrap = "wrap";
  palette.style.gap = "8px";
  paletteWrap.appendChild(paletteTitle);
  paletteWrap.appendChild(palette);
  board.appendChild(paletteWrap);

  const guessWrap = document.createElement("div");
  const guessTitle = document.createElement("div");
  guessTitle.textContent = "Intento actual";
  guessTitle.style.fontWeight = "600";
  const guessInput = document.createElement("input");
  guessInput.type = "text";
  guessInput.placeholder = "Haz clic en los valores o escribe separados por espacio";
  guessInput.style.width = "100%";
  guessInput.style.padding = "8px";
  const guessActions = document.createElement("div");
  guessActions.style.display = "flex";
  guessActions.style.gap = "8px";
  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Enviar intento";
  const clearBtn = document.createElement("button");
  clearBtn.textContent = "Borrar";
  guessActions.appendChild(submitBtn);
  guessActions.appendChild(clearBtn);
  guessWrap.appendChild(guessTitle);
  guessWrap.appendChild(guessInput);
  guessWrap.appendChild(guessActions);
  board.appendChild(guessWrap);

  const attemptsInfo = document.createElement("div");
  attemptsInfo.style.fontWeight = "600";
  attemptsInfo.style.marginTop = "4px";
  board.appendChild(attemptsInfo);

  const listWrap = document.createElement("div");
  const listTitle = document.createElement("div");
  listTitle.textContent = "Jugadas";
  listTitle.style.fontWeight = "600";
  const list = document.createElement("div");
  list.style.display = "flex";
  list.style.flexDirection = "column";
  list.style.gap = "6px";
  listWrap.appendChild(listTitle);
  listWrap.appendChild(list);
  board.appendChild(listWrap);

  const reveal = document.createElement("div");
  reveal.style.fontWeight = "600";
  reveal.style.marginTop = "8px";
  board.appendChild(reveal);

  const historyWrap = document.createElement("div");
  historyWrap.style.marginTop = "16px";
  const historyTitle = document.createElement("div");
  historyTitle.textContent = "Historial de partidas";
  historyTitle.style.fontWeight = "600";
  const historyList = document.createElement("div");
  historyList.style.display = "flex";
  historyList.style.flexDirection = "column";
  historyList.style.gap = "4px";
  historyWrap.appendChild(historyTitle);
  historyWrap.appendChild(historyList);
  root.appendChild(historyWrap);

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function genAllowed(type, count, custom) {
    if (type === "emojis") {
      return emojiPalette.slice(0, Math.min(count, emojiPalette.length));
    }
    if (type === "letras") {
      const arr = [];
      for (let i = 0; i < 26; i++) arr.push(String.fromCharCode(65 + i));
      return arr.slice(0, count);
    }
    if (type === "numeros") {
      const arr = [];
      for (let i = 0; i < 10; i++) arr.push(String(i));
      return arr.slice(0, count);
    }
    const tokens = custom.map(t => t.trim()).filter(t => t.length > 0);
    return tokens.slice(0, count);
  }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pickCode(allowed, len) {
    const arr = shuffle([...allowed]);
    return arr.slice(0, len);
  }

  function renderPalette() {
    palette.innerHTML = "";
    state.allowed.forEach(sym => {
      const b = document.createElement("button");
      b.textContent = sym;
      b.style.padding = "8px 12px";
      b.style.fontSize = "18px";
      b.disabled = state.guess.includes(sym) || state.finished;
      b.addEventListener("click", () => {
        if (state.finished) return;
        if (state.guess.length >= state.codeLen) return;
        if (state.guess.includes(sym)) return;
        state.guess.push(sym);
        guessInput.value = state.guess.join(" ");
        renderPalette();
      });
      palette.appendChild(b);
    });
  }

  function parseGuessInput() {
    const raw = guessInput.value.trim();
    if (!raw) return [];
    const parts = raw.split(/\s+/);
    return parts;
  }

  function computeHint(code, guess) {
    let black = 0;
    for (let i = 0; i < code.length; i++) {
      if (guess[i] === code[i]) black++;
    }
    const setCode = new Set(code);
    let common = 0;
    guess.forEach(g => {
      if (setCode.has(g)) common++;
    });
    let white = common - black;
    if (white < 0) white = 0;
    return { black, white };
  }

  function renderGuesses() {
    list.innerHTML = "";
    const items = state.guesses.map(g => g);
    const ordered = state.ascending ? items : items.slice().reverse();
    ordered.forEach(entry => {
      const row = document.createElement("div");
      row.style.display = "flex";
      row.style.justifyContent = "space-between";
      row.style.alignItems = "center";
      row.style.padding = "8px";
      row.style.border = "1px solid #eee";
      row.style.borderRadius = "6px";
      const left = document.createElement("div");
      left.textContent = entry.guess.join("") + " | " + blackHint.repeat(entry.hint.black) + whiteHint.repeat(entry.hint.white);
      const right = document.createElement("div");
      right.textContent = "Restantes: " + entry.remaining;
      row.appendChild(left);
      row.appendChild(right);
      list.appendChild(row);
    });
  }

  function updateAttemptsInfo() {
    attemptsInfo.textContent = "Intentos restantes: " + state.attemptsLeft + " de " + state.maxAttempts;
  }

  function endGame(win) {
    state.finished = true;
    state.won = win;
    continueBtn.disabled = false;
    reveal.textContent = "Código: " + state.code.join("");
    info.textContent = win ? "¡Código descifrado!" : "Sin intentos. Fin de la partida.";
    saveHistory();
    renderPalette();
  }

  function validateGuess(guess) {
    if (guess.length !== state.codeLen) return "La secuencia debe tener longitud " + state.codeLen;
    const set = new Set(guess);
    if (set.size !== guess.length) return "No se permiten valores repetidos";
    for (const g of guess) {
      if (!state.allowed.includes(g)) return "Valor inválido: " + g;
    }
    return null;
  }

  function submitGuess() {
    if (state.finished) return;
    const fromInput = parseGuessInput();
    const guessArr = fromInput.length ? fromInput : state.guess.slice();
    const err = validateGuess(guessArr);
    if (err) {
      info.textContent = err;
      return;
    }
    const hint = computeHint(state.code, guessArr);
    state.attemptsLeft -= 1;
    state.guesses.push({ guess: guessArr, hint, remaining: state.attemptsLeft });
    renderGuesses();
    updateAttemptsInfo();
    guessInput.value = "";
    state.guess = [];
    renderPalette();
    info.textContent = "Intento registrado";
    if (hint.black === state.codeLen) {
      endGame(true);
      return;
    }
    if (state.attemptsLeft <= 0) {
      endGame(false);
      return;
    }
  }

  function startGame() {
    const t = typeSelect.value;
    const count = clamp(parseInt(countInput.value || "6", 10), 6, 8);
    const codeLen = clamp(parseInt(codeLenInput.value || "4", 10), 3, 6);
    const attempts = clamp(parseInt(attemptsInput.value || "15", 10), 5, 30);
    const asc = orderSelect.value === "asc";
    let customTokens = [];
    if (t === "personalizado") {
      customTokens = customInput.value.trim().split(/\s+/).filter(x=>x.length>0);
      if (customTokens.length < 6 || customTokens.length > 8) {
        info.textContent = "En personalizado, define entre 6 y 8 valores";
        return;
      }
    }
    if (t === "emojis" && count > emojiPalette.length) {
      info.textContent = "Emojis disponibles: " + emojiPalette.length;
      return;
    }
    if (codeLen > count) {
      info.textContent = "La longitud del código no puede exceder la cantidad de valores";
      return;
    }
    state.type = t;
    state.allowedCount = count;
    state.codeLen = codeLen;
    state.maxAttempts = attempts;
    state.attemptsLeft = attempts;
    state.ascending = asc;
    state.customTokens = customTokens;
    state.allowed = genAllowed(t, count, customTokens);
    state.code = pickCode(state.allowed, codeLen);
    state.guess = [];
    state.guesses = [];
    state.finished = false;
    state.won = false;
    info.textContent = "Partida iniciada";
    reveal.textContent = "";
    continueBtn.disabled = true;
    renderPalette();
    renderGuesses();
    updateAttemptsInfo();
  }

  function resetGame() {
    guessInput.value = "";
    state.guess = [];
    state.guesses = [];
    state.finished = false;
    state.won = false;
    state.attemptsLeft = state.maxAttempts;
    reveal.textContent = "";
    info.textContent = "Reiniciado. Presiona Comenzar para nuevo código";
    renderPalette();
    renderGuesses();
    updateAttemptsInfo();
    continueBtn.disabled = true;
  }

  function continueGame() {
    startGame();
  }

  function saveHistory() {
    const item = {
      ts: Date.now(),
      won: state.won,
      attemptsUsed: state.maxAttempts - state.attemptsLeft,
      maxAttempts: state.maxAttempts,
      codeLen: state.codeLen,
      type: state.type,
      allowedCount: state.allowedCount
    };
    const key = "MM_history";
    let arr = [];
    try {
      const raw = localStorage.getItem(key);
      if (raw) arr = JSON.parse(raw) || [];
    } catch {}
    arr.push(item);
    try {
      localStorage.setItem(key, JSON.stringify(arr));
    } catch {}
    renderHistory();
  }

  function renderHistory() {
    historyList.innerHTML = "";
    const key = "MM_history";
    let arr = [];
    try {
      const raw = localStorage.getItem(key);
      if (raw) arr = JSON.parse(raw) || [];
    } catch {}
    arr.slice().reverse().forEach(h => {
      const row = document.createElement("div");
      row.style.display = "flex";
      row.style.justifyContent = "space-between";
      row.style.border = "1px solid #eee";
      row.style.borderRadius = "6px";
      row.style.padding = "6px 8px";
      const left = document.createElement("div");
      const date = new Date(h.ts).toLocaleString();
      left.textContent = (h.won ? "Ganada" : "Perdida") + " • Intentos: " + h.attemptsUsed + "/" + h.maxAttempts + " • Código: " + h.codeLen + " • Tipo: " + h.type + " • Valores: " + h.allowedCount;
      const right = document.createElement("div");
      right.textContent = date;
      row.appendChild(left);
      row.appendChild(right);
      historyList.appendChild(row);
    });
  }

  typeSelect.addEventListener("change", () => {
    const t = typeSelect.value;
    const isCustom = t === "personalizado";
    customWrap.style.display = isCustom ? "block" : "none";
    const max = t === "emojis" ? emojiPalette.length : 8;
    countInput.max = String(max);
    if (parseInt(countInput.value,10) > max) countInput.value = String(max);
  });
  countInput.addEventListener("input", () => {
    countInput.value = String(clamp(parseInt(countInput.value||"6",10), parseInt(countInput.min,10), parseInt(countInput.max,10)));
  });
  codeLenInput.addEventListener("input", () => {
    codeLenInput.value = String(clamp(parseInt(codeLenInput.value||"4",10), parseInt(codeLenInput.min,10), parseInt(codeLenInput.max,10)));
  });
  attemptsInput.addEventListener("input", () => {
    attemptsInput.value = String(clamp(parseInt(attemptsInput.value||"15",10), parseInt(attemptsInput.min,10), parseInt(attemptsInput.max,10)));
  });

  startBtn.addEventListener("click", startGame);
  resetBtn.addEventListener("click", resetGame);
  continueBtn.addEventListener("click", continueGame);
  submitBtn.addEventListener("click", submitGuess);
  clearBtn.addEventListener("click", () => {
    state.guess = [];
    guessInput.value = "";
    renderPalette();
  });
  guessInput.addEventListener("input", () => {
    const parts = parseGuessInput();
    const unique = new Set(parts);
    if (parts.length !== unique.size) info.textContent = "No se permiten valores repetidos";
    else info.textContent = "";
    state.guess = parts;
    renderPalette();
  });

  customWrap.style.display = "none";
  renderHistory();
});