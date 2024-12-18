const flowMeterSpareModel = require('../models/flowMeterSpareModel');

const getParts = async (req, res) => {
    try {
        const parts = await flowMeterSpareModel.getParts();
        res.status(200).json({ success: true, data: parts });
    } catch (err) {
        console.error('Error fetching parts:', err);  // Log the error
        res.status(500).json({ success: false, message: 'Failed to fetch parts', error: err.message });
    }
};

const addPart = async (req, res) => {
    const partDetails = req.body;
    try {
        const result = await flowMeterSpareModel.addPart(partDetails);
        res.status(201).json({ success: true, message: 'Part added successfully', data: result });
    } catch (err) {
        console.error('Error adding part:', err);  // Log the error
        res.status(500).json({ success: false, message: 'Failed to add part', error: err.message });
    }
};

const updatePart = async (req, res) => {
    const sr_no = req.params.id;
    const updatedDetails = req.body;
    if (!sr_no) {
        return res.status(400).json({ success: false, message: 'Serial number is required' });
    }
    try {
        const result = await flowMeterSpareModel.updatePart(sr_no, updatedDetails);
        res.status(200).json({ success: true, message: 'Part updated successfully', data: result });
    } catch (err) {
        console.error('Error updating part:', err);  // Log the error
        res.status(500).json({ success: false, message: 'Failed to update part', error: err.message });
    }
};

const deletePart = async (req, res) => {
    const sr_no = req.params.id;
    if (!sr_no) {
        return res.status(400).json({ success: false, message: 'Serial number is required' });
    }
    try {
        const result = await flowMeterSpareModel.deletePart(sr_no);
        res.status(200).json({ success: true, message: 'Part deleted successfully', data: result });
    } catch (err) {
        console.error('Error deleting part:', err);  // Log the error
        res.status(500).json({ success: false, message: 'Failed to delete part', error: err.message });
    }
};

module.exports = {
    getParts,
    addPart,
    updatePart,
    deletePart
};