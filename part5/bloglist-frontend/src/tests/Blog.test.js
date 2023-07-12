import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog";

jest.mock("../services/blogs", () => ({
	updateLike: jest.fn(),
	deleteBlog: jest.fn(),
}));

test("renders content", () => {
	const blog = {
		title: "this is the title",
		author: "this is the author",
		url: "url.com",
		likes: 0,
	};

	render(<Blog blog={blog} user={{}} />);

	const title = screen.getByText("this is the title");
	expect(title).toBeDefined();
	const author = screen.getByText("this is the author");
	expect(author).toBeDefined();
});
