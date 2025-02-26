const db = require('../config/database');  // Use the promise-based client

const getParts = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM flow_meter_spare WHERE transferred_department IS NULL;');
        return rows;
    } catch (err) {
        throw new Error('Failed to fetch parts by department: ' + err.message);
    }
};

const addPart = async (partDetails) => {
    const { flow_meter_description, size, qty, area_usage, serial_no, range, location, reason_for_replace, old_flow_meter_make, po_no, moc, asset_no } = partDetails;
    const query = `
        INSERT INTO flow_meter_spare 
        (flow_meter_description, size, qty, area_usage, serial_no, \`range\`, location, reason_for_replace, old_flow_meter_make, po_no, moc, asset_no)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?);
    `;

    try {
        const [result] = await db.query(query, [flow_meter_description, size, qty, area_usage, serial_no, range, location, reason_for_replace, old_flow_meter_make, po_no, moc, asset_no]);
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
        UPDATE flow_meter_spare 
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
    console.log("Reached here .......");
    console.log("The sr_no: ",sr_no);
    const query = 'DELETE FROM flow_meter_spare WHERE sr_no = ?';

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
};