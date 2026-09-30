// module.exports = app;
const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const port = 3000;

const pathToFile = path.join(__dirname, 'db.json');

// Function to read db.json
async function readFile() {

    // Delay for 1500 milliseconds
    await new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });

    // Read the file after the delay
    const data = await fs.readFile(pathToFile, 'utf-8');

    return JSON.parse(data);
}


// GET all products
app.get('/products', async (req, res) => {
    try {

        const products = await readFile();

        res.json(products);

    } catch (error) {

        console.error('Error reading products:', error);

        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});


// GET one product by ID
app.get('/products/:id', async (req, res) => {
    try {

        const products = await readFile();

        const id = Number(req.params.id);

        const product = products.find((p) => p.id === id);

        if (!product) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        res.json(product);

    } catch (error) {

        console.error('Error fetching product:', error);

        res.status(500).json({});
    }
});


// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


// Export app
module.exports = app;