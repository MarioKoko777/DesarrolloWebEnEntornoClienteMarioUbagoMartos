window.ReactExercises = window.ReactExercises || { react1: {} };
function Ejercicio07() {
  const [checked, setChecked] = React.useState(false);
  return (
    <div>
      <h2 className="title">Ejercicio 7</h2>
      <p className="subtitle">Checkbox controlado</p>
      <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        Activado: {checked ? "Sí" : "No"}
      </label>
    </div>
  );
}
window.ReactExercises.react1["7"] = Ejercicio07;
