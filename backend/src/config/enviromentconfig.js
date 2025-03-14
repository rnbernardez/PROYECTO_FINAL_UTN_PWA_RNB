import dotenv from "dotenv";

dotenv.config();

const ENVIROMENT = {
    PORT: process.env.PORT,
    MONGO_DB_URL: process.env.MONGO_DB_URL,
    MONGO_DB_ATLAS_PASSWORD: process.env.MONGO_DB_ATLAS_PASSWORD,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    GMAIL_USERNAME: process.env.GMAIL_USERNAME,
    URL_BACKEND: process.env.URL_BACKEND
}

export default ENVIROMENT