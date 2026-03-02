window.ReactExercises = window.ReactExercises || { react1: {} };
function Ejercicio02() {
  const [text, setText] = React.useState("");
  return (
    <div>
      <h2 className="title">Ejercicio 2</h2>
      <p className="subtitle">Entrada controlada</p>
      <input
        style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #334155", background: "#0b1220", color: "#e2e8f0" }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe algo"
      />
      <p className="subtitle">Valor: {text || "…"}</p>
    </div>
  );
}
window.ReactExercises.react1["2"] = Ejercicio02;
