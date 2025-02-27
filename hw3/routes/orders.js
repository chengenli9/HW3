const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Handle GET request for viewing orders in the browser
router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../orders.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            //console.error("Error reading orders.json:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        try {
            const orders = JSON.parse(data);
            res.json(orders); // Return all orders
        } catch (parseError) {
            res.status(500).json({ error: "Error parsing JSON file" });
        }
    });
});

// Handle POST request (return all orders instead of filtering by month)
router.post('/', (req, res) => {
    const filePath = path.join(__dirname, '../orders.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            //console.error("Error reading orders.json:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        try {
            const orders = JSON.parse(data);
            res.json(orders); // Return all orders (ignores the selected month)
        } catch (parseError) {
            res.status(500).json({ error: "Error parsing JSON file" });
        }
    });
});

module.exports = router;
