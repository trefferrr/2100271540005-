const crypto = require('crypto');

const generateUniqueId = (product) => {
    return crypto.createHash('md5').update(product.productName + product.price).digest('hex');
};

const paginateResults = (products, n, page) => {
    if (!n || n <= 0) n = 10;
    if (!page || page <= 0) page = 1;

    const start = (page - 1) * n;
    const end = page * n;
    return products.slice(start, end);
};

module.exports = { generateUniqueId, paginateResults };
