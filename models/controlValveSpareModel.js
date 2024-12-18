const db = require('../config/database');  // Use the promise-based client


const getParts = async () =>{
    try {
            const [rows] = await db.query('SELECT * FROM control_valve_spare WHERE transferred_department IS NULL;');
            return rows;
        } catch (err) {
            throw new Error('Failed to fetch parts by department: ' + err.message);
        }
};

const addPart = async (partDetails) => {

    const { sr_no, make, type, size, cv, actuator_type, on_off_or_control, body, trim, char, serial_no, air_to, asset_no, asset_desp, condition, remarks } = partDetails;
    const query = `
        INSERT INTO control_valve_spare 
        (sr_no, make, type, size, cv, actuator_type, on_off_or_control, body, trim, \`char\`, serial_no, air_to, asset_no, asset_desp, \`condition\`, remarks)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
        `;

        try {
            const [result] = await db.query(query, [sr_no, make, type, size, cv, actuator_type, on_off_or_control, body, trim, char, serial_no, air_to, asset_no, asset_desp, condition, remarks]);
            return result;
        } catch (err) {
            throw new Error('Failed to add part: ' + err.message);
        }
};

const updatePart = async (sr_no, updatedDetails) => {
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(updatedDetails)) {
        fields.push(`${key} = ?`);
        values.push(value);
    }

    if (fields.length === 0) {
        throw new Error('No fields to update');
    }

    const query = `
        UPDATE control_valve_spare 
        SET ${fields.join(', ')}
        WHERE sr_no = ?`;

    values.push(sr_no);

    try {
        const [result] = await db.query(query, values);
        return result;  // Return the result of the update
    } catch (err) {
        throw new Error('Failed to update part: ' + err.message);
    }
};

const deletePart = async (sr_no) => {
    const query = 'DELETE FROM control_valve_spare WHERE sr_no = ?';

    try {
        const [result] = await db.query(query, [sr_no]);
        return result;  // Return the result of the delete operation
    } catch (err) {
        throw new Error('Failed to delete part: ' + err.message);
    }
};


module.exports = {
    getParts,
    addPart,
    updatePart,
    deletePart
}