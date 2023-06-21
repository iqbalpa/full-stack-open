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
			<Part part={parts[0].name} exercise={parts[0].exercises} />
			<Part part={parts[1].name} exercise={parts[1].exercises} />
			<Part part={parts[2].name} exercise={parts[2].exercises} />
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

export default App;
