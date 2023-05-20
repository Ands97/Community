import "dotenv/config";

export default {
	server: {
		port: process.env.PORT || 3001,
	},
	db: {
		host: process.env.POSTGRES_HOST,
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		dbName: process.env.POSTGRES_DB,
		port: parseInt(process.env.DB_PORT as string) ?? 5432
	},
	jwt: {
		secret: process.env.JWT_SECRET_KEY as string,
	},
	logger: {
		level: process.env.LOGGER_LEVEL as string || 'info'
	}
};
