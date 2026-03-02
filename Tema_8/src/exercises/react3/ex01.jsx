import React from 'react'
export default function Ejercicio01() {
  function Saludo({ nombre, emoji = '👋' }) {
    return <p className="subtitle">¡Hola, {nombre}! {emoji}</p>
  }
  return (
    <div>
      <h2 className="title">React 3 - Ejercicio 1</h2>
      <p className="subtitle">Saludo personalizado pasando props</p>
      <div style={{ display: 'grid', gap: 8 }}>
        <Saludo nombre="Ana" emoji="👋" />
        <Saludo nombre="Beto" emoji="🙂" />
        <Saludo nombre="Carla" emoji="🙌" />
      </div>
    </div>
  )
}
