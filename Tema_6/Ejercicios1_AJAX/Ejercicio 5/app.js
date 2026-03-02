const list = document.getElementById('mailList')
const refreshBtn = document.getElementById('refreshBtn')
const statusEl = document.getElementById('status')
let seen = new Set()
function setStatus(t) { statusEl.textContent = t }
function parseEmails(doc) {
  const items = []
  const nodes = Array.from(doc.getElementsByTagName('email'))
  nodes.forEach(n => {
    const id = Number(n.getAttribute('id'))
    const from = n.getElementsByTagName('from')[0]?.textContent || ''
    const subject = n.getElementsByTagName('subject')[0]?.textContent || ''
    const body = n.getElementsByTagName('body')[0]?.textContent || ''
    const receivedAt = n.getElementsByTagName('receivedAt')[0]?.textContent || ''
    items.push({ id, from, subject, body, receivedAt })
  })
  items.sort((a,b) => (a.receivedAt < b.receivedAt ? 1 : -1))
  return items
}
function createMailItem(m) {
  const li = document.createElement('li')
  li.className = 'mail'
  const fromEl = document.createElement('div')
  fromEl.className = 'from'
  fromEl.textContent = m.from
  const subjectEl = document.createElement('div')
  subjectEl.className = 'subject'
  subjectEl.textContent = m.subject
  const dateEl = document.createElement('div')
  dateEl.className = 'date'
  dateEl.textContent = new Date(m.receivedAt).toLocaleString('es-ES')
  const snippet = document.createElement('div')
  snippet.className = 'snippet'
  snippet.textContent = m.body
  li.appendChild(fromEl)
  li.appendChild(subjectEl)
  li.appendChild(dateEl)
  li.appendChild(snippet)
  return li
}
async function fetchXML(url) {
  const r = await fetch(url, { cache: 'no-cache' })
  if (!r.ok) throw new Error('Error de red')
  const tx = await r.text()
  return new window.DOMParser().parseFromString(tx, 'application/xml')
}
async function updateInbox() {
  setStatus('Actualizando…')
  try {
    const doc = await fetchXML('emails.xml')
    const items = parseEmails(doc)
    const frag = document.createDocumentFragment()
    let added = 0
    items.forEach(m => {
      if (!seen.has(m.id)) {
        seen.add(m.id)
        frag.appendChild(createMailItem(m))
        added++
      }
    })
    if (added) list.insertBefore(frag, list.firstChild)
    setStatus(added ? `Añadidos ${added} correos` : 'Sin correos nuevos')
  } catch {
    setStatus('Error al actualizar')
  }
}
function boot() {
  updateInbox()
  setInterval(updateInbox, 5000)
  refreshBtn.addEventListener('click', updateInbox)
}
boot()
