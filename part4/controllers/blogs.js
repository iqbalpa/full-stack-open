const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { name: 1, username: 1, id: 1 });
	response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
	console.log(request.body);
	if (!request.body.url) {
		response.status(400).end();
		return;
	}

	const user = await User.findById(request.body.userId);
	const blog = new Blog({
		likes: 0,
		...request.body,
		user: request.body.userId,
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
