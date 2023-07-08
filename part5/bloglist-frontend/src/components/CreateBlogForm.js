import React, { useState } from "react";

const CreateBlogForm = ({ handleCreateBlog }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");
	const [addBlogNotif, setAddBlogNotif] = useState(false);
	const handleTitleChange = (e) => setTitle(e.target.value);
	const handleAuthorChange = (e) => setAuthor(e.target.value);
	const handleUrlChange = (e) => setUrl(e.target.value);

	const createBlog = (event) => {
		event.preventDefault();
		handleCreateBlog({ title, author, url });
		setAddBlogNotif(true);
		setTimeout(() => {
			setAddBlogNotif(false);
			setTitle("");
			setAuthor("");
			setUrl("");
		}, 3000);
	};

	return (
		<>
			<h2>create new</h2>
			{addBlogNotif && (
				<h3 style={{ color: "green" }}>
					a new blog {title} by {author} added
				</h3>
			)}
			<form onSubmit={createBlog}>
				<p>
					title: <input type="text" value={title} onChange={handleTitleChange} />
				</p>
				<p>
					author: <input type="text" value={author} onChange={handleAuthorChange} />
				</p>
				<p>
					url: <input type="text" value={url} onChange={handleUrlChange} />
				</p>
				<button type="submit">create</button>
			</form>
		</>
	);
};

export default CreateBlogForm;
