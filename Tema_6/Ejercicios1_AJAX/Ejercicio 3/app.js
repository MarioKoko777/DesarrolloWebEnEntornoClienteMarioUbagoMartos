const gallery = document.getElementById('gallery')
const statusEl = document.getElementById('status')
function setStatus(t) { statusEl.textContent = t }
function clearGallery() { gallery.innerHTML = '' }
function renderImages(doc) {
  clearGallery()
  if (!doc) return
  const imgs = Array.from(doc.getElementsByTagName('image'))
  if (!imgs.length) {
    setStatus('Sin imágenes')
    return
  }
  const frag = document.createDocumentFragment()
  imgs.forEach(node => {
    const url = node.getAttribute('url') || node.textContent || ''
    const alt = node.getAttribute('alt') || ''
    const img = document.createElement('img')
    img.className = 'photo'
    img.src = url
    img.alt = alt
    frag.appendChild(img)
  })
  gallery.appendChild(frag)
  setStatus(`Cargadas ${imgs.length} imágenes`)
}
function loadSet(name) {
  setStatus('Cargando XML…')
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        renderImages(xhr.responseXML)
      } else {
        setStatus(`Error ${xhr.status} ${xhr.statusText}`)
        clearGallery()
      }
    }
  }
  xhr.onerror = function () {
    setStatus('Error de red')
    clearGallery()
  }
  xhr.open('GET', `${name}.xml`, true)
  xhr.overrideMimeType('text/xml')
  xhr.send()
}
document.querySelectorAll('button[data-set]').forEach(btn => {
  btn.addEventListener('click', () => loadSet(btn.dataset.set))
})
