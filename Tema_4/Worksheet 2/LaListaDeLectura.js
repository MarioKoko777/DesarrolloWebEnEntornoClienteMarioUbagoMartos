// Clase Book
class Book {
    constructor(titulo, genero, autor) {
        this.titulo = titulo;
        this.genero = genero;
        this.autor = autor;
        this.leido = false;
        this.fechaLectura = null;
    }
}
// Clase BookList
class BookList {
    constructor() {
        this.libros = [];         // Array de todos los libros
        this.leidos = 0;          // Cantidad de libros leídos
        this.noLeidos = 0;        // Cantidad de libros no leídos
        this.libroActual = null;  // Libro que se está leyendo
        this.proximoLibro = null; // Siguiente libro a leer
        this.ultimoLeido = null;  // Último libro leído
    }
    // Agregar un libro a la lista
    add(book) {
        this.libros.push(book);
        this.noLeidos++;
        if (!this.libroActual) {
            this.libroActual = book;
            this.proximoLibro = this.obtenerProximoLibro();
        }
    }
    // Marcar el libro actual como terminado
    finishCurrentBook() {
        if (!this.libroActual) {
            console.log("No hay libro en curso.");
            return;
        }
        this.libroActual.leido = true;
        this.libroActual.fechaLectura = new Date(Date.now());
        this.ultimoLeido = this.libroActual;
        this.leidos++;
        this.noLeidos--;
        // Cambiar el libro actual al siguiente
        this.libroActual = this.proximoLibro;
        // Actualizar el próximo libro
        this.proximoLibro = this.obtenerProximoLibro();
        console.log(`Terminaste de leer "${this.ultimoLeido.titulo}".`);
    }
    // Obtener el primer libro no leído en la lista
    obtenerProximoLibro() {
        return this.libros.find(libro => !libro.leido && libro !== this.libroActual) || null;
    }
    // Mostrar resumen de la lista
    mostrarResumen() {
        console.log("--- Resumen de la Lista de Lectura ---");
        console.log(`Libros leídos: ${this.leidos}`);
        console.log(`Libros pendientes: ${this.noLeidos}`);
        console.log(`Libro actual: ${this.libroActual ? this.libroActual.titulo : "Ninguno"}`);
        console.log(`Próximo libro: ${this.proximoLibro ? this.proximoLibro.titulo : "Ninguno"}`);
        console.log(`Último libro leído: ${this.ultimoLeido ? this.ultimoLeido.titulo : "Ninguno"}`);
        console.log("------------------------------------");
    }
}
if (typeof window !== 'undefined') {
    window.Book = Book;
    window.BookList = BookList;
}