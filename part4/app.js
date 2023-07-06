const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const logger = require("./utils/logger");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const blogRouter = require("./controllers/blogs");
const loginRouter = require("./controllers/users");

mongoose
	.connect(config.MONGO_URI)
	.then(() => logger.info("connected to database"))
	.catch((err) => logger.error("failed to connect the database", err));

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogRouter);
app.use("/api/users", loginRouter);

app.use(middleware.errorHandler);

module.exports = app;
