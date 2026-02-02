import dotenv from 'dotenv'
dotenv.config()
const env={
    PORT:process.env.PORT || 3300,
    MONGODB_URI:process.env.MONGODB_URI,
    DB_NAME:process.env.DB_NAME,
}
export default env
