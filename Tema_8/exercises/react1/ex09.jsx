window.ReactExercises = window.ReactExercises || { react1: {} };
function Ejercicio09() {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    setItems(["A", "B", "C"]);
  }, []);
  return (
    <div>
      <h2 className="title">Ejercicio 9</h2>
      <p className="subtitle">Inicialización en efecto</p>
      <ul className="list">
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </div>
  );
}
window.ReactExercises.react1["9"] = Ejercicio09;
