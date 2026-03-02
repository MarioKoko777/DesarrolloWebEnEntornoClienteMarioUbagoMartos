import React from 'react'
export default function Ejercicio05() {
  const animals = ['dog', 'cat', 'chicken', 'cow', 'sheep', 'horse']
  return (
    <div>
      <h2 className="title">Ejercicio 5</h2>
      <p className="subtitle">Renderizado declarativo con map</p>
      <ul className="list">
        {animals.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>
    </div>
  )
}
