const express = require('express');
const controlValveSpareController = require('../controllers/controlValveSpareController');

const router = express.Router();

// Route to get all control valve spares
router.get('/', controlValveSpareController.getParts);


// Route to create a new control valve spare
router.post('/', controlValveSpareController.addPart);

// Route to update a control valve spare by ID
router.patch('/:id', controlValveSpareController.updatePart);

// Route to delete a control valve spare by ID
router.delete('/:id', controlValveSpareController.deletePart);

module.exports = router;