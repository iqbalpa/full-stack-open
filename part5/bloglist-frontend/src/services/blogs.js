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
const addBlog = (newBlog) => {
	const request = axios.post(
		baseUrl,
		{ title: newBlog.title, author: newBlog.author, url: newBlog.url },
		{
			headers: {
				Authorization: `Bearer ${newBlog.token}`,
			},
		}
	);
	return request.then((response) => response.data);
};

const updateLike = async (id, user) => {
	const blog = await axios.get(`${baseUrl}/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
	const like = blog.data.likes;
	const request = await axios.patch(
		`${baseUrl}/${id}`,
		{ likes: like + 1 },
		{ headers: { Authorization: `Bearer ${user.token}` } }
	);
	return request.data;
};

const deleteBlog = async (id, user) => {
	const request = await axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
	return request.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, addBlog, updateLike, deleteBlog };
