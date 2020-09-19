const axios = require('axios')
let relatorio = require('../relatorio.json')
let dropill = require('../data.json')

let dropill_id = dropill.receita[0].paciente_id

console.log(Object.keys(relatorio))

console.log(dropill_id)

let last = Object.keys(relatorio)[Object.keys(relatorio).length - 1]

console.log(relatorio[last])

let update = async () => {
  console.log('update')
}

update()