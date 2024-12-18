const controlValveActiveModel = require('../models/controlValveActiveModel');

// Get departments
const getDepartments = async (req, res) => {
    try {
        const departments = await controlValveActiveModel.getDepartments();
        res.status(200).json({ success: true, data: departments });
    } catch (err) {
        console.error('Error fetching departments:', err);  // Log the error
        res.status(500).json({ success: false, message: 'Failed to fetch departments', error: err.message });
    }
};

// Get parts by department
const getPartsByDepartment = async (req, res) => {
    const { department } = req.query;
    if (!department) {
        return res.status(400).json({ success: false, message: 'Department is required' });
    }
    try {
        const parts = await controlValveActiveModel.getPartsByDepartment(department);
        res.status(200).json({ success: true, data: parts });
    } catch (err) {
        console.error('Error fetching parts by department:', err);  // Log the error
        res.status(500).json({ success: false, message: 'Failed to fetch parts', error: err.message });
    }
};

// Add a new part
const addPart = async (req, res) => {
    const partDetails = req.body;
    if(!partDetails.department){
        return res.status(400).json({success: false, message: "Department field required"});
    }
    try {
        const result = await controlValveActiveModel.addPart(partDetails);
        res.status(201).json({ success: true, message: 'Part added successfully', data: result });
    } catch (err) {
        console.error('Error adding part:', err);  // Log the error
        res.status(500).json({ success: false, message: 'Failed to add part', error: err.message });
    }
};

// Update part details
const updatePart = async (req, res) => {
    const { sr_no } = req.params;
    const updatedDetails = req.body;
    if (!sr_no) {
        return res.status(400).json({ success: false, message: 'Serial number is required' });
    }
    try {
        const result = await controlValveActiveModel.updatePart(sr_no, updatedDetails);
        res.status(200).json({ success: true, message: 'Part updated successfully', data: result });
    } catch (err) {
        console.error('Error updating part:', err);  // Log the error
        res.status(500).json({ success: false, message: 'Failed to update part', error: err.message });
    }
};

// Delete a part
const deletePart = async (req, res) => {
    const { sr_no } = req.params;
    if (!sr_no) {
        return res.status(400).json({ success: false, message: 'Serial number is required' });
    }
    try {
        const result = await controlValveActiveModel.deletePart(sr_no);
        res.status(200).json({ success: true, message: 'Part deleted successfully', data: result });
    } catch (err) {
        console.error('Error deleting part:', err);  // Log the error
        res.status(500).json({ success: false, message: 'Failed to delete part', error: err.message });
    }
};

// Add part from spare
const addPartFromSpare = async (req, res) => {
    const { sr_no } = req.params;
    const partDetails = req.body;
    if (!sr_no) {
        return res.status(400).json({ success: false, message: 'Serial number is required' });
    }
    if(!partDetails.department){
        return res.status(400).json({success: false, message: "Department field required"});
    }
    try {
        const result = await controlValveActiveModel.addPartFromSpare(sr_no,partDetails);
        res.status(200).json({ success: true, message: 'Part moved from spare successfully', data: result });
    } catch (err) {
        console.error('Error moving part from spare:', err);  // Log the error
        res.status(500).json({ success: false, message: 'Failed to move part from spare', error: err.message });
    }
};

module.exports = {
    getDepartments,
    getPartsByDepartment,
    addPart,
    updatePart,
    deletePart,
    addPartFromSpare
};