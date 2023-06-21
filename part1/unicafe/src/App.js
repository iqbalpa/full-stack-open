import { useState } from "react";

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleClickGood = () => {
		setGood(good + 1);
	};
	const handleClickNeutral = () => {
		setNeutral(neutral + 1);
	};
	const handleClickBad = () => {
		setBad(bad + 1);
	};

	return (
		<div>
			<h1>give feedback</h1>
			<div>
				<Button text="good" handleClick={handleClickGood} />
				<Button text="neutral" handleClick={handleClickNeutral} />
				<Button text="bad" handleClick={handleClickBad} />
			</div>
			<Statistic good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

const Button = ({ text, handleClick }) => {
	return (
		<>
			<button onClick={handleClick}>{text}</button>
		</>
	);
};

const Statistic = ({ good, neutral, bad }) => {
	const all = good + neutral + bad;
	const avg = (good - bad) / all;
	const positive = (good / all) * 100;
	if (all === 0) {
		return (
			<>
				<h1>statistics</h1>
				<p>No feedback given</p>
			</>
		);
	}
	return (
		<>
			<h1>statistics</h1>
			<div>
				<p>good {good}</p>
				<p>neutral {neutral}</p>
				<p>bad {bad}</p>
				<p>all {all}</p>
				<p>average {avg}</p>
				<p>positive {positive}%</p>
			</div>
		</>
	);
};

export default App;
