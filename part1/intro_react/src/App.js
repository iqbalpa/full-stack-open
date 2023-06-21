const App = () => {
	const course = "Half Stack application development";
	const part1 = {
		name: "Fundamentals of React",
		exercises: 10,
	};
	const part2 = {
		name: "Using props to pass data",
		exercises: 7,
	};
	const part3 = {
		name: "State of a component",
		exercises: 14,
	};

	return (
		<div>
			<Header course={course} />
			<Content part1={part1.name} exercise1={part1.exercises} part2={part2.name} exercise2={part2.exercises} part3={part3.name} exercise3={part3.exercises} />
			<Total num={part1.exercises + part2.exercises + part3.exercises} />
		</div>
	);
};

const Header = (props) => {
	console.log(props);
	return (
		<>
			<h1>{props.course}</h1>
		</>
	);
};
const Content = (props) => {
	return (
		<div>
			<Part part={props.part1} exercise={props.exercises1} />
			<Part part={props.part2} exercise={props.exercises2} />
			<Part part={props.part3} exercise={props.exercises3} />
		</div>
	);
};
const Part = (props) => {
	return (
		<>
			<p>
				{props.part} {props.exercise}
			</p>
		</>
	);
};
const Total = (props) => {
	return (
		<>
			<p>Number of exercises {props.num}</p>
		</>
	);
};

export default App;
