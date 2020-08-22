import { Router } from 'express'
import handler from '../database/handler'

const router = Router()

router.get('/', (req, res) => {
  res.send('Custom route User!')
})

router.post('/cadastro', (req, res) => {
  // pegar os dados do cadastro

  // criar uma interface para mexer com o json
  res.send('Custom route User!')
})

router.post('/login', (req, res) => {
  
  // Como é apenas para simulação, procurar na string email o que o usuário é
  let response
  let {email, senha} = req.body

  try {
    console.log('oi!')

    let type
    
    if (email.includes('paciente')) type = 'paciente'
    if (email.includes('farmacia')) type = 'farmacia'
    if (email.includes('medico')) type = 'medico'
    if (email.includes('responsavel')) type = 'responsavel'

    if (!type) return res.status(400)

    // checar o tipo

    let login_array = handler.getDatabase()[`${type}`]

    login_array.forEach(user => {
      if (user.email === email && user.senha === senha) {
        console.log('sucesso!')
        response = {
          message: 'Sucesso',
          id: user.id,
          email: user.email,
          nome: user.nome,
          tipo: type
        }
      }
    });

    console.log(login_array)

    // checar se senha está correta para

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