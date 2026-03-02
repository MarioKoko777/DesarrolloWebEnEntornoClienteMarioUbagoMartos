import React from 'react'
export default function Ejercicio05() {
  function Card({ title, children }) {
    return (
      <div className="card" style={{ padding: 12 }}>
        <h3 className="title" style={{ marginTop: 0 }}>{title}</h3>
        {children}
      </div>
    )
  }
  return (
    <div>
      <h2 className="title">React 3 - Ejercicio 5</h2>
      <p className="subtitle">Componente contenedor usando props.children</p>
      <div style={{ display: 'grid', gap: 12 }}>
        <Card title="Bienvenida">
          <p className="subtitle">Este es el contenido de la primera tarjeta.</p>
          <button className="button">Click aquí</button>
        </Card>
        <Card title="Despedida">
          <img
            src="https://via.placeholder.com/300x120?text=Adios"
            alt="adiós"
            style={{ width: '100%', borderRadius: 8 }}
          />
        </Card>
      </div>
    </div>
  )
}
