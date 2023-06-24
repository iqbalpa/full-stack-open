const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const Phonebook = require("./models/phonebook");

morgan.token("body", function (req, res) {
	return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

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
	Phonebook.find({}).then((contacts) => {
		res.json(contacts);
	});
});

app.get("/api/persons/:id", (req, res) => {
	const id = req.params.id;
	const person = Phonebook.findById(id).then((contact) => {
		res.json(contact);
	});
});

app.delete("/api/persons/:id", (req, res) => {
	const id = req.params.id;
	Phonebook.findByIdAndRemove(id).then((contact) => {
		res.json({ message: "delete success" });
	});
});

app.post("/api/persons", (req, res) => {
	const body = req.body;
	const name = body.name;
	const number = body.number;
	if (!name || !number) {
		return res.status(204).json({ error: "field missing" });
	}
	const person = new Phonebook({
		name: name,
		number: number,
	});
	person.save().then(() => {
		res.json(person);
	});
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

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`listen to port ${PORT}`);
});
