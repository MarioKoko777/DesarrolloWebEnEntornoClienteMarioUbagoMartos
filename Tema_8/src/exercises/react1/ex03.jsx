import React from 'react'
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
}
export default function Ejercicio03() {
  return (
    <div>
      <h2 className="title">Ejercicio 3</h2>
      <p className="subtitle">Componente Button reutilizable</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button onClick={() => alert('Button 1 clicked')}>Button 1</Button>
        <Button onClick={() => alert('Button 2 clicked')}>Button 2</Button>
        <Button onClick={() => alert('Button 3 clicked')}>Button 3</Button>
      </div>
    </div>
  )
}
