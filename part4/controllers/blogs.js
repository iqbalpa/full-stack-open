const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
	if (!request.body._doc.url) {
		response.status(400).end();
		return;
	}
	const blog = new Blog({ likes: 0, ...request.body._doc });
	const result = await blog.save();
	response.status(201).json(result);
});

blogRouter.get("/:id", async (request, response) => {
	const id = request.params.id;
	const blog = await Blog.findById(id);
	response.json(blog);
});

blogRouter.delete("/:id", async (request, response) => {
	const id = request.params.id;
	await Blog.findByIdAndRemove(id);
	response.status(204).end();
});

blogRouter.patch("/:id", async (request, response) => {
	const id = request.params.id;
	const newData = request.body;
	const result = await Blog.findByIdAndUpdate(id, newData, { new: true });
	response.status(200).json(result);
});

module.exports = blogRouter;
