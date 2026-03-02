window.ReactExercises = window.ReactExercises || { react1: {} };
function Ejercicio03() {
  const [items, setItems] = React.useState(["Uno", "Dos", "Tres"]);
  return (
    <div>
      <h2 className="title">Ejercicio 3</h2>
      <p className="subtitle">Renderizado de listas</p>
      <ul className="list">
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
      <button className="button" onClick={() => setItems((arr) => [...arr, "Nuevo"])}>
        Añadir
      </button>
    </div>
  );
}
window.ReactExercises.react1["3"] = Ejercicio03;
