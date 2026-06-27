/* ==========================================================================
   0. SERVER DATA, MODULES AND GLOBAL VARIABLES
============================================================================= */
const express = require('express');
const app = express();

const os = require('os');

const { Pool } = require('pg');
const envFile = require('dotenv');

// updates process.env with the new settings in .env (the file)
envFile.config({path: '../.env'});
console.log(process.env.ENV_IS_CONNECTED);

const HOST = 'localhost';
const DEFAULT_PORT = 3000;
const port = process.env.PORT || DEFAULT_PORT;


// creates a new connection pool, a manager of the connections to database, that can initiate and reuse them. (pool -> things pooled together, agrouped)
const currentPool = new Pool(
{
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
})


/* ==========================================================================
   1. MIDDLEWARE
============================================================================= */
// Parses JSON ({"Property": "Value"}) -> {Property: Value} in request body.
app.use(express.json());

app.use((clientRequest, serverResponse, proceedWithinMiddlewares) => 
{
    serverResponse.header('Access-Control-Allow-Origin', '*');
    serverResponse.header('Access-Control-Allow-Methods', 'GET, POST');
    serverResponse.header('Access-Control-Allow-Headers', 'Content-Type');
    proceedWithinMiddlewares();
})


/* ==========================================================================
   2. ROUTES
============================================================================= */
app.get('/allUsers', async (clientRequest, serverResponse) => {
    const ALL_QUERY = `SELECT userid, username, email, rolename
    FROM KAN_USER KU INNER JOIN USER_ROLE UR 
    ON (KU.user_role_roleId = UR.roleId);`;

    try 
    {
        const dataObject = await currentPool.query(ALL_QUERY);

        // SUCCESS
        serverResponse.json(
            {
                data: dataObject.rows,
                error: null 
            }
        )
    }
    catch(errorObject)
    {
        console.log(errorObject.message);
        console.log(errorObject.name);

        // ERROR
        serverResponse.status(500).json(
            {
                data: null,
                error: errorObject
            }
        )
    }
})

// NECESSARY ? OR GARBAGE?
const obterIP = () => {
    const interfaces = os.networkInterfaces();
    for (let nomeInterface in interfaces) {
        for (let info of interfaces[nomeInterface]) {
            if (info.family === 'IPv4' && !info.internal) return info.address;
        }
    }
    return 'localhost';
};

const ip = obterIP();

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://${ip}:${port}`);
});