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
		<>
			<div>
				<h1>give feedback</h1>
				<div>
					<Button text="good" handleClick={handleClickGood} />
					<Button text="neutral" handleClick={handleClickNeutral} />
					<Button text="bad" handleClick={handleClickBad} />
				</div>
			</div>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</>
	);
};

const Button = ({ text, handleClick }) => {
	return (
		<>
			<button onClick={handleClick}>{text}</button>
		</>
	);
};

const Statistics = ({ good, neutral, bad }) => {
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
			<table>
				<tbody>
					<StatisticLine text="good" value={good} />
					<StatisticLine text="neutral" value={neutral} />
					<StatisticLine text="bad" value={bad} />
					<StatisticLine text="all" value={all} />
					<StatisticLine text="average" value={avg} />
					<StatisticLine text="positive" value={positive} />
				</tbody>
			</table>
		</>
	);
};

const StatisticLine = ({ text, value }) => {
	return (
		<>
			<tr>
				<td>
					{text} {value}
				</td>
			</tr>
		</>
	);
};

export default App;
