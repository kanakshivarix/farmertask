import dotenv from 'dotenv'
dotenv.config()
const env={
    PORT:process.env.PORT || 3300,
    MONGODB_URI:process.env.MONGODB_URI,
    DB_NAME:process.env.DB_NAME,
    ADMIN_USERNAME:process.env.ADMIN_USERNAME,
    ADMIN_EMAIL:process.env.ADMIN_EMAIL,
    ADMIN_PASS:process.env.ADMIN_PASS,
    JWTSECRET:process.env.JWTSECRET
}
export default env
