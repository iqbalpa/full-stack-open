const App = () => {
	const course = {
		id: 1,
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
				id: 1,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
				id: 2,
			},
			{
				name: "State of a component",
				exercises: 14,
				id: 3,
			},
		],
	};

	return <Course course={course} />;
};

const Course = ({ course }) => {
	return (
		<>
			<Header name={course.name} />
			<Content parts={course.parts} />
		</>
	);
};

const Header = ({ name }) => {
	return (
		<>
			<h1>{name}</h1>
		</>
	);
};
const Content = ({ parts }) => {
	return (
		<div>
			{parts.map((part) => (
				<Part key={part.id} part={part.name} exercise={part.exercises} />
			))}
			<SumExercises parts={parts} />
		</div>
	);
};
const Part = ({ part, exercise }) => {
	return (
		<>
			<p>
				{part} {exercise}
			</p>
		</>
	);
};
const SumExercises = ({ parts }) => {
	let sum = 0;
	parts.map((part) => (sum += part.exercises));
	return (
		<>
			<p>total of {sum} exercise</p>
		</>
	);
};

export default App;
