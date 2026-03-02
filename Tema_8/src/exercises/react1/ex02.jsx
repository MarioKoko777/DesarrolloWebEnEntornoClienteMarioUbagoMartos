import React from 'react'
export default function Ejercicio02() {
  return (
    <div>
      <h2 className="title">Ejercicio 2</h2>
      <p className="subtitle">Capturar clics con evento onClick</p>
      <button className="button" onClick={() => alert('Clicked!')}>
        Click me
      </button>
    </div>
  )
}
