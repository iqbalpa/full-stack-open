import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, user }) => {
	const [showDetail, setShowDetail] = useState(false);

	const hideWhenShowDetail = { display: showDetail ? "none" : "" };
	const showWhenShowDetail = { display: showDetail ? "" : "none" };

	const toggle = () => {
		setShowDetail(!showDetail);
	};
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	const handleLike = async (e) => {
		const id = e.target.id;
		await blogService.updateLike(id, user);
	};

	const handleDelete = async (e) => {
		const id = e.target.id;
		if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
			await blogService.deleteBlog(id, user);
		}
	};

	return (
		<div>
			<div style={hideWhenShowDetail}>
				<div style={blogStyle}>
					{blog.title} {blog.author}
					<button onClick={toggle}>view</button>
				</div>
			</div>
			<div style={showWhenShowDetail}>
				<div style={blogStyle}>
					<p>
						{blog.title}
						<button onClick={toggle}>hide</button>
					</p>
					<p>{blog.url}</p>
					<p>
						likes {blog.likes}{" "}
						<button id={blog.id} onClick={handleLike}>
							like
						</button>
					</p>
					<p>{blog.author}</p>
					<button style={{ backgroundColor: "blue" }} id={blog.id} onClick={handleDelete}>
						remove
					</button>
				</div>
			</div>
		</div>
	);
};

export default Blog;
