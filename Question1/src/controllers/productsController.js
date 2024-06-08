const { fetchProductsFromCompanies, fetchProductDetails } = require('../services/productsService');
const { generateUniqueId, paginateResults } = require('../utils/helpers');

const getProducts = async (req, res) => {
    const { categoryName } = req.params;
    const { n, page, sort, order } = req.query;

    try {
        // Fetch products from all e-commerce companies
        let products = await fetchProductsFromCompanies(categoryName);

        // Sorting logic
        if (sort) {
            products = products.sort((a, b) => {
                if (order === 'desc') {
                    return b[sort] - a[sort];
                }
                return a[sort] - b[sort];
            });
        }

        // Paginate results
        products = paginateResults(products, n, page);

        // Add unique identifiers
        products = products.map(product => ({
            ...product,
            uniqueId: generateUniqueId(product)
        }));

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

const getProductById = async (req, res) => {
    const { categoryName, productId } = req.params;

    try {
        const product = await fetchProductDetails(categoryName, productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product details' });
    }
};

module.exports = { getProducts, getProductById };
