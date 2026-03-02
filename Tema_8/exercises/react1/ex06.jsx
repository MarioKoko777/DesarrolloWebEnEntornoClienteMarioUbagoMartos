window.ReactExercises = window.ReactExercises || { react1: {} };
function Ejercicio06() {
  const [a, setA] = React.useState(0);
  const [b, setB] = React.useState(0);
  const sum = a + b;
  return (
    <div>
      <h2 className="title">Ejercicio 6</h2>
      <p className="subtitle">Formulario y cálculo</p>
      <div style={{ display: "flex", gap: 8 }}>
        <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} />
        <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} />
      </div>
      <p className="subtitle">Suma: {sum}</p>
    </div>
  );
}
window.ReactExercises.react1["6"] = Ejercicio06;
