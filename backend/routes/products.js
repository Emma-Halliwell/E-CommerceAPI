const pool = require('../pool');

const getProducts = async (req, res) => {
    await pool.query('SELECT * FROM products JOIN price ON products.price = price.id', (error, results) => {
        if (error) {
            res.status(404).json({ "msg" : "Products table not found" });
        }
        res.status(200).json(results.rows);
    });
};

// Gets all products with the same category
const getProductsCategory = async (req, res) => {
    const { category } = req.body;
    await pool.query('SELECT * FROM products JOIN price ON products.price = price.id WHERE category = $1', [category], (error, results) => {
        if (error) {
            res.status(404).json({ "msg" : "Category could be found" });
        }
        res.status(200).json(results.rows);
    });
};

// Gets a single products
// See if you can JOIN price to this logic later
const getProductsById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM products WHERE id = $1', [id], (error, results) => {
        if (error) {
            res.status(404).json({ "msg" : "Product could not be found" });
        }
        res.status(200).json(results.rows);
    });
};

const getProductsByName = (req, res) => {
    const name = req.params.name;
    pool.query('SELECT * FROM products JOIN price ON products.price = price.id WHERE name = $1',
        [name], (error, results) => {
            if (error) {
                res.status(404).json({ "msg" : "Product could not be found"});
            } else {
                res.status(200).json(results.rows);
            }
        }
    )
};

module.exports = {
    getProducts,
    getProductsCategory,
    getProductsById,
    getProductsByName,
};