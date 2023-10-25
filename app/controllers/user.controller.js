const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");

exports.allAccess = (req, res) => {
	res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
	res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
	res.status(200).send("Admin Content.");
};

exports.updateProfile = async (req, res) => {
	try {
		const userId = req.userId; // Get the user ID from the token
		const { username, email, password } = req.body; // Get updated profile data

		// Find the user by ID
		const user = await User.findByPk(userId);

		if (!user) {
			return res.status(404).send({ message: "User not found." });
		}

		// Update the user's profile data
		if (username) {
			user.username = username;
		}

		if (email) {
			user.email = email;
		}

		if (password) {
			user.password = bcrypt.hashSync(password, 8);
		}

		// Save the updated user data
		await user.save();

		res.status(200).send({ message: "Profile updated successfully!" });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.send({ message: "An error occurred while updating the profile." });
	}
};
