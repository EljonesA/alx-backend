const express = require('express');
const { listProducts, getItemById } = require('./data');
const { reserveStockById, getCurrentReservedStockById } = require('./redisClient');

const router = express.Router();

// Route to list all products
router.get('/list_products', (req, res) => {
	res.json(listProducts);
});

// Route to get a product by ID
router.get('/list_products/:itemId', async (req, res) => {
	const itemId = parseInt(req.params.itemId, 10);
	const product = getItemById(itemId);

	if (!product) {
		return res.json({ status: 'Product not found' });
	}

	const currentQuantity = product.initialAvailableQuantity - await getCurrentReservedStockById(itemId);
	res.json({ ...product, currentQuantity });
});

// Route to reserve a product
router.get('/reserve_product/:itemId', async (req, res) => {
	const itemId = parseInt(req.params.itemId, 10);
	const product = getItemById(itemId);

	if (!product) {
		return res.json({ status: 'Product not found' });
	}

	const currentReservedStock = await getCurrentReservedStockById(itemId);
	const currentQuantity = product.initialAvailableQuantity - currentReservedStock;

	if (currentQuantity <= 0) {
		return res.json({ status: 'Not enough stock available', itemId });
	}

	reserveStockById(itemId, currentReservedStock + 1);
	res.json({ status: 'Reservation confirmed', itemId });
});

module.exports = router;
