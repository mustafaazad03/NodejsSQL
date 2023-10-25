module.exports = (sequelize, Sequelize) => {
	const Booking = sequelize.define("bookings", {
		firstname: {
			type: Sequelize.STRING,
		},
		lastname: {
			type: Sequelize.STRING,
		},
		email: {
			type: Sequelize.STRING,
		},
		phone: {
			type: Sequelize.STRING,
		},
	});

	return Booking;
};
