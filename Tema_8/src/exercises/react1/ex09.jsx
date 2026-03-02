import React from 'react'
function UserCard({ user }) {
  const [flipped, setFlipped] = React.useState(false)
  const wrap = {
    perspective: '1000px',
    width: 280,
    height: 180,
  }
  const inner = {
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  }
  const face = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: 12,
    padding: 12,
  }
  const back = {
    ...face,
    transform: 'rotateY(180deg)',
  }
  return (
    <div
      style={wrap}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div style={inner}>
        <div className="card" style={face}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <img src={user.avatar} alt="" width="56" height="56" style={{ borderRadius: '50%' }} />
            <div>
              <p className="subtitle" style={{ margin: 0 }}>
                {user.first_name} {user.last_name}
              </p>
              <p style={{ margin: 0 }}>{user.username}</p>
            </div>
          </div>
        </div>
        <div className="card" style={back}>
          <p style={{ margin: 0 }}>{user.email}</p>
          <p style={{ margin: 0 }}>{user.phone_number}</p>
          <p style={{ margin: 0 }}>
            {user.address?.city}, {user.address?.country}
          </p>
        </div>
      </div>
    </div>
  )
}
export default function Ejercicio09() {
  const [users, setUsers] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const ctrl = new AbortController()
      const timer = setTimeout(() => ctrl.abort(), 8000)
      const res = await fetch('https://random-data-api.com/api/users/random_user?size=10', { signal: ctrl.signal })
      clearTimeout(timer)
      if (!res.ok) throw new Error('Bad status: ' + res.status)
      const data = await res.json()
      setUsers(Array.isArray(data) ? data : [])
    } catch (e) {
      const sample = Array.from({ length: 10 }).map((_, i) => ({
        id: i + 1,
        first_name: 'John',
        last_name: 'Doe ' + (i + 1),
        username: 'jdoe' + (i + 1),
        email: `john.doe${i + 1}@example.com`,
        phone_number: '+00 000 000 000',
        address: { city: 'Sample City', country: 'Sample Country' },
        avatar: '',
      }))
      setUsers(sample)
      setError('Servicio no disponible: usando datos de ejemplo')
    } finally {
      setLoading(false)
    }
  }
  React.useEffect(() => {
    load()
  }, [])
  return (
    <div>
      <h2 className="title">Ejercicio 9</h2>
      <p className="subtitle">Trabajar con API: usuarios aleatorios</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button className="button" onClick={load} disabled={loading}>
          {loading ? 'Cargando…' : 'Fetch otros 10'}
        </button>
      </div>
      {error && <p className="subtitle" style={{ color: '#f87171' }}>{error}</p>}
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {users.map((u) => (
          <UserCard key={u.id} user={u} />
        ))}
      </div>
    </div>
  )
}
