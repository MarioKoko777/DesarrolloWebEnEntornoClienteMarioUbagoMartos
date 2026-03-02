import React from 'react'
export default function Ejercicio01() {
  const [count, setCount] = React.useState(0)
  const btnRow = { display: 'flex', gap: 8, flexWrap: 'wrap' }
  const display = { fontSize: 32, fontWeight: 800, marginBottom: 12 }
  return (
    <div>
      <h2 className="title">React 2 - Ejercicio 1</h2>
      <p className="subtitle">Estado básico con useState</p>
      <div style={display}>{count}</div>
      <div style={btnRow}>
        <button className="button" onClick={() => setCount((c) => c + 1)}>Incrementar</button>
        <button className="button" onClick={() => setCount((c) => Math.max(0, c - 1))}>Decrementar</button>
        <button className="button" onClick={() => setCount(0)}>Resetear</button>
        <button className="button" onClick={() => setCount((c) => c * 2)}>Duplicar</button>
      </div>
    </div>
  )
}
