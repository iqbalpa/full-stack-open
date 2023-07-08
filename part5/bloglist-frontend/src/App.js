import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import authService from "./services/auth";
import CreateBlogForm from "./components/CreateBlogForm";
import Togglable from "./components/Togglable";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(window.localStorage.getItem("user"));
	const [username, setUsername] = useState("");
	const [pass, setPass] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);
	const [isLoginFailed, setIsLoginFailed] = useState(false);

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
			setIsLoginFailed(true);
			console.log("failed to login");
			setErrorMessage("wrong credentials");
			setTimeout(() => {
				setErrorMessage(null);
				setIsLoginFailed(false);
			}, 5000);
		}
	};

	const handleLogout = () => {
		setUser(null);
		window.localStorage.removeItem("user");
	};

	const handleCreateBlog = async (blog) => {
		await blogService.addBlog({ token: user.token, ...blog });
	};

	return (
		<>
			{!user && (
				<form onSubmit={handleLogin}>
					<h2>log in to application</h2>
					{isLoginFailed && <h3 style={{ color: "red" }}>wrong username or password</h3>}
					<p>
						username
						<input
							type="text"
							value={username}
							name="username"
							onChange={({ target }) => setUsername(target.value)}
						/>
					</p>
					<p>
						password
						<input
							type="password"
							value={pass}
							name="password"
							onChange={({ target }) => setPass(target.value)}
						/>
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
					<Togglable buttonLabel="create blog">
						<CreateBlogForm handleCreateBlog={handleCreateBlog} />
					</Togglable>
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</>
	);
};

export default App;
