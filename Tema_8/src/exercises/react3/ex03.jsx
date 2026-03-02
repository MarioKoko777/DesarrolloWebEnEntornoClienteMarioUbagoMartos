import React from 'react'
export default function Ejercicio03() {
  const productos = [
    { id: 1, nombre: 'Teclado', precio: 39.99 },
    { id: 2, nombre: 'Ratón', precio: 24.5 },
    { id: 3, nombre: 'Monitor', precio: 199.95 },
  ]
  function Producto({ nombre, precio }) {
    return (
      <div className="card" style={{ padding: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="subtitle">{nombre}</span>
          <span>€{precio.toFixed(2)}</span>
        </div>
      </div>
    )
  }
  function ListaProductos({ productos }) {
    return (
      <div style={{ display: 'grid', gap: 10 }}>
        {productos.map((p) => (
          <Producto key={p.id} nombre={p.nombre} precio={p.precio} />
        ))}
      </div>
    )
  }
  return (
    <div>
      <h2 className="title">React 3 - Ejercicio 3</h2>
      <p className="subtitle">Lista de productos pasando arrays por props</p>
      <ListaProductos productos={productos} />
    </div>
  )
}
