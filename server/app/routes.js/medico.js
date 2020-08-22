import { Router } from 'express'
import handler from '../database/handler'


const router = Router()

router.get('/', (req, res) => {
  res.send('Custom route Médico!')
})

router.post('/receita/nova', (req, res) => {
  console.log(req.body)
  
  res.send('Receita ok!')
})

router.get('/json', (req, res) => {

  let data = handler.getDatabase()

  console.log(data)

  res.send(data)
})

module.exports = router