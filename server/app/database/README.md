### Banco de dados JSON

O arquivo data.json funcionará como um banco de dados da aplicação em texto. Todas as alterações e atualizações acontecerão diretamente com as funções
de lidar com arquivos do Node.

Esquemático do JSON:

{
  "pacientes": [
    {
      "nome": "nome_exemplo",
      "id": "id_exemplo",
      "responsaveis_id": "[1, 2, 3]"
    }
  ],
  "medicos": [
    {
      "nome": "nome_exemplo",
      "id": "id_exemplo",
      "senha": "senha_exemplo"
    }
  ],
  "receitas": [
    {
      "id": "id_exemplo",
      "status": enum("nova", "em analise", "aprovada", "pronta")
    }
  ],
  "farmacias": [
    {
      "nome": "nome_exemplo",
      "id": "id_exemplo"
    }
  ],
  "responsaveis": [
    {
      "nome": "nome_exemplo",
      "id": "id_exemplo",
      "pacientes_id": "[4, 5]"
    }
  ]
}

Hardcoded: tudo menos receitas

Médico vai gerar uma receita para um paciente (com um array de responsaveis vinculados)


Modelo inicial:


{
  "paciente": [
    {
      "nome": "João",
      "id": 1,
      "email": "paciente_1@dropill.com",
      "senha": "paciente1234",
      "responsaveis_id": [1, 2]
    },
    {
      "nome": "Maria",
      "id": 2,
      "email": "paciente_2@dropill.com",
      "senha": "paciente1234",
      "responsaveis_id": [2]
    }
  ],
  "medico": [
    {
      "nome": "medico_exemplo",
      "email": "medico_1@dropill.com",
      "senha": "medico1234",
      "id": 1
    },
    {
      "nome": "medico_exemplo 2",
      "email": "medico_2@dropill.com",
      "senha": "medico1234",
      "id": 2
    }
  ],
  "receita": [],
  "farmacia": [
    {
      "nome": "farmacia_exemplo",
      "email": "farmacia_2@dropill.com",
      "senha": "farmacia1234",
      "id": 1
    }
  ],
  "responsavel": [
    {
      "nome": "Responsável_1",
      "email": "responsavel_1@dropill.com",
      "senha": "responsavel1234",
      "id": "1",
      "pacientes_id": [1]
    },
    {
      "nome": "Responsável_2",
      "email": "responsavel_2@dropill.com",
      "senha": "responsavel1234",
      "id": "2",
      "pacientes_id": [1, 2]
    }
  ]
}