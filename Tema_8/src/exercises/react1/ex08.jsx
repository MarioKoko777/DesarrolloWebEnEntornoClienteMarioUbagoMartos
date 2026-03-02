import React from 'react'
export default function Ejercicio08() {
  const jokes = [
    { id: 1, setup: "What's the best thing about a Boolean?", punchline: "Even if you're wrong, you're only off by a bit" },
    { id: 2, setup: "Why do programmers wear glasses?", punchline: "Because they need to C#" },
  ]
  return (
    <div>
      <h2 className="title">Ejercicio 8</h2>
      <p className="subtitle">Renderizar datos JSON</p>
      <div style={{ display: 'grid', gap: 12 }}>
        {jokes.map((j) => (
          <div key={j.id} className="card" style={{ padding: 12 }}>
            <p className="subtitle">{j.setup}</p>
            <p>{j.punchline}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
