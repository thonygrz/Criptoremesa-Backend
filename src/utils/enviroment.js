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
};
