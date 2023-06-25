const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Phonebook = require("./models/phonebook");

morgan.token("body", function (req, res) {
	return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

app.get("/api/persons", (req, res, next) => {
	Phonebook.find({})
		.then((contacts) => res.json(contacts))
		.catch((err) => next(err));
});

app.get("/api/persons/:id", (req, res, next) => {
	const id = req.params.id;
	Phonebook.findById(id)
		.then((contact) => res.json(contact))
		.catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
	const id = req.params.id;
	Phonebook.findByIdAndRemove(id)
		.then((contact) => res.json({ message: "delete success" }))
		.catch((err) => next(err));
});

app.post("/api/persons", (req, res, next) => {
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
	person
		.save()
		.then(() => res.json(person))
		.catch((err) => next(err));
});

app.put("/api/persons", (req, res, next) => {
	const name = req.body.name;
	const number = req.body.number;
	Phonebook.updateOne({ name: name }, { name: name, number: number }, { new: true })
		.then((updated) => res.json(updated))
		.catch((err) => next(err));
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

const errorHandler = (error, req, res, next) => {
	console.log(error.message);
	if (error.name === "CastError") {
		return res.status(204).send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		return res.status(400).json({ error: error.message });
	}
	next(error);
};
app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`listen to port ${PORT}`);
});
