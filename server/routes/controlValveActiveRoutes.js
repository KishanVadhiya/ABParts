const express = require('express');
const router = express.Router();
const controlValveActiveController = require('../controllers/controlValveActiveController');
const { authMiddleware, authorizationMiddleware } = require('../middlewares/authMiddleware');



// Get departments
router.get('/departments', authMiddleware, controlValveActiveController.getDepartments);

// Get parts by department
router.get('/parts', authMiddleware, controlValveActiveController.getPartsByDepartment);

// Add a new part
router.post('/parts', authMiddleware, authorizationMiddleware, controlValveActiveController.addPart);

// Update part details
router.patch('/parts/:sr_no', authMiddleware, authorizationMiddleware, controlValveActiveController.updatePart);

// Delete a part
router.delete('/parts/:sr_no', authMiddleware, authorizationMiddleware, controlValveActiveController.deletePart);

// Add part from spare
router.post('/parts/from-spare/:sr_no', authMiddleware, authorizationMiddleware, controlValveActiveController.addPartFromSpare);

module.exports = router;