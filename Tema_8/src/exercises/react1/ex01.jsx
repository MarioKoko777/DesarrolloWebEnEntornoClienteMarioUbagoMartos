import React from 'react'
export default function Ejercicio01() {
  const boxStyle = {
    width: 200,
    height: 200,
    background: '#22c55e',
    color: '#0b1727',
    borderRadius: 12,
    display: 'grid',
    placeItems: 'center',
    fontWeight: 800,
    fontSize: 20,
  }
  return (
    <div>
      <h2 className="title">Ejercicio 1</h2>
      <p className="subtitle">Hello, World! en un cuadrado</p>
      <div style={boxStyle}>Hello, World!</div>
    </div>
  )
}
