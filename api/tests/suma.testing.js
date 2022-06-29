const suma = (a,b) => a + b;

const checks = [
    {a:0, b:0, result: 0},
    {a:2, b:1, result: 3},
    {a:54, b:7, result: 61},
]

// console.assert(
//     suma(1,3) === 4,
//     'Suma of 1 and 3 expected to be 4'
// );

// console.assert(
//     suma(0,0) === 0,
//     'Suma of 0 and 0 expected to be 0'
// );

const test = () => {
    checks.forEach(({a,b,result}) => {
        console.assert(
            suma(a,b) === result,
            `Suma of ${a} and ${b} should be ${result}`
        )
    })
}

test()