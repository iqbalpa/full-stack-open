const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { name: 1, username: 1, id: 1 });
	response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
	if (!request.body.url) {
		response.status(400).end();
		return;
	}
	const user = request.user;

	const blog = new Blog({
		likes: 0,
		user: user.id,
		author: user.name,
		...request.body,
	});
	const result = await blog.save();

	user.blogs = user.blogs.concat(result.id);
	await user.save();

	response.status(201).json(result);
});

blogRouter.get("/:id", async (request, response) => {
	const id = request.params.id;
	const blog = await Blog.findById(id);
	response.json(blog);
});

blogRouter.delete("/:id", async (request, response) => {
	const id = request.params.id;
	const user = request.user;
	const blog = await Blog.findById(id);
	if (blog.user[0].id === user.id) {
		await Blog.findByIdAndRemove(id);
		response.status(204).end();
	} else {
		response.status(401).json({ error: "Unauthorized" });
	}
});

blogRouter.patch("/:id", async (request, response) => {
	const id = request.params.id;
	const newData = request.body;
	const result = await Blog.findByIdAndUpdate(id, newData, { new: true });
	response.status(200).json(result);
});

module.exports = blogRouter;
