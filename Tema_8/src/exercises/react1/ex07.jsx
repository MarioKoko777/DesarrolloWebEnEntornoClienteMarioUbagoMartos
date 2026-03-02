import React from 'react'
export default function Ejercicio07() {
  const [first, setFirst] = React.useState('')
  const [last, setLast] = React.useState('')
  const inputStyle = { width: '100%', padding: 10, borderRadius: 8, border: '1px solid #334155', background: '#0b1220', color: '#e2e8f0' }
  return (
    <div>
      <h2 className="title">Ejercicio 7</h2>
      <p className="subtitle">Formulario: nombre y apellido</p>
      <div style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
        <input
          style={inputStyle}
          value={first}
          onChange={(e) => setFirst(e.target.value)}
          placeholder="First name"
        />
        <input
          style={inputStyle}
          value={last}
          onChange={(e) => setLast(e.target.value)}
          placeholder="Last name"
        />
        <button
          className="button"
          onClick={() => alert(`Hello ${first} ${last}!`)}
        >
          Greet Me
        </button>
      </div>
    </div>
  )
}
