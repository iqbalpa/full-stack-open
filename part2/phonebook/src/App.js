import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "123-45-67890" }]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

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

	return (
		<div>
			<h2>Phonebook</h2>
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
				{persons.map((person) => (
					<p key={person.name}>
						{person.name} {person.number}
					</p>
				))}
			</div>
		</div>
	);
};

export default App;
