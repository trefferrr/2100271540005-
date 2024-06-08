const axios = require('axios');

const eCommerceCompanies = [
    'companyA',
    'companyB',
    'companyC',
    'companyD',
    'companyE'
];

const fetchProductsFromCompanies = async (categoryName) => {
    const promises = eCommerceCompanies.map(company => 
        axios.get(`http://test-server.com/${company}/${categoryName}/products`)
            .then(response => response.data)
            .catch(error => [])
    );

    const results = await Promise.all(promises);
    return results.flat();
};

const fetchProductDetails = async (categoryName, productId) => {
    const promises = eCommerceCompanies.map(company => 
        axios.get(`http://test-server.com/${company}/${categoryName}/products/${productId}`)
            .then(response => response.data)
            .catch(error => null)
    );

    const results = await Promise.all(promises);
    return results.find(product => product !== null);
};

module.exports = { fetchProductsFromCompanies, fetchProductDetails };
