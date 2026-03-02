class Student extends Lambdasian {
  constructor({ name, age, location, previousBackground, className, favSubjects }) {
    super({ name, age, location });
    this.previousBackground = previousBackground;
    this.className = className;
    this.favSubjects = favSubjects;
  }

  listSubjects() {
    return `Amando ${this.favSubjects.join(', ')}!`;
  }

  PRAssignment(subject) {
    return `${this.name} ha enviado un PR para ${subject}`;
  }

  sprintChallenge(subject) {
    return `${this.name} ha iniciado el sprint challenge en ${subject}`;
  }
}
const estudiante = new Student({
  name: 'Carla',
  age: 22,
  location: 'Valencia',
  previousBackground: 'Diseño gráfico',
  className: 'CS132',
  favSubjects: ['HTML', 'CSS', 'JS']
});
console.log(estudiante.listSubjects()); 
// "Amando HTML, CSS, JS!"
console.log(estudiante.PRAssignment('JavaScript')); 
// "Carla ha enviado un PR para JavaScript"
console.log(estudiante.sprintChallenge('React')); 
// "Carla ha iniciado el sprint challenge en React"