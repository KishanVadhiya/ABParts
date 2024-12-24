const getColumnsModel = require('../models/getColumnModel');

const getColumns = async (req, res) => {
    console.log("\n\n\n reached here with values: ", req.query.division, req.query.parttype);
    try {
        const columns = await getColumnsModel.getColumns(req.query.division, req.query.parttype);
        res.status(200).json({ success: true, data: columns });
    } catch (err) {
        console.error('Error fetching columns:', err);  // Log the error
        res.status(500).json({ success: false, message: 'Failed to fetch columns', error: err.message });
    }
}

module.exports = {
    getColumns
};