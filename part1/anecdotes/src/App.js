import { useState } from "react";

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
		"The only way to go fast, is to go well.",
	];

	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState({
		0: 0,
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
		6: 0,
		7: 0,
	});
	const [mostVoted, setMostVoted] = useState(0);

	const handleClickNext = () => {
		const rand = Math.round(Math.random() * 8);
		console.log(rand);
		setSelected(rand);
	};
	const handleClickVote = () => {
		const copy = { ...votes };
		copy[selected] += 1;
		setVotes(copy);
		getMostVoted();
	};
	const getMostVoted = () => {
		let max = -999;
		for (const key of Object.keys(votes)) {
			if (votes[key] >= max) {
				max = votes[key];
				setMostVoted(key);
			}
		}
	};

	return (
		<div>
			<div>
				<h1>Anecdote of the day</h1>
				<div>{anecdotes[selected]}</div>
				<p>has {votes[selected]} votes</p>
				<div>
					<button onClick={handleClickVote}>vote</button>
					<button onClick={handleClickNext}>next anecdote</button>
				</div>
			</div>
			<div>
				<h1>Anecdote with most votes</h1>
				<div>{anecdotes[mostVoted]}</div>
				<p>has {votes[mostVoted]} votes</p>
			</div>
		</div>
	);
};

export default App;
