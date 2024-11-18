const { Client } = require('pg');

const client = new Client({
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "Employees",
    password: "xlr81234"
});

(async () => {
    try {
        await client.connect(); // Connect to the database
        const res = await client.query('SELECT * FROM employeeDetail'); // Query the table
        console.log('Data:', res.rows); // Print query result
    } catch (err) {
        console.error('Error:', err.message); // Print errors, if any
    } finally {
        await client.end(); // Close the database connection
    }
})();
