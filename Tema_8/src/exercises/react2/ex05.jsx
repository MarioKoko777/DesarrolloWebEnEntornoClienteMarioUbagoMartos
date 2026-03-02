import React from 'react'
export default function Ejercicio05() {
  const [nombre, setNombre] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [isSubmitted, setSubmitted] = React.useState(false)
  const [submittedData, setSubmittedData] = React.useState(null)
  const inputStyle = { width: '100%', padding: 10, borderRadius: 8, border: '1px solid #334155', background: '#0b1220', color: '#e2e8f0' }
  const onSubmit = (e) => {
    e.preventDefault()
    const payload = { nombre, email }
    setSubmittedData(payload)
    setSubmitted(true)
  }
  return (
    <div>
      <h2 className="title">React 2 - Ejercicio 5</h2>
      <p className="subtitle">Formulario básico con múltiples estados</p>
      {!isSubmitted ? (
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
          <input
            style={inputStyle}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
          />
          <input
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
          />
          <button className="button" type="submit">Enviar</button>
        </form>
      ) : (
        <div className="card" style={{ marginTop: 12 }}>
          <p className="subtitle">
            Usuario registrado: Nombre: {submittedData?.nombre || '—'}, Email: {submittedData?.email || '—'}
          </p>
        </div>
      )}
    </div>
  )
}
