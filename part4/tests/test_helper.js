const Blog = require("../models/blog");

const initialBlogs = [
	{
		title: "one",
		author: "iqbal",
		url: "google.com",
		likes: 10,
	},
	{
		title: "two",
		author: "pahlevi",
		url: "youtube.com",
		likes: 1,
	},
	{
		title: "three",
		author: "amin",
		url: "twitter.com",
		likes: 5,
	},
];

module.exports = { initialBlogs };
