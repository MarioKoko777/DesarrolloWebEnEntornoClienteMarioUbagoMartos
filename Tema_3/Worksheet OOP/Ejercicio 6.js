class ProjectManager extends Instructor {
  constructor({
    name,
    age,
    location,
    specialty,
    favLanguage,
    catchPhrase,
    gradClassName,
    favInstructor,
  }) {
    super({ name, age, location, specialty, favLanguage, catchPhrase });
    this.gradClassName = gradClassName;
    this.favInstructor = favInstructor;
  }

  standUp(channel) {
    return `${this.name} anuncia en ${channel}, @channel ¡es hora de standup!`;
  }

  debugsCode(student, subject) {
    return `${this.name} depura el código de ${student.name} en ${subject}`;
  }
}
const pm = new ProjectManager({
  name: 'Marta',
  age: 28,
  location: 'Bilbao',
  specialty: 'Testing',
  favLanguage: 'JavaScript',
  catchPhrase: '¡No te rindas!',
  gradClassName: 'CS1',
  favInstructor: 'Sean',
});
const alumno = { name: 'Pedro' };
console.log(pm.standUp('#general'));
// "Marta anuncia en #general, @channel ¡es hora de standup!"
console.log(pm.debugsCode(alumno, 'React'));
// "Marta depura el código de Pedro en React"