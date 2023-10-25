const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const Booking = db.booking;

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

exports.bookSlot = async (req, res) => {
	try {
		const userId = req?.userId; // Get the user ID from the token
		const { firstname, lastname, email, phone } = req?.body; // Get booking data

		// Create a new booking record associated with the user
		const booking = await Booking.create({
			firstname,
			lastname,
			email,
			phone,
			userId,
		});

		res.status(201).send({ message: "Slot booked successfully!", booking });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.send({ message: "An error occurred while booking the slot." });
	}
};

exports.getAllBookings = async (req, res) => {
	try {
		// Check if the user is an admin (You can use a role-based system for this)
		// if (req.user.roles.includes("admin")) {
		// Fetch all booking records
		const bookings = await Booking.findAll();

		res.status(200).send({ bookings });
		// } else {
		res.status(403).send({ message: "Admin access required." });
		// }
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.send({ message: "An error occurred while fetching bookings." });
	}
};
