const express = require('express');

const app = express();

const port = 3000;


// Parse JSON request bodies
app.use(express.json());


// Product routes
const productRoutes = require('./routes/productRoutes');

app.use('/', productRoutes);


// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});