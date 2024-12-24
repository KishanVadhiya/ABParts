const express = require('express');
const flowMeterSpareController = require('../controllers/flowMeterSpareController');

const router = express.Router();

// Route to get all flow meter spares
router.get('/parts', flowMeterSpareController.getParts);

// Route to create a new flow meter spare
router.post('/parts', flowMeterSpareController.addPart);

// Route to update a flow meter spare by ID
router.patch('/parts/:id', flowMeterSpareController.updatePart);

// Route to delete a flow meter spare by ID
router.delete('/parts/:id', flowMeterSpareController.deletePart);

module.exports = router;