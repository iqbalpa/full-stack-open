import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import phoneService from "./services/phonebook";
import "./index.css";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");
	const [notifMessage, setNotifMessage] = useState(null);

	useEffect(() => {
		phoneService.getAll().then((res) => {
			setPersons(res.data);
		});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		let isExist = false;
		let updatedPerson = {};

		persons.forEach((person) => {
			console.log(person);
			if (person.name === newName) {
				isExist = true;
				updatedPerson = { ...person, number: newNumber };
			}
		});

		if (isExist) {
			if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
				phoneService
					.updateContact(updatedPerson.id, updatedPerson)
					.then((res) => {
						console.log(res);
						phoneService.getAll().then((res) => setPersons(res.data));
					})
					.catch((err) => {
						console.log("failed to update");
					});
			}
		} else {
			const person = { name: newName, number: newNumber };
			phoneService
				.addContact(person)
				.then((res) => {
					console.log("success");
					setPersons(persons.concat(res.data));
					setNotifMessage(`Added ${res.data.name}`);

					setTimeout(() => {
						setNotifMessage(null);
					}, 2000);
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
		setFilter(e.target.value.toLowerCase());
	};
	const handleDeleteContact = (name, id) => {
		if (window.confirm(`delete ${name}`)) {
			phoneService
				.deleteContact(id)
				.then((res) => {
					console.log("success delete");
					phoneService.getAll().then((res) => setPersons(res.data));
				})
				.catch((err) => {
					console.log("failed to delete");
				});
		}
	};
	const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(filter));

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={notifMessage} />
			<Filter handleChangeFilter={handleChangeFilter} />

			<h3>add a new</h3>
			<PersonForm handleSubmit={handleSubmit} handleChangeName={handleChangeName} handleChangeNumber={handleChangeNumber} />

			<h2>Numbers</h2>
			<Persons persons={personsToShow} handleDeleteContact={handleDeleteContact} />
		</div>
	);
};

export default App;
