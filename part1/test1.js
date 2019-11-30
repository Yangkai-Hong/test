let f = (a, b) => {
    console.log(a + b);
}

setImmediate.apply(null, [f, 4, 2]);