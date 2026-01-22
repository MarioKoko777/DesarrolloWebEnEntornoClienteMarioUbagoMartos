let texto = "JavaScript es genial";
// Usando substring
let sub1 = texto.substring(0, 10);  // "JavaScript"
let sub2 = texto.substring(13);     // "genial"
// Usando slice
let slice1 = texto.slice(0, 10);    // "JavaScript"
let slice2 = texto.slice(-6);       // "genial"
console.log("Usando substring:");
console.log(sub1); // JavaScript
console.log(sub2); // genial
console.log("Usando slice:");
console.log(slice1); // JavaScript
console.log(slice2); // genial