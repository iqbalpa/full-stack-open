const Persons = ({ persons, handleDeleteContact }) => {
	return (
		<>
			<div>
				{persons.map((person) => (
					<p key={person.name}>
						{person.name} {person.number}
						<button onClick={() => handleDeleteContact(person.name, person.id)}>delete</button>
					</p>
				))}
			</div>
		</>
	);
};

export default Persons;
