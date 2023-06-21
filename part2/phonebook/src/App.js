import { useState } from "react";

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
			<div>
				filter shown with <input onChange={handleChangeFilter} />
			</div>

			<h2>add a new</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name: <input onChange={handleChangeName} />
				</div>
				<div>
					number: <input onChange={handleChangeNumber} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>

			<h2>Numbers</h2>
			<div>
				{personsToShow.map((person) => (
					<p key={person.name}>
						{person.name} {person.number}
					</p>
				))}
			</div>
		</div>
	);
};

export default App;
