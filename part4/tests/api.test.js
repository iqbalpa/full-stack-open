const app = require("../app");
const supertest = require("supertest");
const helper = require("./test_helper");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
	await Blog.deleteMany({});

	let blog = new Blog(helper.initialBlogs[0]);
	await blog.save();
	blog = new Blog(helper.initialBlogs[1]);
	await blog.save();
}, 100000);

test("blogs returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);
});
test("all blogs are returned", async () => {
	const response = await api.get("/api/blogs");
	expect(response.body).toHaveLength(helper.initialBlogs.length);
});
test("blog has id attribute", async () => {
	const response = await api.get("/api/blogs");
	expect(response.body[0].id).toBeDefined();
});
test("valid blog can be added", async () => {
	const newBlog = new Blog({
		title: "five",
		author: "iqbal pahlevi",
		url: "google.com",
		likes: 12,
	});
	await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const response = await api.get("/api/blogs");
	expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
	const titles = response.body.map((blog) => blog.title);
	expect(titles).toContain("five");
}, 25000);
test("if likes property is missing from the request, the default is 0", async () => {
	const newBlog = new Blog({
		title: "helo this is my blog",
		author: "tom hanks",
		url: "medium.com",
	});
	const response = await api.post("/api/blogs").send(newBlog);
	expect(response.body.likes).toBe(0);
}, 25000);
test("if url property is missing from the request, then return status code 400", async () => {
	const newBlog = new Blog({
		title: "this is a blog",
		author: "author",
	});
	await api.post("/api/blogs").send(newBlog).expect(400);
}, 25000);
test("if blog is found, then delete success", async () => {
	const response = await api.get("/api/blogs");
	const id = response.body[0].id;
	await api.delete(`/api/blogs/${id}`).expect(204);
});
test("if blog is found, update success", async () => {
	const response = await api.get("/api/blogs");
	const id = response.body[0].id;
	const newTitle = "this is updated title";
	await api.patch(`/api/blogs/${id}`).send({ title: newTitle }).expect(200);
});
