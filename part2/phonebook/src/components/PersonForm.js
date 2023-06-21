const PersonForm = ({ handleSubmit, handleChangeName, handleChangeNumber }) => {
	return (
		<>
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
		</>
	);
};

export default PersonForm;
