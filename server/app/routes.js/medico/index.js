import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send('Custom route Médico!')
})

router.post('/receita/nova', (req, res) => {
  console.log(req.body)
  res.send('Receita ok!')
})

module.exports = router