if (process.env.NODE_ENV !== "production")
    require('dotenv').config()

export const env = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DBMS: process.env.DBMS,
    PG_DB_NAME: process.env.PG_DB_NAME,
    PG_DB_HOST: process.env.PG_DB_HOST,
    PG_DB_PORT: process.env.PG_DB_PORT,
    PG_DB_USER: process.env.PG_DB_USER,
    PG_DB_PASSWORD: process.env.PG_DB_PASSWORD,
    reCAPTCHA_SECRET_KEY: process.env.reCAPTCHA_SECRET_KEY,
    FILES_DIR: process.env.FILES_DIR,
    MAIL_SENDER: process.env.MAIL_SENDER,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN
};
