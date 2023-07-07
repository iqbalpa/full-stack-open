import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

const getAll = (token) => {
	const request = axios.get(baseUrl, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return request.then((response) => response.data);
};
const addBlog = (token, title, author, url) => {
	const request = axios.post(
		baseUrl,
		{ title, author, url },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, addBlog };
