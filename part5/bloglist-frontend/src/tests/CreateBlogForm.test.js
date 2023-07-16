import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlogForm from "../components/CreateBlogForm";

test("create blog via form", async () => {
	const handleCreateBlog = jest.fn();
	const user = userEvent.setup();
	render(<CreateBlogForm handleCreateBlog={handleCreateBlog} />);

	const title = screen.getByAltText("title");
	const author = screen.getByAltText("author");
	const url = screen.getByAltText("url");
	expect(title).toBeDefined();
	expect(author).toBeDefined();
	expect(url).toBeDefined();

	const createButton = screen.getByText("create");
	await user.click(createButton);
	expect(handleCreateBlog.mock.calls).toHaveLength(1);
});
