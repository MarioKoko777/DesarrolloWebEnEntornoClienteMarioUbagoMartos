// Clase Gato
class Gato {
    constructor(nombre) {
        this.nombre = nombre;
        this.cansancio = 50; // 0 a 100
        this.hambre = 50;
        this.soledad = 50;
        this.felicidad = 50;
    }
    // Alimentar el gato
    alimentar(cantidad = 10) {
        this.hambre -= cantidad;
        if (this.hambre < 0) this.hambre = 0;
        this.felicidad += cantidad / 2;
        if (this.felicidad > 100) this.felicidad = 100;
        console.log(`${this.nombre} ha sido alimentado.`);
    }
    // Dormir
    dormir(horas = 5) {
        this.cansancio -= horas * 10;
        if (this.cansancio < 0) this.cansancio = 0;
        this.felicidad += horas * 2;
        if (this.felicidad > 100) this.felicidad = 100;
        console.log(`${this.nombre} ha dormido ${horas} horas.`);
    }
    // Acariciar (comportamiento arbitrario)
    acariciar() {
        // 30% de probabilidad de que no quiera ser acariciado
        if (Math.random() < 0.3) {
            console.log(`${this.nombre} no quiere que lo acaricien ahora.`);
            this.soledad += 5;
            this.felicidad -= 5;
            return;
        }
        this.felicidad += 10;
        if (this.felicidad > 100) this.felicidad = 100;
        this.soledad -= 10;
        if (this.soledad < 0) this.soledad = 0;
        console.log(`${this.nombre} disfruta de las caricias.`);
    }
    // Jugar
    jugar(tiempo = 10) {
        this.cansancio += tiempo * 5;
        if (this.cansancio > 100) this.cansancio = 100;
        this.felicidad += tiempo * 2;
        if (this.felicidad > 100) this.felicidad = 100;
        this.soledad -= tiempo * 3;
        if (this.soledad < 0) this.soledad = 0;
        console.log(`${this.nombre} ha jugado por ${tiempo} minutos.`);
    }
    // Mostrar estado del gato
    estado() {
        console.log(`--- Estado de ${this.nombre} ---`);
        console.log(`Cansancio: ${this.cansancio}`);
        console.log(`Hambre: ${this.hambre}`);
        console.log(`Soledad: ${this.soledad}`);
        console.log(`Felicidad: ${this.felicidad}`);
        console.log('---------------------------');
    }
}
// Ejemplo de uso
const miGato = new Gato("Paws");
miGato.estado();
miGato.alimentar(20);
miGato.dormir(3);
miGato.acariciar();
miGato.jugar(15);
miGato.estado();