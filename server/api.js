const client = require('./connection.js');
const express = require('express');
const app = express();

app.listen(3300, () => {
    console.log("Server is now listening at port 3300");
});

// Connect to the database once, at application startup
client.connect();

app.get('/employeeDetail/:id', (req, res) => {
    const query = 'SELECT * FROM employeeDetail WHERE employee_id = $1';
    const values = [req.params.id];

    client.query(query, values, (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(result.rows);
        }
    });
});

// Keep the connection open throughout the app's lifecycle



// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
//https://www.youtube.com/watch?v=HO5iiDaZO2E