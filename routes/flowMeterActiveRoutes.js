const express = require('express');
const flowMeterController = require('../controllers/flowMeterActiveController');

const router = express.Router();

// Route to get departments
router.get('/departments', flowMeterController.getDepartments);

// Route to get parts by department
router.get('/parts', flowMeterController.getPartsByDepartment);

// Route to add a new part
router.post('/parts', flowMeterController.addPart);

// Route to update part details
router.patch('/parts/:sr_no', flowMeterController.updatePart);

// Route to delete a part
router.delete('/parts/:sr_no', flowMeterController.deletePart);

// Route to add part from spare
router.post('/parts/spare/:sr_no', flowMeterController.addPartFromSpare);

module.exports = router;