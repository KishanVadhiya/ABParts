const express = require('express');
const getColumnsController = require('../controllers/getColumnsController');

const router = express.Router();

// Route to get all columns
router.get('/', getColumnsController.getColumns);

module.exports = router;