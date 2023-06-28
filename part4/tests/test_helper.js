const Blog = require("../models/blog");

const initialBlogs = [
	{
		id: "abc123efg",
		title: "one",
		author: "iqbal",
		url: "google.com",
		likes: 10,
	},
	{
		id: "abc123efh",
		title: "two",
		author: "pahlevi",
		url: "youtube.com",
		likes: 1,
	},
];

module.exports = { initialBlogs };
