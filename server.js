const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'FoodOrder'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.log('Error connecting to the database', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Example route to fetch data
app.get('/items', (req, res) => {
  const sql = 'SELECT * FROM order_details';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
