const express = require("express");
const app = express();

app.use(express.json());

const data = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

app.get("/api/persons", (req, res) => {
	res.json(data);
});

app.get("/api/persons/:id", (req, res) => {
	const id = Number(req.params.id);
	const person = data[id - 1];

	if (person) {
		res.json(person);
	} else {
		res.status(204).send("Content missing").end();
	}
});

app.delete("/api/persons/:id", (req, res) => {
	const id = Number(req.params.id);
	const temp = data.filter((p) => p.id !== id);

	if (temp.length !== data.length) {
		res.status(200).send("Delete success");
	} else {
		res.status(204).send("Failed to delete").end();
	}
});

app.post("/api/persons", (req, res) => {
	const body = req.body;
	const name = body.name;
	const number = body.number;
	if (!name || !number) {
		return res.status(204).json({ error: "field missing" });
	}
	const id = Math.round(Math.random() * 10000);

	const isExist = data.filter((p) => p.name === name);
	if (isExist.length === 1) {
		return res.status(204).json({ error: "name must be unique" });
	}

	const person = { id, ...body };
	res.json(person);
});

app.get("/api/info", (req, res) => {
	const date = new Date();
	const options = {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		timeZoneName: "short",
	};
	const formattedDate = date.toLocaleString("en-US", options);
	res.send(`
    <p>Phonebook has info for ${data.length} people</p>
    <br/>
    <p>${formattedDate}</p>
    `);
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`listen to port ${PORT}`);
});
