window.ReactExercises = window.ReactExercises || { react1: {} };
function Ejercicio01() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <h2 className="title">Ejercicio 1</h2>
      <p className="subtitle">Contador básico con useState</p>
      <button className="button" onClick={() => setCount((c) => c + 1)}>
        Clicks: {count}
      </button>
    </div>
  );
}
window.ReactExercises.react1["1"] = Ejercicio01;
