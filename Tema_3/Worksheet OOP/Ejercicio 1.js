class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.stomach = [];
  }

  eat(edible) {
    if (this.stomach.length < 10) {
      this.stomach.push(edible);
    }
  }

  poop() {
    this.stomach = [];
  }

  toString() {
    return `${this.name}, ${this.age}`;
  }
}

// Ejemplo de uso
const mary = new Person("Mary", 50);
mary.eat("manzana");
mary.eat("sandwich");
console.log(mary.stomach);         // ["manzana", "sandwich"]
console.log(mary.toString());      // "Mary, 50"

for (let i = 0; i < 12; i++) {
  mary.eat(`comida-${i}`);
}
console.log(mary.stomach.length);  // 10

mary.poop();
console.log(mary.stomach);         // []