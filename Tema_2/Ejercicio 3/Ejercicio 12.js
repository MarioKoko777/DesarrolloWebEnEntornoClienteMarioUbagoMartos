let fecha = new Date();
// Español (España)
let formatoES = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
}).format(fecha);
console.log("Español:", formatoES); 
// Ej: "lunes, 19 de enero de 2026"
// Inglés (EE.UU.)
let formatoUS = new Intl.DateTimeFormat('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
}).format(fecha);
console.log("Inglés:", formatoUS); 
// Ej: "Monday, January 19, 2026"
// Japonés
let formatoJP = new Intl.DateTimeFormat('ja-JP', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
}).format(fecha);
console.log("Japonés:", formatoJP); 
// Ej: "2026年1月19日月曜日"