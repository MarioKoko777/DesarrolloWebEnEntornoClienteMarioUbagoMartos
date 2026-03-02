import React from 'react'
export default function Ejercicio04() {
  function BotonIncrementar({ onClick }) {
    return <button className="button" onClick={onClick}>Incrementar</button>
  }
  function BotonResetear({ onClick }) {
    return <button className="button" onClick={onClick}>Resetear</button>
  }
  function ContadorPadre() {
    const [count, setCount] = React.useState(0)
    const incrementar = () => setCount((c) => c + 1)
    const resetear = () => setCount(0)
    return (
      <div>
        <h3 className="title" style={{ marginTop: 12 }}>Contador: {count}</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <BotonIncrementar onClick={incrementar} />
          <BotonResetear onClick={resetear} />
        </div>
      </div>
    )
  }
  return (
    <div>
      <h2 className="title">React 3 - Ejercicio 4</h2>
      <p className="subtitle">Lifting state up: hijos disparan funciones del padre</p>
      <ContadorPadre />
    </div>
  )
}
