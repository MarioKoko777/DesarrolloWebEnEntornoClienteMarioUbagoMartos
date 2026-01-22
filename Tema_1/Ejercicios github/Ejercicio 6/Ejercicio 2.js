let ciudad = "Madrid";
console.log(ciudad);
/**El error ocurre porque JavaScript distingue entre mayúsculas y minúsculas 
 * en los nombres de las variables. La variable fue declarada como ciudad con “c” minúscula, 
 * pero en console.log se escribió Ciudad con “C” mayúscula. Como resultado, JavaScript no 
 * reconoce la variable y lanza un ReferenceError. Para solucionarlo, hay que usar exactamente 
 * el mismo nombre que se declaró. */