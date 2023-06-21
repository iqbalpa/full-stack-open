const App = () => {
	const courses = [
		{
			name: "Half Stack application development",
			id: 1,
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
				{
					name: "Redux",
					exercises: 11,
					id: 4,
				},
			],
		},
		{
			name: "Node.js",
			id: 2,
			parts: [
				{
					name: "Routing",
					exercises: 3,
					id: 1,
				},
				{
					name: "Middlewares",
					exercises: 7,
					id: 2,
				},
			],
		},
	];

	return (
		<div>
			<Course course={courses[0]} />
			<Course course={courses[1]} />
		</div>
	);
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
	const total = parts.reduce((sum, part) => {
		return sum + part.exercises;
	}, 0);
	return (
		<>
			<p>total of {total} exercise</p>
		</>
	);
};

export default App;
