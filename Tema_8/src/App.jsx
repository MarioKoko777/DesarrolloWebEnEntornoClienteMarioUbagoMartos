import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation, useParams } from 'react-router-dom'

function Menu() {
  const loc = useLocation()
  const path = loc.pathname
  const isActive = (p) => path.startsWith(p)
  return (
    <nav className="menu">
      <Link to="/react/1" className={'menu-item' + (isActive('/react/1') ? ' active' : '')}>React 1</Link>
      <Link to="/react/2" className={'menu-item' + (isActive('/react/2') ? ' active' : '')}>React 2</Link>
      <Link to="/react/3" className={'menu-item' + (isActive('/react/3') ? ' active' : '')}>React 3</Link>
      <Link to="/react/4" className={'menu-item' + (isActive('/react/4') ? ' active' : '')}>React 4</Link>
    </nav>
  )
}

const react1Modules = import.meta.glob('./exercises/react1/ex*.jsx')
const react2Modules = import.meta.glob('./exercises/react2/ex*.jsx')
const react3Modules = import.meta.glob('./exercises/react3/ex*.jsx')
const PRODUCTS = [
  {
    id: 'p1',
    name: 'Alika Chair',
    price: 599,
    image: 'https://via.placeholder.com/120x120/e5e7eb/111827?text=Chair',
    variants: [
      { id: 'v1', color: 'Gris', colorHex: '#e5e7eb', image: 'https://via.placeholder.com/400x400/e5e7eb/111827?text=Alika+Gris', stock: 3 },
      { id: 'v2', color: 'Azul', colorHex: '#1e3a8a', image: 'https://via.placeholder.com/400x400/1e3a8a/ffffff?text=Alika+Azul', stock: 2 },
      { id: 'v3', color: 'Negro', colorHex: '#000000', image: 'https://via.placeholder.com/400x400/111827/ffffff?text=Alika+Negro', stock: 0 },
    ],
  },
  {
    id: 'p2',
    name: 'Minimalist Nightstand',
    price: 150,
    image: 'https://via.placeholder.com/120x120/f3f4f6/111827?text=Stand',
    variants: [
      { id: 'v1', color: 'Blanco', colorHex: '#ffffff', image: 'https://via.placeholder.com/400x400/ffffff/111827?text=Nightstand', stock: 5 },
      { id: 'v2', color: 'Madera', colorHex: '#b45309', image: 'https://via.placeholder.com/400x400/b45309/ffffff?text=Nightstand', stock: 1 },
    ],
  },
  {
    id: 'p3',
    name: 'Soccer Shoes Vn',
    price: 150,
    image: 'https://via.placeholder.com/120x120/e5e7eb/111827?text=Shoes',
    variants: [
      { id: 'v1', color: 'Blanco', colorHex: '#ffffff', image: 'https://via.placeholder.com/400x400/f0f0f0/000000?text=Blanco', stock: 10 },
      { id: 'v2', color: 'Negro', colorHex: '#000000', image: 'https://via.placeholder.com/400x400/333333/ffffff?text=Negro', stock: 5 },
      { id: 'v3', color: 'Rojo', colorHex: '#FF0000', image: 'https://via.placeholder.com/400x400/aa0000/ffffff?text=Rojo', stock: 0 },
    ],
  },
  {
    id: 'p4',
    name: 'Elegant Bolit',
    price: 265,
    image: 'https://via.placeholder.com/120x120/e5e7eb/111827?text=Bolit',
    variants: [
      { id: 'v1', color: 'Gris', colorHex: '#9ca3af', image: 'https://via.placeholder.com/400x400/9ca3af/111827?text=Bolit+Gris', stock: 4 },
      { id: 'v2', color: 'Azul', colorHex: '#2563eb', image: 'https://via.placeholder.com/400x400/2563eb/ffffff?text=Bolit+Azul', stock: 2 },
    ],
  },
]
async function loadReact1Exercise(n) {
  const key = String(n).padStart(2, '0')
  const path = `./exercises/react1/ex${key}.jsx`
  const loader = react1Modules[path]
  if (!loader) throw new Error('No existe el ejercicio')
  const mod = await loader()
  return mod.default
}
async function loadReact2Exercise(n) {
  const key = String(n).padStart(2, '0')
  const path = `./exercises/react2/ex${key}.jsx`
  const loader = react2Modules[path]
  if (!loader) throw new Error('No existe el ejercicio')
  const mod = await loader()
  return mod.default
}
async function loadReact3Exercise(n) {
  const key = String(n).padStart(2, '0')
  const path = `./exercises/react3/ex${key}.jsx`
  const loader = react3Modules[path]
  if (!loader) throw new Error('No existe el ejercicio')
  const mod = await loader()
  return mod.default
}

