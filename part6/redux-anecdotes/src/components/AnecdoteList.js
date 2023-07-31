import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
	const data = useSelector((state) => state);
	const dispatch = useDispatch();

	const vote = (id) => {
		dispatch(voteAnecdote(id));
	};

	return (
		<>
			{data.anecdotes
				.filter((anecdote) => anecdote.content.includes(data.filter))
				.sort((a, b) => b.votes - a.votes)
				.map((anecdote) => (
					<div key={anecdote.id}>
						<div>{anecdote.content}</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => vote(anecdote.id)}>vote</button>
						</div>
					</div>
				))}
		</>
	);
};

export default AnecdoteList;
