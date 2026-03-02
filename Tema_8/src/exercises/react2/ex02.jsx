import React from 'react'
export default function Ejercicio02() {
  const [isVisible, setIsVisible] = React.useState(true)
  return (
    <div>
      <h2 className="title">React 2 - Ejercicio 2</h2>
      <p className="subtitle">Alternador de visibilidad (renderizado condicional)</p>
      <button className="button" onClick={() => setIsVisible((v) => !v)}>
        {isVisible ? 'Ocultar' : 'Mostrar'}
      </button>
      {isVisible ? (
        <p className="subtitle" style={{ marginTop: 12 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
        </p>
      ) : (
        <p className="subtitle" style={{ marginTop: 12 }}>El texto está oculto</p>
      )}
    </div>
  )
}