function SectionReact1() {
  const params = useParams()
  const [selected, setSelected] = useState(null)
  const [Comp, setComp] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const openExercise = async (n) => {
    setSelected(n)
    setLoading(true)
    setError('')
    setComp(null)
    try {
      const component = await loadReact1Exercise(n)
      setComp(() => component)
    } catch (e) {
      setError('Servicio no disponible')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const n = params.n ? Number(params.n) : null
    if (n && n >= 1 && n <= 9) {
      openExercise(n)
    } else {
      setSelected(null)
      setComp(null)
      setError('')
    }
  }, [params.n])

  return (
    <>
      <h1 className="title">React 1</h1>
      <p className="subtitle">Ejercicios del 1 al 9</p>
      <div className="ex-grid">
        {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
          <Link
            key={n}
            to={`/react/1/ejercicio/${n}`}
            className={'ex-link' + (selected === n ? ' active' : '')}
          >
            Ejercicio {n}
          </Link>
        ))}
      </div>
      {loading && <p className="subtitle">Cargando…</p>}
      {error && <p className="subtitle" style={{ color: '#f87171' }}>{error}</p>}
      {Comp && (
        <div className="card" style={{ marginTop: 16 }}>
          {React.createElement(Comp)}
        </div>
      )}
    </>
  )
}

function SectionReact2() {
  const params = useParams()
  const [selected, setSelected] = useState(null)
  const [Comp, setComp] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const openExercise = async (n) => {
    setSelected(n)
    setLoading(true)
    setError('')
    setComp(null)
    try {
      const component = await loadReact2Exercise(n)
      setComp(() => component)
    } catch (e) {
      setError('Servicio no disponible')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const n = params.n ? Number(params.n) : null
    if (n && n >= 1 && n <= 5) {
      openExercise(n)
    } else {
      setSelected(null)
      setComp(null)
      setError('')
    }
  }, [params.n])

  return (
    <>
      <h1 className="title">React 2</h1>
      <p className="subtitle">Efectos y ciclo de vida</p>
      <div className="ex-grid">
        {Array.from({ length: 5 }, (_, i) => i + 1).map((n) => (
          <Link
            key={n}
            to={`/react/2/ejercicio/${n}`}
            className={'ex-link' + (selected === n ? ' active' : '')}
          >
            Ejercicio {n}
          </Link>
        ))}
      </div>
      {loading && <p className="subtitle">Cargando…</p>}
      {error && <p className="subtitle" style={{ color: '#f87171' }}>{error}</p>}
      {Comp && (
        <div className="card" style={{ marginTop: 16 }}>
          {React.createElement(Comp)}
        </div>
      )}
    </>
  )
}

function SectionReact3() {
  const params = useParams()
  const [selected, setSelected] = useState(null)
  const [Comp, setComp] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const openExercise = async (n) => {
    setSelected(n)
    setLoading(true)
    setError('')
    setComp(null)
    try {
      const component = await loadReact3Exercise(n)
      setComp(() => component)
    } catch (e) {
      setError('Servicio no disponible')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const n = params.n ? Number(params.n) : null
    if (n && n >= 1 && n <= 5) {
      openExercise(n)
    } else {
      setSelected(null)
      setComp(null)
      setError('')
    }
  }, [params.n])

  return (
    <>
      <h1 className="title">React 3</h1>
      <p className="subtitle">Gestión de estado y rendimiento</p>
      <div className="ex-grid">
        {Array.from({ length: 5 }, (_, i) => i + 1).map((n) => (
          <Link
            key={n}
            to={`/react/3/ejercicio/${n}`}
            className={'ex-link' + (selected === n ? ' active' : '')}
          >
            Ejercicio {n}
          </Link>
        ))}
      </div>
      {loading && <p className="subtitle">Cargando…</p>}
      {error && <p className="subtitle" style={{ color: '#f87171' }}>{error}</p>}
      {Comp && (
        <div className="card" style={{ marginTop: 16 }}>
          {React.createElement(Comp)}
        </div>
      )}
    </>
  )
}

