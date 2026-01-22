// -------------------------
// Exercise 1 - Age Calculator
// -------------------------
var year = new Date().getFullYear();
var annoNacimiento = 1985; // como número
var annos = year - annoNacimiento;
var annos2 = year - annoNacimiento - 1;

document.write('Exercise 1 - Age Calculator:<br>');
document.write('They are either ' + annos + ' or ' + annos2 + ' years old.<br><br>');

// -------------------------
// Exercise 2 - Lifetime Supply Calculator
// -------------------------
var currentAge = 29;
var maxAge = 99;
var eatEstimatedPerDay = 1.5; // Kg por día

var comidaTotalRestoVida = (maxAge - currentAge) * eatEstimatedPerDay * 365; // calculando por día
document.write('Exercise 2 - Lifetime Supply Calculator:<br>');
document.write('You will need ' + comidaTotalRestoVida.toFixed(0) + ' Kg to last you until the ripe old age of ' + maxAge + '.<br><br>');

// -------------------------
// Exercise 3 - The Geometrizer
// -------------------------
var radio = 5;
var area = Math.PI * radio * radio;
var circunferencia = 2 * Math.PI * radio;

document.write('Exercise 3 - The Geometrizer:<br>');
document.write('The circumference is ' + circunferencia.toFixed(2) + ' m.<br>');
document.write('The area is ' + area.toFixed(2) + ' m².<br><br>');

// -------------------------
// Exercise 4 - Temperature Converter
// -------------------------
var celsius = 20;
var celsiusToFahrenheit = celsius * 9 / 5 + 32;

var fahrenheit = 68;
var fahrenheitToCelsius = (fahrenheit - 32) * 5 / 9;

document.write('Exercise 4 - Temperature Converter:<br>');
document.write(celsius + 'º Celsius a Fahrenheit: ' + celsiusToFahrenheit.toFixed(2) + 'ºF<br>');
document.write(fahrenheit + 'º Fahrenheit a Celsius: ' + fahrenheitToCelsius.toFixed(2) + 'ºC<br><br>');

// -------------------------
// Exercise 5 - What number's bigger?
// -------------------------
function greaterNum(num1, num2) {
    return (num1 > num2) ? num1 : num2;
}

document.write('Exercise 5 - What number\'s bigger?:<br>');
document.write('El mayor es: ' + greaterNum(2, 5) + '<br><br>');

// -------------------------
// Exercise 6 - The World Translator
// -------------------------
function helloWorld(language) {
    var saludo = '';
    switch(language) {
        case 'es':
            saludo = 'Hola mundo';
            break;
        case 'fr':
            saludo = 'Bonjour le monde';
            break;
        case 'de':
            saludo = 'Hallo Welt';
            break;
        default:
            saludo = 'Debe especificar algún lenguaje (es, fr, de)';
    }
    return saludo;
}

document.write('Exercise 6 - The World Translator:<br>');
document.write(helloWorld('es') + '<br>');
document.write(helloWorld('fr') + '<br>');
document.write(helloWorld('de') + '<br>');
document.write(helloWorld('it') + '<br>');