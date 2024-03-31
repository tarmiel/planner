export default () => ({
	NODE_ENV: process.env.NODE_ENV,
	PORT: parseInt(process.env.PORT, 10) || 4000,
	CLIENT_URL: process.env.CLIENT_URL,
	DATABASE_URL: process.env.DATABASE_HOST,
	JWT_SECRET: process.env.JWT_SECRET,
});
