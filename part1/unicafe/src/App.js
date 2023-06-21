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
			<h1>statistic</h1>
			<div>
				<p>good {good}</p>
				<p>neutral {neutral}</p>
				<p>bad {bad}</p>
			</div>
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

export default App;
