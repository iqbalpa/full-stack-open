import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import authService from "./services/auth";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(window.localStorage.getItem("user"));
	const [username, setUsername] = useState("");
	const [pass, setPass] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		if (!user) return;
		blogService.getAll(user.token).then((blogs) => setBlogs(blogs));
	}, [user]);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await authService.login(username, pass);
			setUser(user);
			setUsername("");
			setPass("");
			window.localStorage("user", JSON.stringify(user));
		} catch (e) {
			console.log("failed to login");
			setErrorMessage("wrong credentials");
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const handleLogout = () => {
		setUser(null);
		window.localStorage.removeItem("user");
	};

	return (
		<>
			{!user && (
				<form onSubmit={handleLogin}>
					<h2>log in to application</h2>
					<p>
						username
						<input type="text" value={username} name="username" onChange={({ target }) => setUsername(target.value)} />
					</p>
					<p>
						password
						<input type="password" value={pass} name="password" onChange={({ target }) => setPass(target.value)} />
					</p>
					<button type="submit">login</button>
				</form>
			)}
			{user && (
				<div>
					<h2>blogs</h2>
					<p>
						{user.name} logged in
						<button onClick={handleLogout}>logout</button>
					</p>
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</>
	);
};

export default App;
