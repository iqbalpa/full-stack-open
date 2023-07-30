import React from "react";
import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const createNewAnecdote = (e) => {
		e.preventDefault();
		const anecdote = document.getElementById("anecdote").value;
		document.getElementById("anecdote").value = "";

		dispatch(newAnecdote(anecdote));
	};

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={createNewAnecdote}>
				<div>
					<input id="anecdote" />
				</div>
				<button type="submit">create</button>
			</form>
		</>
	);
};

export default AnecdoteForm;
