class Instructor extends Lambdasian {
  constructor({ name, age, location, specialty, favLanguage, catchPhrase }) {
    super({ name, age, location });
    this.specialty = specialty;
    this.favLanguage = favLanguage;
    this.catchPhrase = catchPhrase;
  }

  demo(subject) {
    return `Hoy estamos aprendiendo sobre ${subject}`;
  }

  grade(student, subject) {
    return `${student.name} recibe una puntuación perfecta en ${subject}`;
  }
}
const instructor = new Instructor({
  name: 'Luis',
  age: 30,
  location: 'Sevilla',
  specialty: 'Redux',
  favLanguage: 'JavaScript',
  catchPhrase: 'No olvides a los compas.'
});
const estudiante = { name: 'Ana' };
console.log(instructor.demo('closures')); 
// "Hoy estamos aprendiendo sobre closures"
console.log(instructor.grade(estudiante, 'JavaScript')); 
// "Ana recibe una puntuación perfecta en JavaScript"