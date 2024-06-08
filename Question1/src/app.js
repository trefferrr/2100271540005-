const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Import routes
const productRoutes = require('./routes/products');
app.use('/categories', productRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
