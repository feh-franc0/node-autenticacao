const router = require('express').Router();

const Client = require('../models/Client')

//* Create - criação de dados
router.post('/', async(req, res) => {
  //* req.body
  
  //* {name: "Matheus", salary: 5000, approved: false}
  const {nome, email, telefone, endereço, cpf} = req.body

  if(!nome) {
    res.status(422).json({ error: 'O nome é obrigatório!' })
    return
  }

  const client = {
    nome,
    email,
    telefone,
    endereço,
    cpf
  }

  try {
    //* criando dados
    await Client.create(client)
    
    res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
  } catch (error) {
    res.status(500).json({error: error})
  }
})

//* Read - leitura de dados
router.get('/', async (req, res) => {
  try {
    const client = await Client.find()

    res.status(200).json(client)
  } catch (error) {
    res.status(500).json({error: error})
  }
})

router.get('/:id', async (req, res) => {
  //* extrair o dado da requisição, pela url = req.params
  const id = req.params.id

  try {
    const client = await Client.findOne({ _id: id })

    if(!client) {
      res.status(422).json({ message: 'O usuário não foi encontrado!' })
      return
    }

    res.status(200).json(client)
  } catch (error) {
    res.status(500).json({error: error})
  }
})

//* Update - atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {
  const id = req.params.id
  
  const {nome, email, telefone, endereço, cpf} = req.body

  const client = {
    nome,
    email,
    telefone,
    endereço,
    cpf
  }

  try {
    
    const updateClient = await Client.updateOne({ _id: id }, client)

    if (updateClient.matchedCount === 0) {
      res.status(422).json({ message: 'O usuário não foi encontrado!' })
      return
    }

    res.status(200).json(client)
  } catch (error) {
    res.status(500).json({error: error})
  }
})

//* Delete - deletar dados
router.delete('/:id', async (req, res) => {
  
  const id = req.params.id

  const client = await Client.findOne({ _id: id })

  if(!client) {
    res.status(422).json({ message: 'O usuário não foi encontrado!' })
    return
  }

  try {

    await Client.deleteOne({_id: id})

    res.status(200).json({ message: 'Usuário removido com sucesso!' })
    
  } catch (error) {
    res.status(500).json({error: error})
  }
  
})


module.exports = router