const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
	const blogs = [];

	const result = listHelper.dummy(blogs);
	expect(result).toBe(1);
});

describe("total likes", () => {
	const listWithOneBlog = [
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 5,
			__v: 0,
		},
	];

	test("when list has only one blog, equals the likes of that", () => {
		const result = listHelper.totalLikes(listWithOneBlog);
		expect(result).toBe(5);
	});
});

describe("favorite blog", () => {
	const listOfBlog = [
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 5,
			__v: 0,
		},
		{
			_id: "5a422aa71b54a676234d17jk",
			title: "Someone behind computer",
			author: "Tom Holland",
			url: "w3school.com",
			likes: 10,
			__v: 0,
		},
	];

	test("return blog with most likes", () => {
		const result = listHelper.favoriteBlog(listOfBlog);
		expect(result).toEqual({
			title: "Someone behind computer",
			author: "Tom Holland",
			likes: 10,
		});
	});
});

describe("author with most number of blog", () => {
	const listOfBlog = [
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 5,
			__v: 0,
		},
		{
			_id: "5a422aa71b54a676234d17jk",
			title: "Someone behind computer",
			author: "Tom Holland",
			url: "w3school.com",
			likes: 10,
			__v: 0,
		},
		{
			_id: "5a422aa71b54a676234d17jk",
			title: "Someone who is spiderman",
			author: "Tom Holland",
			url: "w3school.com",
			likes: 10,
			__v: 0,
		},
		{
			_id: "5a422aa71b54a676234d17jk",
			title: "Someone behind movies",
			author: "Tom Hanks",
			url: "w3school.com",
			likes: 10,
			__v: 0,
		},
	];

	test("return author with most number of blogs", () => {
		const result = listHelper.authorWithMostBlog(listOfBlog);
		expect(result).toEqual({
			author: "Tom Holland",
			blogs: 2,
		});
	});
});
describe("author with most number of likes", () => {
	const listOfBlog = [
		{
			_id: "5a422aa71b54a676234d17f8",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 5,
			__v: 0,
		},
		{
			_id: "5a422aa71b54a676234d17jk",
			title: "Someone behind computer",
			author: "Tom Holland",
			url: "w3school.com",
			likes: 10,
			__v: 0,
		},
		{
			_id: "5a422aa71b54a676234d17jk",
			title: "Someone who is spiderman",
			author: "Tom Holland",
			url: "w3school.com",
			likes: 10,
			__v: 0,
		},
		{
			_id: "5a422aa71b54a676234d17jk",
			title: "Someone behind movies",
			author: "Tom Hanks",
			url: "w3school.com",
			likes: 10,
			__v: 0,
		},
	];

	test("return author with most number of likes", () => {
		const result = listHelper.authorWithMostLike(listOfBlog);
		expect(result).toEqual({
			author: "Tom Holland",
			likes: 20,
		});
	});
});
