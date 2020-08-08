import { Router } from 'express'

const router = Router()

import MedicoRouter from './medico'

router.use('/medico', MedicoRouter)

router.get('/', (req, res) => {
  res.send('Custom route!')
})

router.post('/login', (req, res) => {
  
  // Como é apenas para simulação, procurar na string email o que o usuário é
  let response

  let login_data = req.body

  try {
    
    if (login_data.email.includes('medico')) response = 'medico'
    if (login_data.email.includes('responsavel')) response = 'responsavel'

  } catch (error) {
    console.log(error)
  }

  if (response) {
    res.status(200).json({
      data: response
    })
  } else {
    res.status(400).json({
      message: 'Credenciais incorretas.'
    })
  }

})

module.exports = router