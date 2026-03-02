import React from 'react'
export default function Ejercicio04() {
  const [color, setColor] = React.useState('grey')
  const box = { width: 200, height: 200, borderRadius: 12, background: color, marginTop: 12 }
  const inputStyle = { width: '100%', maxWidth: 300, padding: 10, borderRadius: 8, border: '1px solid #334155', background: '#0b1220', color: '#e2e8f0' }
  const row = { display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }
  return (
    <div>
      <h2 className="title">React 2 - Ejercicio 4</h2>
      <p className="subtitle">Cambiador de color de caja</p>
      <input
        type="text"
        style={inputStyle}
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="Escribe un color (p. ej. red, #FF00FF)"
      />
      <div style={row}>
        <button className="button" onClick={() => setColor('red')}>Rojo</button>
        <button className="button" onClick={() => setColor('green')}>Verde</button>
        <button className="button" onClick={() => setColor('blue')}>Azul</button>
      </div>
      <div style={box} />
    </div>
  )
}
