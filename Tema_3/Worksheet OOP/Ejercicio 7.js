// Extiende Student para añadir la propiedad `grade` automáticamente
const OriginalStudent = typeof Student !== 'undefined' ? Student : null;
if (OriginalStudent) {
  class StudentWithGrade extends OriginalStudent {
    constructor(args) {
      super(args);
      this.grade = Math.floor(Math.random() * 100) + 1; // 1-100
    }
    graduate() {
      return this.grade >= 70
        ? `${this.name} puede graduarse de Lambda School`
        : `${this.name} aún no está listo; sigue siendo calificado para subir su puntuación`;
    }
  }
  // Reasignamos el símbolo global para que nuevas instancias usen la versión con `grade`
  Student = StudentWithGrade;
}
// Método compartido por Instructor y ProjectManager (PM hereda de Instructor)
if (typeof Instructor !== 'undefined') {
  Instructor.prototype.adjustGrade = function (student) {
    const delta = Math.floor(Math.random() * 10) + 1; // 1-10 puntos
    const sign = Math.random() < 0.5 ? -1 : 1;        // sumar o restar
    const current = typeof student.grade === 'number'
      ? student.grade
      : Math.floor(Math.random() * 100) + 1;
    student.grade = Math.max(1, Math.min(100, current + sign * delta));
    return student.grade;
  };
}
// Ejemplo de uso:
const s = new Student({ name: 'Carla', age: 22, location: 'Valencia', previousBackground: 'Diseño', className: 'CS132', favSubjects: ['HTML','CSS','JS'] });
console.log('Nota inicial:', s.grade);
const i = new Instructor({ name:'Luis', age:30, location:'Sevilla', specialty:'Redux', favLanguage:'JS', catchPhrase:'¡Ánimo!' });
i.adjustGrade(s);
console.log('Tras ajuste:', s.grade);
console.log(s.graduate());