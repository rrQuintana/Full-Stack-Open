require("dotenv").config();
const express = require("express");
var morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
);

app.use(express.static("build"));

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(express.json());
app.use(requestLogger);

const Person = require("./models/person");

app.get("/api/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", async (request, response, next) => {
  try {
    const persons = await Person.find();
    response.status(200).json(persons);
  } catch (error) {
    next(error);
  }
});

app.get("/api/info", async (request, response, next) => {
  try {
    const date = new Date();
    const totalPersons = await Person.countDocuments();
    response.send(
      `<div><p>phonebook has info for ${totalPersons} people</p><p>${date}</p></div>`
    );
  } catch (error) {
    next(error);
  }
});

app.get("/api/persons/:id", async (request, response, next) => {
  const id = request.params.id;

  try {
    const person = await Person.findById(id);

    if (person) {
      response.status(200).json(person);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

app.delete("/api/persons/:id", async (request, response, next) => {
  const id = request.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ error: "Invalid ID" });
  }

  try {
    await Person.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.post("/api/persons", async (request, response, next) => {
  const body = request.body;

  if (!body) {
    return response.status(400).json({ error: "Content missing" });
  }

  const requiredFields = ["name", "number"];
  const missingFields = [];

  requiredFields.forEach((field) => {
    if (!body[field]) {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    return response
      .status(400)
      .send(
        `Content ${missingFields.join(" and ")} ${
          missingFields.length > 1 ? "are" : "is"
        } missing`
      );
  }

  try {
    const existingName = await Person.findOne({ name: body.name });
    const existingNumber = await Person.findOne({ number: body.number });

    if (existingNumber) {
      //update existing person
      const updatedPerson = await Person.findByIdAndUpdate(
        existingNumber._id,
        { number: body.number },
        { new: true }
      );
      return response.status(200).json(updatedPerson);
    }

    if (existingName) {
      return response.status(400).json({ error: "Name must be unique" });
    }

    const person = new Person({
      name: body.name,
      number: body.number,
    });

    const savedPerson = await person.save();
    response.json(savedPerson);
  } catch (error) {
    next(error);
  }
});

app.put("/api/persons/:id", async (request, response, next) => {
  const id = request.params.id;
  const body = request.body;

  if (!body) {
    return response.status(400).json({ error: "Content missing" });
  }

  const person = {
    name: body.name,
    number: body.number,
  };

  try {
    const updatedPerson = await Person.findByIdAndUpdate(id, person, {
      new: true,
    });
    response.json(updatedPerson);
  } catch (error) {
    next(error);
  }
});

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error);

};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
