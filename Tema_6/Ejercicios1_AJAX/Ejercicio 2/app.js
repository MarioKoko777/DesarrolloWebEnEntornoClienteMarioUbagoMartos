const urlInput = document.getElementById('urlInput')
const fetchBtn = document.getElementById('fetchBtn')
const stateZone = document.getElementById('stateZone')
const headersZone = document.getElementById('headersZone')
const codeZone = document.getElementById('codeZone')
const fileContent = document.getElementById('fileContent')
function readyLabel(n) {
  if (n === 0) return 'No inicializada'
  if (n === 1) return 'Cargando'
  if (n === 2) return 'Cabeceras recibidas'
  if (n === 3) return 'Descargando'
  if (n === 4) return 'Completada'
  return String(n)
}
function setInitialUrl() {
  try {
    urlInput.value = location.href
  } catch {
    urlInput.value = ''
  }
}
function clearZones() {
  stateZone.textContent = ''
  headersZone.textContent = ''
  codeZone.textContent = ''
  fileContent.textContent = ''
}
function fetchURL() {
  const url = urlInput.value.trim()
  if (!url) return
  clearZones()
  fetchBtn.disabled = true
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    stateZone.textContent = readyLabel(xhr.readyState)
    if (xhr.readyState === 2) {
      headersZone.textContent = xhr.getAllResponseHeaders()
    }
    if (xhr.readyState === 4) {
      codeZone.textContent = `${xhr.status} ${xhr.statusText || ''}`.trim()
      fileContent.textContent = xhr.responseText || ''
      fetchBtn.disabled = false
    }
  }
  xhr.onerror = function () {
    stateZone.textContent = 'Error'
    fetchBtn.disabled = false
  }
  xhr.open('GET', url, true)
  xhr.send()
}
document.addEventListener('DOMContentLoaded', setInitialUrl)
fetchBtn.addEventListener('click', fetchURL)
