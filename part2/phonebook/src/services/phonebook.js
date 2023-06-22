import axios from "axios";

const getAll = () => {
	return axios.get("http://localhost:3001/persons");
};
const addContact = (person) => {
	return axios.post("http://localhost:3001/persons", person);
};

export default { getAll, addContact };
