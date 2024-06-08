const express = require('express');
const router = express.Router();
const { getProducts, getProductById } = require('../controllers/productsController');

router.get('/:categoryName/products', getProducts);
router.get('/:categoryName/products/:productId', getProductById);

module.exports = router;
