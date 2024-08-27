const redis = require('redis');
const { promisify } = require('util');

// Create Redis client
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

function reserveStockById(itemId, stock) {
	client.set(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
	const stock = await getAsync(`item.${itemId}`);
	return stock ? parseInt(stock, 10) : 0;
}

module.exports = {
	reserveStockById,
	getCurrentReservedStockById
};
