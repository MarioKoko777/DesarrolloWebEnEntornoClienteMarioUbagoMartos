const testsRoot = document.createElement('section')
testsRoot.style.padding = '12px'
testsRoot.style.borderTop = '1px solid #242633'
const testsTitle = document.createElement('h2')
testsTitle.textContent = 'Pruebas'
testsTitle.style.fontSize = '18px'
testsTitle.style.margin = '0 0 8px'
const list = document.createElement('ul')
list.style.listStyle = 'none'
list.style.padding = '0'
list.style.margin = '0'
testsRoot.appendChild(testsTitle)
testsRoot.appendChild(list)
document.body.appendChild(testsRoot)
function addResult(name, ok, info) {
  const li = document.createElement('li')
  li.style.padding = '6px 0'
  li.textContent = `${ok ? '✅' : '❌'} ${name}${info ? ' · ' + info : ''}`
  list.appendChild(li)
}
function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'Fallo')
}
async function test(name, fn) {
  try {
    await fn()
    addResult(name, true)
  } catch (e) {
    addResult(name, false, e.message)
  }
}
async function run() {
  await test('Carga categorías', async () => {
    const cs = await app.getJSON('https://api.escuelajs.co/api/v1/categories')
    assert(Array.isArray(cs), 'No es array')
    assert(cs.length > 0, 'Sin categorías')
    assert(typeof cs[0].id === 'number', 'id inválido')
  })
  await test('Primeros 10 productos por categoría fija', async () => {
    app.state.categoryId = 1
    app.state.offset = 0
    const items = await app.fetchProducts()
    assert(Array.isArray(items), 'No es array')
    assert(items.length <= 10, 'longitud incorrecta')
  })
  await test('Scroll infinito carga más', async () => {
    app.state.categoryId = 'all'
    await app.loadInitial()
    const prev = app.state.products.length
    await app.loadMore()
    assert(app.state.products.length >= prev, 'no aumentó')
  })
  await test('Detalle de producto', async () => {
    let items = await app.fetchProducts()
    if (!items.length) {
      app.state.categoryId = 'all'
      app.state.offset = 0
      items = await app.fetchProducts()
    }
    const id = items[0]?.id
    assert(!!id, 'sin id')
    await app.openDetail(id)
    assert(!document.getElementById('detailView').classList.contains('hidden'), 'detalle oculto')
    document.getElementById('detailView').click()
    assert(!document.getElementById('detailView').classList.contains('hidden'), 'detalle debería cerrar con overlay')
    app.backToList()
    assert(!document.getElementById('mainView').classList.contains('hidden'), 'lista oculta')
  })
}
run()
