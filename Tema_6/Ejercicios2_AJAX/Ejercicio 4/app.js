const form = document.getElementById('form-registro');
const btnCheck = document.getElementById('btn-check');
const usernameInput = document.getElementById('username');
const resultado = document.getElementById('resultado');

function show(msg, ok) {
  resultado.style.display = 'block';
  resultado.className = ok ? 'hint ok' : 'hint ko';
  resultado.textContent = msg;
}

async function checkAvailability(name) {
  try {
    const res = await fetch(`availability.php?username=${encodeURIComponent(name)}`, {
      headers: { 'Accept': 'application/json' }
    });
    const data = await res.json();
    if (data.available) {
      show(`El nombre "${data.username}" está disponible.`, true);
    } else {
      const s = (data.suggestions || []).join(', ');
      show(`El nombre "${data.username}" NO está disponible.${s ? ' Sugerencias: '+s : ''}`, false);
    }
  } catch {
    show('Error comprobando disponibilidad.', false);
  }
}

btnCheck.addEventListener('click', () => {
  const name = usernameInput.value.trim();
  if (!name) return show('Introduce un nombre de usuario.', false);
  show('Comprobando disponibilidad...', true);
  checkAvailability(name);
});

let timer;
usernameInput.addEventListener('input', () => {
  clearTimeout(timer);
  const name = usernameInput.value.trim();
  if (name.length < 3) return;
  timer = setTimeout(() => {
    show('Comprobando disponibilidad...', true);
    checkAvailability(name);
  }, 500);
});
