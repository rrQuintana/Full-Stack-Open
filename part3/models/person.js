const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('*Connecting to MongoDB...');

mongoose.connect(url)
  .then(() => {
    console.log('Connected!');
    console.log('--------------------\n');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
  }
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)