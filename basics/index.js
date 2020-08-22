console.log('hellow')

var a = 1 // nao mt usado

let b = 2

const c = 3

let array_1 = [1, 2, 3]

function function_classic (array) {
  for (let i = 0; i < array.length; i++) {
    console.log(array[i])
  }
}

function_classic(array_1)

let printer = (array) => {
  array.forEach(e => {
    console.log(e)
    console.log(e)
  })
}

setTimeout(() => {
  console.log('1 segundo')
}, 1000);

printer(array_1)