import React from 'react'
export default function Ejercicio02() {
  function Perfil({ nombre, edad, isOnline, imagenUrl }) {
    const imgStyle = { width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', filter: isOnline ? 'none' : 'grayscale(100%)' }
    const dotStyle = { width: 10, height: 10, borderRadius: '50%', background: isOnline ? '#22c55e' : '#ef4444' }
    return (
      <div className="card" style={{ padding: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={imagenUrl} alt={nombre} style={imgStyle} />
          <div style={{ display: 'grid', gap: 4 }}>
            <p className="subtitle" style={{ margin: 0 }}>{nombre} — {edad}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={dotStyle} />
              <span>{isOnline ? 'Online' : 'Offline'}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const perfiles = [
    { nombre: 'Ana', edad: 28, isOnline: true, imagenUrl: 'https://i.pravatar.cc/100?img=1' },
    { nombre: 'Beto', edad: 34, isOnline: false, imagenUrl: 'https://i.pravatar.cc/100?img=2' },
    { nombre: 'Carla', edad: 25, isOnline: true, imagenUrl: 'https://i.pravatar.cc/100?img=3' },
  ]
  return (
    <div>
      <h2 className="title">React 3 - Ejercicio 2</h2>
      <p className="subtitle">Tarjeta de perfil con múltiples props</p>
      <div style={{ display: 'grid', gap: 12 }}>
        {perfiles.map((p) => (
          <Perfil key={p.nombre} {...p} />
        ))}
      </div>
    </div>
  )
}
