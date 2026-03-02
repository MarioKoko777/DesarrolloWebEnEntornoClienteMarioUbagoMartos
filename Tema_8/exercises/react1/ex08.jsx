window.ReactExercises = window.ReactExercises || { react1: {} };
function Ejercicio08() {
  const [seconds, setSeconds] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div>
      <h2 className="title">Ejercicio 8</h2>
      <p className="subtitle">Temporizador con useEffect</p>
      <p className="subtitle">Segundos: {seconds}</p>
    </div>
  );
}
window.ReactExercises.react1["8"] = Ejercicio08;
