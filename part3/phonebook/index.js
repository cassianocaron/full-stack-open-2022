require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/person");

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

morgan.token("data", (request, response) => {
  return request.method === "POST" ? JSON.stringify(request.body) : " ";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// app.get("/info", (request, response) => {
//   const numPeople = persons.reduce((counter, person) => {
//     if (person.name) counter++;
//     return counter;
//   }, 0);

//   response.send(
//     `<p>Phonebook has info for ${numPeople} people</p><p>${new Date()}</p>`
//   );
// });

// app.get("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const person = persons.find((person) => person.id === id);

//   person ? response.json(person) : response.status(404).end();
// });

// app.delete("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id);
//   persons = persons.filter((person) => person.id !== id);

//   response.status(204).end();
// });

// const generateId = () => {
//   return Math.floor(Math.random() * 1000);
// };

// app.post("/api/persons", (request, response) => {
//   const body = request.body;

//   if (!body.name || !body.number) {
//     return response.status(400).json({
//       error: "the name or number is missing",
//     });
//   }

//   const personExists = persons.find((person) => person.name === body.name);

//   if (personExists) {
//     return response.status(400).json({
//       error: "name must be unique",
//     });
//   }

//   const person = {
//     id: generateId(),
//     name: body.name,
//     number: body.number,
//   };

//   persons = persons.concat(person);
//   response.json(person);
// });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
