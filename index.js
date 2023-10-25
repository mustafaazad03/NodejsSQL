const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

app.use(cors());
app.use(express.json());
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));

app.use(
	cookieSession({
		name: "listhub-session",
		keys: [process.env.COOKIE_SECRET],
		httpOnly: true,
		sameSite: "strict",
	})
);

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to Listhub application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

function initial() {
	Role.create({
		id: 1,
		name: "user",
	});

	Role.create({
		id: 2,
		name: "admin",
	});
}
