import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [personsToShow, setPersonsToShow] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
      setPersonsToShow(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const currentName = persons.filter(
      (person) => person.name === newPerson.name
    );

    if (currentName.length === 0) {
      setPersons(persons.concat(newPerson));
      setPersonsToShow(personsToShow.concat(newPerson));
    } else {
      alert(`${newPerson.name} is already added to phonebook`);
    }
    setNewPerson({ name: "", number: "" });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const filterByName = (event) => {
    const search = event.target.value;
    setFilter(search);
    setPersonsToShow(
      persons.filter((person) => person.name.toLowerCase().includes(search))
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterByName={filterByName} />
      <PersonForm
        addPerson={addPerson}
        newPerson={newPerson}
        handleChange={handleChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
