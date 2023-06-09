import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";
import blogService from "../services/blogs";

jest.mock("../services/blogs", () => ({
	updateLike: jest.fn(),
	deleteBlog: jest.fn(),
}));

describe("Blog component", () => {
	let container;
	beforeEach(() => {
		const blog = {
			title: "this is the title",
			author: "this is the author",
			url: "url.com",
			likes: 10,
		};
		container = render(<Blog blog={blog} user={{}} />).container;
	});

	test("renders content", () => {
		const title = screen.getByText("this is the title");
		expect(title).toBeDefined();
		const author = screen.getByText("this is the author");
		expect(author).toBeDefined();
	});

	test("when click the view button, url and likes are displayed", async () => {
		const user = userEvent.setup();
		const button = screen.getByText("view");
		await user.click(button);

		const url = screen.getByText("url.com");
		expect(url).toBeDefined();
		const likes = container.querySelector("#like");
		expect(likes).toBeDefined();
	});

	test("clicking button twice will send prop twice", async () => {
		const updateLikeMock = jest.spyOn(blogService, "updateLike");

		const user = userEvent.setup();
		const button = screen.getByText("view");
		await user.click(button);

		const likeButton = screen.getByText("like");
		await user.click(likeButton);
		await user.click(likeButton);

		expect(updateLikeMock).toHaveBeenCalledTimes(2);
	});
});
