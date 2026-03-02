class Lambdasian {
  constructor({ name, age, location }) {
    this.name = name;
    this.age = age;
    this.location = location;
  }

  speak() {
    return `Hola, mi nombre es ${this.name}, soy de ${this.location}.`;
  }
}
const persona = new Lambdasian({ name: 'Ana', age: 25, location: 'Madrid' });
console.log(persona.speak()); // "Hola, mi nombre es Ana, soy de Madrid."