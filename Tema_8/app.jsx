const { useState, useEffect } = React;
const { HashRouter, Routes, Route, Link, Navigate, useLocation, useParams } = ReactRouterDOM;

function Menu() {
  const loc = useLocation();
  const path = loc.pathname;
  const isActive = (p) => path.startsWith(p);
  return (
    <nav className="menu">
      <Link to="/react/1" className={"menu-item" + (isActive("/react/1") ? " active" : "")}>React 1</Link>
      <Link to="/react/2" className={"menu-item" + (isActive("/react/2") ? " active" : "")}>React 2</Link>
      <Link to="/react/3" className={"menu-item" + (isActive("/react/3") ? " active" : "")}>React 3</Link>
      <Link to="/react/4" className={"menu-item" + (isActive("/react/4") ? " active" : "")}>React 4</Link>
    </nav>
  );
}

function loadReact1Exercise(n) {
  return new Promise((resolve, reject) => {
    const key = String(n);
    if (
      window.ReactExercises &&
      window.ReactExercises.react1 &&
      window.ReactExercises.react1[key]
    ) {
      resolve(window.ReactExercises.react1[key]);
      return;
    }
    const src = `./exercises/react1/ex${String(n).padStart(2, "0")}.jsx`;
    const s = document.createElement("script");
    s.type = "text/babel";
    s.setAttribute("data-presets", "react");
    s.src = src;
    s.onload = () => {
      if (typeof Babel !== "undefined" && Babel.transformScriptTags) {
        Babel.transformScriptTags();
      }
      if (
        window.ReactExercises &&
        window.ReactExercises.react1 &&
        window.ReactExercises.react1[key]
      ) {
        resolve(window.ReactExercises.react1[key]);
      } else {
        reject(new Error("No registrado"));
      }
    };
    s.onerror = () => reject(new Error("Fallo al cargar"));
    document.body.appendChild(s);
  });
}

function SectionReact1() {
  const params = useParams();
  const [selected, setSelected] = useState(null);
  const [Comp, setComp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const openExercise = async (n) => {
    setSelected(n);
    setLoading(true);
    setError("");
    setComp(null);
    try {
      const component = await loadReact1Exercise(n);
      setComp(() => component);
    } catch (e) {
      setError("No se pudo cargar el ejercicio " + n);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const n = params.n ? Number(params.n) : null;
    if (n && n >= 1 && n <= 9) {
      openExercise(n);
    } else {
      setSelected(null);
      setComp(null);
      setError("");
    }
  }, [params.n]);

  return (
    <>
      <h1 className="title">React 1</h1>
      <p className="subtitle">Ejercicios del 1 al 9</p>
      <div className="ex-grid">
        {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
          <Link
            key={n}
            to={`/react/1/ejercicio/${n}`}
            className={"ex-link" + (selected === n ? " active" : "")}
          >
            Ejercicio {n}
          </Link>
        ))}
      </div>
      {loading && <p className="subtitle">Cargando…</p>}
      {error && <p className="subtitle" style={{ color: "#f87171" }}>{error}</p>}
      {Comp && (
        <div className="card" style={{ marginTop: 16 }}>
          {React.createElement(Comp)}
        </div>
      )}
    </>
  );
}

function SectionReact2() {
  return (
    <>
      <h1 className="title">React 2</h1>
      <p className="subtitle">Efectos y ciclo de vida</p>
      <ul className="list">
        <li>useEffect (montaje/actualización)</li>
        <li>Fetch de datos y estados de carga</li>
        <li>Limpiezas y suscripciones</li>
      </ul>
    </>
  );
}

function SectionReact3() {
  return (
    <>
      <h1 className="title">React 3</h1>
      <p className="subtitle">Gestión de estado y rendimiento</p>
      <ul className="list">
        <li>Context y reducers</li>
        <li>Memoización y callbacks</li>
        <li>Renderizado condicional y listas</li>
      </ul>
    </>
  );
}

function SectionReact4() {
  return (
    <>
      <h1 className="title">React 4</h1>
      <p className="subtitle">Arquitectura y routing</p>
      <ul className="list">
        <li>Patrones de contenedor/presentacional</li>
        <li>Enrutado y páginas</li>
        <li>Buenas prácticas y testing básico</li>
      </ul>
    </>
  );
}

function Home() {
  const items = [
    { to: "/react/1", label: "React 1" },
    { to: "/react/2", label: "React 2" },
    { to: "/react/3", label: "React 3" },
    { to: "/react/4", label: "React 4" },
  ];
  return (
    <>
      <h1 className="title">Baterías de ejercicios</h1>
      <p className="subtitle">Elige una batería para comenzar</p>
      <nav className="menu">
        {items.map((it) => (
          <Link key={it.to} to={it.to} className="menu-item">
            {it.label}
          </Link>
        ))}
      </nav>
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <div className="container">
        <Menu />
        <Routes>
          <Route path="/" element={<div className="card"><Home /></div>} />
          <Route path="/react/1" element={<div className="card"><SectionReact1 /></div>} />
          <Route path="/react/1/ejercicio/:n" element={<div className="card"><SectionReact1 /></div>} />
          <Route path="/react/2" element={<div className="card"><SectionReact2 /></div>} />
          <Route path="/react/3" element={<div className="card"><SectionReact3 /></div>} />
          <Route path="/react/4" element={<div className="card"><SectionReact4 /></div>} />
        </Routes>
      </div>
    </HashRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
