const array = [1, 2, 3, 2, 4, 1, 5];
const sinDuplicados = array.filter((item, index) => array.indexOf(item) === index);
console.log(sinDuplicados); // [1, 2, 3, 4, 5]