const express = require('express');
const flowMeterSpareController = require('../controllers/flowMeterSpareController');

const router = express.Router();

// Route to get all flow meter spares
router.get('/', flowMeterSpareController.getParts);

// Route to create a new flow meter spare
router.post('/', flowMeterSpareController.addPart);

// Route to update a flow meter spare by ID
router.patch('/:id', flowMeterSpareController.updatePart);

// Route to delete a flow meter spare by ID
router.delete('/:id', flowMeterSpareController.deletePart);

module.exports = router;