const mongoose = require('mongoose');

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url =
  `mongodb+srv://full:${password}@part3.a6dc27e.mongodb.net/note-app?retryWrites=true`;

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');
    console.log('--------------------');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (!name || !number) {
  Person.find({})
    .then((result) => {
      console.log('Phonebook:');
      result.forEach((person) => {
        console.log(person.name, person.number);
      });
      console.log('--------------------\n');;
      mongoose.connection.close();
    })
    .catch((error) => {
      console.log('Error retrieving data:', error.message);
      mongoose.connection.close();
    });
} else {
  const person = new Person({
    name: name,
    number: number,
  });

  person.save()
    .then((result) => {
      console.log(`Added ${result.name} with number ${result.number} to phonebook`);
      mongoose.connection.close();
    })
    .catch((error) => {
      console.log('Error saving data:', error.message);
      mongoose.connection.close();
    });
}
