// function print(a, b, c, d){
//     console.log(a + b + c + d);
// }
// function example(a, b , c , d){
//     print.call(this, a, b, c, d);
//     print.apply(this, arguments);
//     print.apply(this, [a, b, c, d]);
// }

// example('1', 2, 3, 4)

let f = (a, b) => {
    console.log(a + b);
}

setImmediate.apply(null, [f, 4, 2]);