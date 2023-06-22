import axios from "axios";

const getAll = () => {
	return axios.get("http://localhost:3001/persons");
};
const addContact = (person) => {
	return axios.post("http://localhost:3001/persons", person);
};
const deleteContact = (id) => {
	return axios.delete(`http://localhost:3001/persons/${id}`);
};

export default { getAll, addContact, deleteContact };
