import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");

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
			const newPersons = persons.concat({ name: newName });
			setPersons(newPersons);
		}
	};
	const handleChange = (e) => {
		setNewName(e.target.value);
		console.log(newName);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name: <input onChange={handleChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div>
				{persons.map((person) => (
					<p key={person.name}>{person.name}</p>
				))}
			</div>
		</div>
	);
};

export default App;
