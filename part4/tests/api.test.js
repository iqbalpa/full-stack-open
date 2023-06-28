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
	blog = new Blog(helper.initialBlogs[2]);
	await blog.save();
});

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
