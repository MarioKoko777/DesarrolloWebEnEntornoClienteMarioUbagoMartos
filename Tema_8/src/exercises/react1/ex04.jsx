import React from 'react'
export default function Ejercicio04() {
  const [count, setCount] = React.useState(0)
  return (
    <div>
      <h2 className="title">Ejercicio 4</h2>
      <p className="subtitle">State y props: contador con useState</p>
      <button className="button" onClick={() => setCount((c) => c + 1)}>
        Clicks: {count}
      </button>
    </div>
  )
}
