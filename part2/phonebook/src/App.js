import { useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		let isExist = false;
		persons.forEach((person) => {
			console.log(person);
			if (person.name === newName) {
				isExist = true;
			}
		});
		if (isExist) alert(`${newName} is already added to phonebook`);
		else {
			const newPersons = persons.concat({ name: newName, number: newNumber });
			setPersons(newPersons);
		}
	};
	const handleChangeName = (e) => {
		setNewName(e.target.value);
	};
	const handleChangeNumber = (e) => {
		setNewNumber(e.target.value);
	};
	const handleChangeFilter = (e) => {
		setFilter(e.target.value.toLocaleLowerCase());
	};

	const personsToShow = persons.filter((person) => person.name.toLocaleLowerCase().includes(filter));

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter handleChangeFilter={handleChangeFilter} />

			<h3>add a new</h3>
			<PersonForm handleSubmit={handleSubmit} handleChangeName={handleChangeName} handleChangeNumber={handleChangeNumber} />

			<h2>Numbers</h2>
			<Persons persons={personsToShow} />
		</div>
	);
};

export default App;
