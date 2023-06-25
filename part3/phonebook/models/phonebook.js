require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const uri = process.env.URI;

mongoose
	.connect(uri)
	.then(() => {
		console.log("connected to database");
	})
	.catch((err) => {
		console.log("failed to connect database");
		process.exit(1);
	});

const phonebookSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true,
	},
	number: {
		type: String,
		minLength: 5,
		required: true,
	},
});
phonebookSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("Phonebook", phonebookSchema);
