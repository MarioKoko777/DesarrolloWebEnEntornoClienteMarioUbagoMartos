const municipioInput = document.getElementById('municipio');
const datalist = document.getElementById('lista-municipios');
const btnDaily = document.getElementById('btn-daily');
const btnHourly = document.getElementById('btn-hourly');
const result = document.getElementById('result');
const codeEl = document.getElementById('code');
let municipios = [];
let selected = null;

function setCode(code, name) {
  codeEl.textContent = code ? `Código municipio: ${code} (${name})` : '';
}

async function loadMunicipios() {
  result.textContent = 'Cargando municipios...';
  try {
    const res = await fetch('aemet.php?action=municipios');
    const data = await res.json();
    municipios = data;
    datalist.innerHTML = municipios.map(m => `<option value="${m.nombre} (${m.provincia})" data-id="${m.id}"></option>`).join('');
    result.textContent = '';
  } catch {
    result.innerHTML = '<div class="error">No se pudieron cargar los municipios. Revisa la API key.</div>';
  }
}

function findSelected() {
  const val = municipioInput.value.trim();
  const match = municipios.find(m => val.includes(m.nombre) && val.includes(m.provincia)) ||
    municipios.find(m => m.id === val);
  selected = match || null;
  setCode(selected?.id, selected?.nombre);
  return selected?.id;
}

function renderDaily(json) {
  const p = json[0];
  if (!p) return result.textContent = 'Sin datos';
  const head = `<div class="grid">
    <div>Municipio</div><div>${p.nombre} (${p.provincia})</div>
    <div>Elaborado</div><div>${p.elaborado}</div>
  </div>`;
  const days = p.prediccion?.dia || [];
  const cards = days.map(d => {
    const fecha = d.fecha;
    const max = d.temperatura?.maxima ?? '';
    const min = d.temperatura?.minima ?? '';
    const estado = (d.estadoCielo?.[0]?.descripcion) || (d.estadoCielo?.descripcion) || '';
    const prob = d.probPrecipitacion?.[0]?.value ?? '';
    return `<div class="card">
      <div class="title">${fecha}</div>
      <div class="small">${estado || '—'}</div>
      <div>Temp máx: ${max}°C</div>
      <div>Temp mín: ${min}°C</div>
      <div>Prob. precipitación: ${prob || '—'}%</div>
    </div>`;
  }).join('');
  result.innerHTML = head + `<div class="days">${cards}</div>`;
}

function renderHourly(json) {
  const p = json[0];
  if (!p) return result.textContent = 'Sin datos';
  const head = `<div class="grid">
    <div>Municipio</div><div>${p.nombre} (${p.provincia})</div>
    <div>Elaborado</div><div>${p.elaborado}</div>
  </div>`;
  const days = p.prediccion?.dia || [];
  const sections = days.map(d => {
    const horas = d.temperatura?.dato || [];
    const estados = d.estadoCielo?.[0]?.periodo ? d.estadoCielo : [];
    const rows = horas.map(h => `<div>${h.hora}:00 — ${h.value}°C</div>`).join('');
    return `<div class="card"><div class="title">${d.fecha}</div>${rows}</div>`;
  }).join('');
  result.innerHTML = head + `<div class="days">${sections}</div>`;
}

async function run(type) {
  const id = findSelected();
  if (!id) return result.innerHTML = '<div class="error">Selecciona un municipio de la lista o escribe su código.</div>';
  result.textContent = 'Consultando AEMET...';
  try {
    const res = await fetch(`aemet.php?action=${type}&id=${encodeURIComponent(id)}`);
    const data = await res.json();
    if (type === 'diaria') renderDaily(data);
    else renderHourly(data);
  } catch {
    result.innerHTML = '<div class="error">No se pudo obtener la predicción. Revisa la API key.</div>';
  }
}

btnDaily.addEventListener('click', () => run('diaria'));
btnHourly.addEventListener('click', () => run('horaria'));
municipioInput.addEventListener('change', findSelected);
loadMunicipios();
