import "dotenv/config";

export default {
	server: {
		port: process.env.PORT || 3001,
	},
	db: {
		url: process.env.MONGO_URL as string,
	},
	jwt: {
		secret: process.env.JWT_SECRET_KEY as string,
	},
	logger: {
		level: process.env.LOGGER_LEVEL as string || 'info'
	}
};
