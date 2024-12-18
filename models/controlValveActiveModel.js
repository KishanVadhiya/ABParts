const db = require('../config/database');  // Use the promise-based client

// Get all departments (DISTINCT departments)
const getDepartments = async () => {
    try {
        const [rows] = await db.query('SELECT DISTINCT department FROM control_valve_active');
        return rows;  // Return the rows (departments)
    } catch (err) {
        throw new Error('Failed to fetch departments: ' + err.message);
    }
};

// Get parts by department
const getPartsByDepartment = async (department) => {
    try {
        const [rows] = await db.query('SELECT * FROM control_valve_active WHERE department = ?', [department]);
        return rows;
    } catch (err) {
        throw new Error('Failed to fetch parts by department: ' + err.message);
    }
};

// Add a new part
const addPart = async (partDetails) => {
    console.log("Inside add part model\n"+partDetails);
    const { department, c_nc, area, location, make, size, type, body_moc, trim_moc, cv, application, installation_year, date_of_procurement } = partDetails;
    const query = `
        INSERT INTO control_valve_active 
        (department, c_nc, area, location, make, size, type, body_moc, trim_moc, cv, application, installation_year, date_of_procurement)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    console.log(partDetails);

    try {
        const [result] = await db.query(query, [department, c_nc, area, location, make, size, type, body_moc, trim_moc, cv, application, installation_year, date_of_procurement]);
        return result;  // Return the result of the insert
    } catch (err) {
        throw new Error('Failed to add part: ' + err.message);
    }
};

// Update part details
const updatePart = async (sr_no, updatedDetails) => {
    const { department, c_nc, area, location, make, size, type, body_moc, trim_moc, cv, application, installation_year, date_of_procurement } = updatedDetails;
    const query = `
        UPDATE control_valve_active 
        SET department = ?, c_nc = ?, area = ?, location = ?, make = ?, size = ?, type = ?, body_moc = ?, trim_moc = ?, cv = ?, application = ?, installation_year = ?, date_of_procurement = ? 
        WHERE sr_no = ?`;

    try {
        const [result] = await db.query(query, [department, c_nc, area, location, make, size, type, body_moc, trim_moc, cv, application, installation_year, date_of_procurement, sr_no]);
        return result;  // Return the result of the update
    } catch (err) {
        throw new Error('Failed to update part: ' + err.message);
    }
};

// Delete a part by its serial number
const deletePart = async (sr_no) => {
    const query = 'DELETE FROM control_valve_active WHERE sr_no = ?';

    try {
        const [result] = await db.query(query, [sr_no]);
        return result;  // Return the result of the deletion
    } catch (err) {
        throw new Error('Failed to delete part: ' + err.message);
    }
};

// Add a part from spare (transfer from control_valve_spare to control_valve_active)
const addPartFromSpare = async (sr_no) => {
    const transferQuery = `
        INSERT INTO control_valve_active (department, c_nc, area, location, make, size, type, body_moc, trim_moc, cv, application, installation_year, date_of_procurement)
        SELECT department, c_nc, area, location, make, size, type, body_moc, trim_moc, cv, application, installation_year, date_of_procurement 
        FROM control_valve_spare WHERE sr_no = ?;
        DELETE FROM control_valve_spare WHERE sr_no = ?;
    `;

    try {
        const [result] = await db.query(transferQuery, [sr_no, sr_no]);
        return result;  // Return the result of the transfer
    } catch (err) {
        throw new Error('Failed to add part from spare: ' + err.message);
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