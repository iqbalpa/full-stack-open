import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");

	useEffect(() => {
		axios.get("http://localhost:3001/persons").then((res) => setPersons(res.data));
	}, []);

	const addPerson = (newPerson) => {
		return axios.post("http://localhost:3001/persons", newPerson);
	};

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
			const person = { name: newName, number: newNumber };
			addPerson(person)
				.then((res) => {
					console.log('success')
					setPersons(persons.concat(res.data));
				})
				.catch((err) => {
					alert("failed to add new person");
				});
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
