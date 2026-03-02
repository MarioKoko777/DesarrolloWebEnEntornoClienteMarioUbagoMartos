import React from 'react'
function Items({ list }) {
  return (
    <div role="list" style={{ display: 'grid', gap: 6 }}>
      {list.map((item) => (
        <div role="listitem" key={item} className="card" style={{ padding: 8 }}>
          {item}
        </div>
      ))}
    </div>
  )
}
export default function Ejercicio06() {
  const animals = ['dog', 'cat', 'chicken', 'cow', 'sheep', 'horse']
  return (
    <div>
      <h2 className="title">Ejercicio 6</h2>
      <p className="subtitle">Componente personalizado que recibe una lista</p>
      <Items list={animals} />
    </div>
  )
}
