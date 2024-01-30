const express = require('express')
var morgan = require('morgan')

const app = express()
const cors = require('cors')

app.use(cors())

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body),
    ].join(' ')
  })
);

app.use(express.static('build'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json())
app.use(requestLogger)

let persons = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/api/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/info', (request, response) => {
  const totalPersons = persons.length
  const date = new Date

  response.send(`<div><p>phonebook has info for ${totalPersons} people</p><p>${date}</p></div>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

function generateUniqueId() {
  const existingIds =  persons.map(person => person.id);

  let randomId;
  do {
    randomId = Math.floor(Math.random() * 1000);
  } while (existingIds.includes(randomId));

  return randomId;
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body) {
    return response.status(400).json({ error: 'Content missing' });
  }
  
  const requiredFields = ['name', 'number'];
  const missingFields = [];
  
  requiredFields.forEach(field => {
    if (!body[field]) {
      missingFields.push(field);
    }
  });
  
  if (missingFields.length > 0) {
    return response.status(400).send(`Content ${missingFields.join(' and ')} ${missingFields.length > 1 ? 'are' : 'is'} missing`);
  }

  const existingName = persons.find(person => person.name ===  body.name);
  if(existingName) return response.status(409).send('That name has already been registered');

  const existingNumber = persons.find(person => person.number ===  body.number);
  if(existingNumber) return response.status(409).send('TThat number has already been registered');

  const person = {
    name: body.name,
    number: body.number,
    id: generateUniqueId()
  }

  persons = persons.concat(person)

  response.json(persons)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})