module.exports = {
	HOST: "localhost",
	USER: "Your SQL username",
	PASSWORD: "Your Password",
	DB: "Your Database Name",
	dialect: "mysql",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};
