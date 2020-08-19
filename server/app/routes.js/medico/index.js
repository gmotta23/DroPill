import { Router } from 'express'
import * as data from '../../database/data.json'
import fs from 'fs'


const router = Router()

router.get('/', (req, res) => {
  res.send('Custom route Médico!')
})

router.post('/receita/nova', (req, res) => {
  console.log(req.body)
  
  res.send('Receita ok!')
})

router.get('/json', (req, res) => {

  data.pacientes.push({
    name: 'walter',
    id: data.pacientes.length + 1
  })

  let json = JSON.stringify(data)

  fs.writeFile('app/database/data.json', json, (err) => {
    if (err) return console.log(err)
    console.log('sucesso!')
  })

  res.send(data.pacientes)
})

module.exports = router