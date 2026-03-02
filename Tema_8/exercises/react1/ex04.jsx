window.ReactExercises = window.ReactExercises || { react1: {} };
function Ejercicio04() {
  const [visible, setVisible] = React.useState(true);
  return (
    <div>
      <h2 className="title">Ejercicio 4</h2>
      <p className="subtitle">Renderizado condicional</p>
      <button className="button" onClick={() => setVisible((v) => !v)}>
        {visible ? "Ocultar" : "Mostrar"}
      </button>
      {visible && <p className="subtitle">Contenido visible</p>}
    </div>
  );
}
window.ReactExercises.react1["4"] = Ejercicio04;
