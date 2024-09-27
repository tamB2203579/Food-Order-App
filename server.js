const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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

app.get('/orders', (req, res) => {
  const sql = 'select * from order_details';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

app.post('/orders', (req, res) => {
  const { user, total } = req.body;
  const sql = 'insert into order_details (orderEmail, orderPN, totalPrice) values (?, ?, ?)';
  const values = [user.email, user.phoneNumber, total];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting order:', err);
      return res.status(500).json({ error: 'Failed to create order' });
    }
    res.status(201).json({ message: 'Order created successfully', orderID: result.insertId });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
