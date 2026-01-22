console.log(Number.isNaN(NaN));              // true
console.log(Number.isNaN("hello"));          // false
console.log(Number.isNaN(undefined));        // false
console.log(Number.isNaN(0 / 0));            // true
console.log(Number.isNaN(parseInt("abc")));  // true