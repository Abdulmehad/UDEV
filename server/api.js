const client = require('./connection.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Start server
app.listen(3300, () => {
    console.log("Server is now listening at port 3300");
});

// Connect to the database
client.connect();

// Routes

// Get all employees
app.get('/employeeDetail', (req, res) => {
    const query = 'SELECT * FROM employeeDetail';
    client.query(query, (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(result.rows);
        }
    });
});

// Add a new employee
app.post('/employeeDetail', (req, res) => {
    const { name, email, phone, cnic } = req.body;

    // Validate the input
    if (!name || !email || !phone) {
        res.status(400).send('Name, Email, and Phone are required');
        return;
    }

    const query = `
        INSERT INTO employeeDetail (name, email, phone, cnic)
        VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [name, email, phone, cnic];

    client.query(query, values, (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(201).json(result.rows[0]);
        }
    });
});

// Check if the user exists
app.post('/employeeLogin', (req, res) => {
    const { email, phone } = req.body;

    // Validate input
    if (!email || !phone) {
        res.status(400).send('Email and Phone are required');
        return;
    }

    const query = `
        SELECT * FROM employeeDetail
        WHERE email = $1 AND phone = $2`;
    const values = [email, phone];

    client.query(query, values, (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Internal Server Error');
        } else if (result.rows.length === 0) {
            res.status(404).send('Employee not found');
        } else {
            res.json(result.rows[0]);
        }
    });
});

// Graceful shutdown
process.on('SIGINT', () => {
    client.end();
    console.log('Database connection closed');
    process.exit();
});










// const client = require('./connection.js');
// const express = require('express');
// const app = express();

// app.listen(3300, () => {
//     console.log("Server is now listening at port 3300");
// });

// // Connect to the database once, at application startup
// client.connect();

// // app.get('/employeeDetail/:id', (req, res) => {
// //     const query = 'SELECT * FROM employeeDetail WHERE employee_id = $1';
// //     const values = [req.params.id];

// //     client.query(query, values, (err, result) => {
// //         if (err) {
// //             console.error('Error executing query', err.stack);
// //             res.status(500).send('Internal Server Error');
// //         } else {
// //             res.json(result.rows);
// //         }
// //     });
// // });

// app.get('/employeeDetail', (req, res) => {
//     const query = 'SELECT * FROM employeeDetail';

//     client.query(query,(err, result) => {
//         if (err) {
//             console.error('Error executing query', err.stack);
//             res.status(500).send('Internal Server Error');
//         } else {
//             const results=res.json(result.rows);
//         }
//     });
// });

// // Keep the connection open throughout the app's lifecycle



// // const bodyParser = require("body-parser");
// // app.use(bodyParser.json());
// //https://www.youtube.com/watch?v=HO5iiDaZO2E