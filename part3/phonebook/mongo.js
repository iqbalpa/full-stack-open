const mongoose = require("mongoose");

const password = process.argv[2];
const uri = `mongodb+srv://iqbalpa:${password}@cluster0.leuju.mongodb.net/phonebook?retryWrites=true&w=majority`;

// define mongodb schema
const phonebookSchema = new mongoose.Schema({
	name: String,
	number: String,
});
const Phonebook = mongoose.model("Phonebook", phonebookSchema);

// db connection
mongoose.set("strictQuery", false);
mongoose
	.connect(uri)
	.then(() => {
		// console.log("connected to database");
	})
	.catch((err) => {
		// console.log("failed to connect database");
		process.exit(1);
	});

if (process.argv.length == 3) {
	console.log("Phonebook:");
	Phonebook.find({}).then((res) => {
		res.forEach((contact) => {
			console.log(contact.name, contact.number);
		});
		mongoose.connection.close();
	});
} else {
	// create object from schema
	const name = process.argv[3];
	const number = process.argv[4];
	const contact = new Phonebook({
		name: name,
		number: number,
	});

	// save the object
	contact
		.save()
		.then(() => {
			console.log("success to save the contact");
			mongoose.connection.close();
		})
		.catch(() => console.log("failed so save the contact"));
}
