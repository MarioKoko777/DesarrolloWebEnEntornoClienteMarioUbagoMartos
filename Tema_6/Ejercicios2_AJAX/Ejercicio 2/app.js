const form = document.getElementById('form-validacion');
const btnGet = document.getElementById('btn-get');
const btnPost = document.getElementById('btn-post');
const resultado = document.getElementById('resultado');

function showLoading() {
  resultado.style.display = 'block';
  resultado.textContent = 'Validando...';
}

function render(xmlDoc) {
  const getText = (tag) => xmlDoc.querySelector(tag)?.textContent ?? '';
  const getValid = (tag) => (xmlDoc.querySelector(tag)?.getAttribute('valid') ?? 'false') === 'true';
  const method = getText('method');
  const birth = getText('birth');
  const zip = getText('zip');
  const phone = getText('phone');
  const vBirth = getValid('birth');
  const vZip = getValid('zip');
  const vPhone = getValid('phone');
  resultado.innerHTML = `
    <h2>Resultado de validación (XML)</h2>
    <div class="grid">
      <div>Método</div><div>${method}</div>
      <div>Fecha</div><div>[${birth}] ${vBirth ? 'SI es válido' : 'NO es válido'}</div>
      <div>Código postal</div><div>[${zip}] ${vZip ? 'SI es válido' : 'NO es válido'}</div>
      <div>Teléfono</div><div>[${phone}] ${vPhone ? 'SI es válido' : 'NO es válido'}</div>
    </div>`;
}

async function send(method) {
  const data = new FormData(form);
  const params = new URLSearchParams(data);
  showLoading();
  try {
    const url = method === 'GET' ? `validate.php?${params.toString()}` : 'validate.php';
    const res = await fetch(url, {
      method,
      headers: { 'Accept': 'application/xml' },
      body: method === 'POST' ? params : undefined,
    });
    const text = await res.text();
    const xml = new DOMParser().parseFromString(text, 'application/xml');
    render(xml);
  } catch {
    resultado.textContent = 'Error realizando la validación';
  }
}

btnGet.addEventListener('click', () => send('GET'));
btnPost.addEventListener('click', () => send('POST'));
