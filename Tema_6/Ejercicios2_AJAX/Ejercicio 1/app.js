const form = document.getElementById('form-validacion');
const btnGet = document.getElementById('btn-get');
const btnPost = document.getElementById('btn-post');
const resultado = document.getElementById('resultado');

function showLoading() {
  resultado.style.display = 'block';
  resultado.textContent = 'Validando...';
}

async function send(method) {
  const data = new FormData(form);
  const params = new URLSearchParams(data);
  showLoading();
  try {
    const url = method === 'GET' ? `validate.php?${params.toString()}` : 'validate.php';
    const res = await fetch(url, {
      method,
      headers: method === 'POST' ? { 'Accept': 'text/html' } : undefined,
      body: method === 'POST' ? params : undefined,
    });
    const html = await res.text();
    resultado.innerHTML = html;
  } catch (err) {
    resultado.textContent = 'Error realizando la validación';
  }
}

btnGet.addEventListener('click', () => send('GET'));
btnPost.addEventListener('click', () => send('POST'));
