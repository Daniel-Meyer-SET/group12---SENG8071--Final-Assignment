import dotenv from 'dotenv'
dotenv.config();

export default{
    DB_HOST: process.env.DB_HOST ||"localhost",
    DB_PASSWORD: process.env.DB_PASWORD||  "password",
    DB_PORT: process.env.DB_PORT || "5432",
    DB_DATABASE: process.env.DB_DATABASE|| "RFT-DB",
    DB_USER: process.env.DB_USER || "postgres",
    PORT: process.env.PORT || "8000"

};
