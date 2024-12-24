const db = require('../config/database');  // Use the promise-based client

const getColumns = async (division,partType) => {
    try {
        if (!division || !partType) {
            throw new Error('Division and part type are required');
        }
        if(division === 'control-valve'){
            division = 'control_valve';
        }
        if(division === 'flow-meter'){
            division = 'flow_meter';
        }
        const [rows] = await db.query(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${division}_${partType}'`);
        console.log(rows);
        return rows;

    } catch (err) {
        throw new Error('Failed to fetch columns: ' + err.message);
    }
};

module.exports = {
    getColumns
};