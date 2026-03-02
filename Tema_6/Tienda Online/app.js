const API = 'https://api.escuelajs.co/api/v1'
const categorySelect = document.getElementById('categorySelect')
const productsEl = document.getElementById('products')
const sentinelEl = document.getElementById('infiniteSentinel')
const mainView = document.getElementById('mainView')
const detailView = document.getElementById('detailView')
const detailContent = document.getElementById('detailContent')
const backButton = document.getElementById('backButton')
let state = {
  categoryId: 'all',
  offset: 0,
  limit: 10,
  loading: false,
  end: false,
  products: [],
  scrollY: 0
}
async function getJSON(url) {
  const r = await fetch(url)
  if (!r.ok) throw new Error('Error de red')
  return r.json()
}
function formatPrice(n) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}
function clearProducts() {
  productsEl.innerHTML = ''
}
function createProductCard(p) {
  const card = document.createElement('article')
  card.className = 'product-card'
  const img = document.createElement('img')
  img.className = 'product-image'
  img.src = Array.isArray(p.images) && p.images.length ? p.images[0] : ''
  img.alt = p.title
  const info = document.createElement('div')
  info.className = 'product-info'
  const title = document.createElement('h3')
  title.className = 'product-title'
  title.textContent = p.title
  const price = document.createElement('div')
  price.className = 'product-price'
  price.textContent = formatPrice(p.price)
  info.appendChild(title)
  info.appendChild(price)
  card.appendChild(img)
  card.appendChild(info)
  card.addEventListener('click', () => openDetail(p.id))
  return card
}
function renderProducts(items) {
  const frag = document.createDocumentFragment()
  items.forEach(p => frag.appendChild(createProductCard(p)))
  productsEl.appendChild(frag)
}
async function loadCategories() {
  const cats = await getJSON(`${API}/categories`)
  categorySelect.innerHTML = ''
  const all = document.createElement('option')
  all.value = 'all'
  all.textContent = 'Todas'
  categorySelect.appendChild(all)
  cats.forEach(c => {
    const opt = document.createElement('option')
    opt.value = String(c.id)
    opt.textContent = c.name
    categorySelect.appendChild(opt)
  })
  categorySelect.value = 'all'
  state.categoryId = 'all'
}
async function fetchProducts() {
  const url = new URL(`${API}/products`)
  if (state.categoryId !== 'all') {
    url.searchParams.set('categoryId', String(state.categoryId))
  }
  url.searchParams.set('limit', String(state.limit))
  url.searchParams.set('offset', String(state.offset))
  const items = await getJSON(url.toString())
  return items
}
async function loadInitial() {
  state.offset = 0
  state.end = false
  state.products = []
  clearProducts()
  const items = await fetchProducts()
  state.products = items
  renderProducts(items)
  state.offset += state.limit
}
async function loadMore() {
  if (state.loading || state.end) return
  state.loading = true
  try {
    const items = await fetchProducts()
    if (!items.length) {
      state.end = true
    } else {
      state.products = state.products.concat(items)
      renderProducts(items)
      state.offset += state.limit
    }
  } finally {
    state.loading = false
  }
}
function setupInfiniteScroll() {
  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (e.isIntersecting) {
        loadMore()
      }
    }
  })
  io.observe(sentinelEl)
}
function onCategoryChange() {
  const v = categorySelect.value
  state.categoryId = v === 'all' ? 'all' : Number(v)
  loadInitial()
}
async function openDetail(id) {
  state.scrollY = window.scrollY
  const p = await getJSON(`${API}/products/${id}`)
  const media = document.createElement('img')
  media.className = 'detail-media'
  media.src = Array.isArray(p.images) && p.images.length ? p.images[0] : ''
  media.alt = p.title
  const body = document.createElement('div')
  body.className = 'detail-body'
  const t = document.createElement('h2')
  t.className = 'detail-title'
  t.textContent = p.title
  const pr = document.createElement('div')
  pr.className = 'detail-price'
  pr.textContent = formatPrice(p.price)
  const d = document.createElement('p')
  d.textContent = p.description
  body.appendChild(t)
  body.appendChild(pr)
  body.appendChild(d)
  const grid = document.createElement('div')
  grid.className = 'detail-grid'
  grid.appendChild(media)
  grid.appendChild(body)
  detailContent.innerHTML = ''
  detailContent.appendChild(grid)
  mainView.classList.add('hidden')
  detailView.classList.remove('hidden')
  history.pushState({ view: 'detail', productId: id, app: { ...state } }, '', `#producto-${id}`)
}
function backToList() {
  detailView.classList.add('hidden')
  mainView.classList.remove('hidden')
  window.scrollTo({ top: state.scrollY, behavior: 'instant' })
}
function handlePopState(e) {
  const s = e.state
  if (!s || s.view !== 'detail') {
    backToList()
  } else {
    history.back()
  }
}
function setupEvents() {
  categorySelect.addEventListener('change', onCategoryChange)
  backButton.addEventListener('click', () => {
    history.back()
  })
  window.addEventListener('popstate', () => {
    backToList()
  })
  detailView.addEventListener('click', (e) => {
    if (e.target === detailView) {
      history.back()
    }
  })
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !detailView.classList.contains('hidden')) {
      history.back()
    }
  })
}
async function boot() {
  await loadCategories()
  await loadInitial()
  setupInfiniteScroll()
  setupEvents()
}
boot()
window.app = {
  getJSON,
  loadCategories,
  fetchProducts,
  loadInitial,
  loadMore,
  openDetail,
  backToList,
  state
}
