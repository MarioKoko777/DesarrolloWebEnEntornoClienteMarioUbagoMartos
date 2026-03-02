const btnUpload = document.getElementById('btn-upload');
const fileInput = document.getElementById('file');
const progress = document.getElementById('progress');
const bar = document.getElementById('bar');
const pct = document.getElementById('pct');
const result = document.getElementById('result');
const preview = document.getElementById('preview');

function showResult(msg, ok=true) {
  result.style.display = 'block';
  result.className = ok ? 'ok' : 'ko';
  result.textContent = msg;
}

function resetUI() {
  progress.style.display = 'none';
  bar.style.width = '0%';
  pct.textContent = '0%';
  result.style.display = 'none';
  preview.innerHTML = '';
}

btnUpload.addEventListener('click', async () => {
  resetUI();
  const file = fileInput.files[0];
  if (!file) return showResult('Selecciona un archivo.', false);
  if (!['image/png','image/jpeg'].includes(file.type)) return showResult('Formato no permitido. Usa PNG o JPG.', false);
  if (file.size > 2 * 1024 * 1024) return showResult('El archivo supera 2MB.', false);
  const fd = new FormData();
  fd.append('file', file);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'upload.php');
  xhr.responseType = 'json';
  xhr.upload.onprogress = (e) => {
    if (!e.lengthComputable) return;
    const p = Math.round((e.loaded / e.total) * 100);
    progress.style.display = 'block';
    bar.style.width = p + '%';
    pct.textContent = p + '%';
  };
  xhr.onload = () => {
    const data = xhr.response;
    if (xhr.status >= 200 && xhr.status < 300 && data && data.ok) {
      showResult('Subida correcta: ' + data.filename, true);
      const img = document.createElement('img');
      img.src = data.url;
      img.alt = data.filename;
      preview.appendChild(img);
    } else {
      showResult(data?.error || 'Fallo al subir el archivo.', false);
    }
  };
  xhr.onerror = () => showResult('Error de red durante la subida.', false);
  xhr.send(fd);
});