function SectionReact4() {
  const params = useParams()
  const pid = params.pid || null
  const fmt = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' })
  if (!pid) {
    return (
      <div className="r4-page">
        <div className="r4-topbar">
          <div className="r4-tabs">
            <span className="r4-chip active">Featured</span>
            <span className="r4-chip">Fashion</span>
            <span className="r4-chip">Interior</span>
            <span className="r4-chip">Women</span>
          </div>
        </div>
        <div className="r4-list">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="r4-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src={p.image} alt={p.name} className="r4-thumb" />
                <div>
                  <p className="r4-item-title">{p.name}</p>
                  <p className="r4-item-price">{fmt.format(p.price)}</p>
                </div>
              </div>
              <Link to={`/react/4/producto/${p.id}`} className="r4-buy" reloadDocument>Buy</Link>
            </div>
          ))}
        </div>
      </div>
    )
  }
  const product = PRODUCTS.find((p) => p.id === pid) || PRODUCTS[0]
  const [variantId, setVariantId] = useState(product.variants[0]?.id || '')
  const [qty, setQty] = useState(1)
  const variant = product.variants.find((v) => v.id === variantId) || product.variants[0]
  const stock = variant?.stock || 0
  const canAdd = stock > 0 && qty >= 1 && qty <= stock
  return (
    <div className="r4-page">
      <div className="r4-detail" style={{ display: 'grid', gap: 16 }}>
        <img src={variant?.image} alt={product.name} style={{ width: '100%', borderRadius: 20 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="r4-chip active">New Arrival</span>
        </div>
        <h2 className="title" style={{ color: '#0f172a' }}>{product.name}</h2>
        <p className="subtitle" style={{ color: '#6b7280' }}>Innovation of comfortable chairs with selected Japanese wood.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="r4-price">{fmt.format(product.price)}</span>
        </div>
        <div>
          <p className="subtitle" style={{ color: '#6b7280', marginBottom: 8 }}>Color</p>
          <div className="r4-swatches">
            {product.variants.map((v) => (
              <span
                key={v.id}
                className={'r4-swatch' + (v.id === variantId ? ' active' : '')}
                style={{ background: v.colorHex, opacity: v.stock === 0 ? 0.4 : 1 }}
                onClick={() => v.stock > 0 && setVariantId(v.id)}
                role="button"
                aria-label={`Color ${v.color}${v.stock === 0 ? ' sin stock' : ''}`}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="subtitle" style={{ color: '#6b7280', marginBottom: 8 }}>Cantidad</p>
          <div className="r4-qty">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1}>−</button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => Math.min(stock || 1, q + 1))} disabled={qty >= stock}>+</button>
            <span className="subtitle" style={{ marginLeft: 8 }}>Stock: {stock}</span>
          </div>
        </div>
        <div>
          <button className="r4-buy" disabled={!canAdd} style={{ padding: '12px 16px' }}>
            {stock > 0 ? 'Add to cart' : 'Out of stock'}
          </button>
        </div>
        <div>
          <Link to="/react/4" className="menu-item">Volver</Link>
        </div>
      </div>
    </div>
  )
}

function Home() {
  const items = [
    { to: '/react/1', label: 'React 1' },
    { to: '/react/2', label: 'React 2' },
    { to: '/react/3', label: 'React 3' },
    { to: '/react/4', label: 'React 4' },
  ]
  return (
    <>
      <h1 className="title">Baterías de ejercicios</h1>
      <p className="subtitle">Elige una batería para comenzar</p>
      <nav className="menu">
        {items.map((it) => (
          <Link key={it.to} to={it.to} className="menu-item">
            {it.label}
          </Link>
        ))}
      </nav>
    </>
  )
}

function ServiceUnavailable() {
  return (
    <div className="card">
      <h1 className="title">Servicio no disponible</h1>
      <p className="subtitle">Inténtalo de nuevo más tarde.</p>
      <nav className="menu">
        <Link to="/" className="menu-item">Volver al inicio</Link>
      </nav>
    </div>
  )
}

function ScrollToTop() {
  const loc = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [loc.pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <ScrollToTop />
        <Menu />
        <Routes>
          <Route path="/" element={<div className="card"><Home /></div>} />
          <Route path="/react/1" element={<div className="card"><SectionReact1 /></div>} />
          <Route path="/react/1/ejercicio/:n" element={<div className="card"><SectionReact1 /></div>} />
          <Route path="/react/2" element={<div className="card"><SectionReact2 /></div>} />
          <Route path="/react/2/ejercicio/:n" element={<div className="card"><SectionReact2 /></div>} />
          <Route path="/react/3" element={<div className="card"><SectionReact3 /></div>} />
          <Route path="/react/3/ejercicio/:n" element={<div className="card"><SectionReact3 /></div>} />
          <Route path="/react/4" element={<SectionReact4 />} />
          <Route path="/react/4/producto/:pid" element={<SectionReact4 />} />
          <Route path="/503" element={<ServiceUnavailable />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
