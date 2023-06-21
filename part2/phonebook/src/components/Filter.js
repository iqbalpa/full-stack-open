const Filter = ({ handleChangeFilter }) => {
	return (
		<>
			<div>
				filter shown with <input onChange={handleChangeFilter} />
			</div>
		</>
	);
};

export default Filter;
