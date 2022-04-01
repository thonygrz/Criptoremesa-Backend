if (process.env.NODE_ENV !== "production")
    require('dotenv').config()

export const env = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DBMS: process.env.DBMS,
    PG_DB_SM_NAME: process.env.PG_DB_SM_NAME,
    PG_DB_SM_HOST: process.env.PG_DB_SM_HOST,
    PG_DB_SM_PORT: process.env.PG_DB_SM_PORT,
    PG_DB_SM_USER: process.env.PG_DB_SM_USER,
    PG_DB_SM_PASSWORD: process.env.PG_DB_SM_PASSWORD,
    PG_DB_CR_NAME: process.env.PG_DB_CR_NAME,
    PG_DB_CR_HOST: process.env.PG_DB_CR_HOST,
    PG_DB_CR_PORT: process.env.PG_DB_CR_PORT,
    PG_DB_CR_USER: process.env.PG_DB_CR_USER,
    PG_DB_CR_PASSWORD: process.env.PG_DB_CR_PASSWORD,
    reCAPTCHA_SECRET_KEY: process.env.reCAPTCHA_SECRET_KEY,
    FILES_DIR: process.env.FILES_DIR,
    MAIL_SENDER: process.env.MAIL_SENDER,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    ENVIROMENT: process.env.ENVIROMENT
};

export const ENVIROMENTS = {
    PRODUCTION: 'prod',
    DEVELOPMENT: 'dev'
}