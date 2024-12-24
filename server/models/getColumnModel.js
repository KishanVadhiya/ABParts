const db = require('../config/database');  // Use the promise-based client

const getColumns = async (division,partType) => {
    try {
        if (!division || !partType) {
            throw new Error('Division and part type are required');
        }
        if(partType === 'control-valve'){
            partType = 'control_valve';
            console.log(division);
        }
        if(partType === 'flow-meter'){
            partType = 'flow_meter';
        }
        console.log("division",division);
        console.log("parttype",partType);
        const [rows] = await db.query(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${partType}_${division}'`);
        console.log(rows);
        console.log(rows);
        return rows;

    } catch (err) {
        throw new Error('Failed to fetch columns: ' + err.message);
    }
};

module.exports = {
    getColumns
};