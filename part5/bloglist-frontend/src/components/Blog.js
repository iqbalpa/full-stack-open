import React, { useState } from "react";

const Blog = ({ blog }) => {
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
						likes {blog.likes} <button>like</button>
					</p>
					<p>{blog.author}</p>
				</div>
			</div>
		</div>
	);
};

export default Blog;
