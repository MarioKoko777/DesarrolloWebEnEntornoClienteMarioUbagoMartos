import React from 'react'
export default function Ejercicio03() {
  const [texto, setTexto] = React.useState('')
  const inputStyle = { width: '100%', padding: 10, borderRadius: 8, border: '1px solid #334155', background: '#0b1220', color: '#e2e8f0' }
  const row = { display: 'flex', gap: 8, alignItems: 'center', marginTop: 8, flexWrap: 'wrap' }
  return (
    <div>
      <h2 className="title">React 2 - Ejercicio 3</h2>
      <p className="subtitle">Input controlado y sincronizado</p>
      <div style={{ maxWidth: 480 }}>
        <input
          type="text"
          style={inputStyle}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe algo…"
        />
        <div style={row}>
          <button className="button" onClick={() => setTexto('')}>Limpiar</button>
        </div>
        <p className="subtitle" style={{ marginTop: 12 }}>{texto || '…'}</p>
        <p className="subtitle">Caracteres: {texto.length}</p>
      </div>
    </div>
  )
}
