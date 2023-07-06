import axios from "axios";
const baseUrl = "http://localhost:3003/api/users";

const login = (username, password) => {
	const request = axios.post(`${baseUrl}/login`, { username, password });
	return request.then((response) => response.data).catch((e) => console.log(e));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
