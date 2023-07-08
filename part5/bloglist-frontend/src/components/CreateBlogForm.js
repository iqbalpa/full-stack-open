import React from "react";

const CreateBlogForm = ({
	handleCreateBlog,
	handleTitleChange,
	handleAuthorChange,
	handleUrlChange,
	title,
	author,
	url,
}) => {
	return (
		<>
			<h2>create new</h2>
			<form onSubmit={handleCreateBlog}>
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
