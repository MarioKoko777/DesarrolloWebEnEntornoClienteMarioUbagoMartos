window.ReactExercises = window.ReactExercises || { react1: {} };
function Ejercicio05() {
  const [color, setColor] = React.useState("#22c55e");
  return (
    <div>
      <h2 className="title">Ejercicio 5</h2>
      <p className="subtitle">Estilos dinámicos</p>
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      <div style={{ marginTop: 12, width: 100, height: 40, borderRadius: 8, background: color }} />
    </div>
  );
}
window.ReactExercises.react1["5"] = Ejercicio05;
