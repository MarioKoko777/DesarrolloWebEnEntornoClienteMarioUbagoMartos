const btn = document.getElementById('loadBtn')
const result = document.getElementById('result')
async function loadContent() {
  btn.disabled = true
  btn.textContent = 'Cargando…'
  result.textContent = ''
  try {
    const r = await fetch('contenido.html', { cache: 'no-cache' })
    if (!r.ok) throw new Error('Error de red')
    const html = await r.text()
    result.innerHTML = html
  } catch (e) {
    result.textContent = 'No se pudo cargar el contenido'
  } finally {
    btn.disabled = false
    btn.textContent = 'Cargar contenido'
  }
}
btn.addEventListener('click', loadContent)
