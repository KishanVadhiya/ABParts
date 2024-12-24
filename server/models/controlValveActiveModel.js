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
const getPartsByDepartment = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM control_valve_active;');
        return rows;
    } catch (err) {
        throw new Error('Failed to fetch parts by department: ' + err.message);
    }
};

// Add a new part
const addPart = async (partDetails) => {

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
    const fields = Object.keys(updatedDetails);
    const values = Object.values(updatedDetails);
    const setClause = fields.map(field => `${field} = ?`).join(', ');

    const query = `
        UPDATE control_valve_active 
        SET ${setClause} 
        WHERE sr_no = ?`;

    try {
        const [result] = await db.query(query, [...values, sr_no]);
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

const addPartFromSpare = async (sr_no,partDetails) => {
    const { department, c_nc, area, location, application, installation_year, date_of_procurement } = partDetails;

    try {
        const [rows]= await db.query("SELECT transferred_department, make, size, type, body, trim, cv from control_valve_spare where sr_no=?",[sr_no]);
        const {transferred_department,make, size, type, body, trim, cv} = rows[0];

        if(transferred_department != null){
            throw new Error("Spare Part Already Transferred")
        }
        const transferQuery = `
            INSERT INTO control_valve_active 
            (department, c_nc, area, location, make, size, type, body_moc, trim_moc, cv, application, installation_year, date_of_procurement)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        db.query("UPDATE control_valve_spare SET transferred_department=? where sr_no=?",[department,sr_no]);
        const [result] = await db.query(transferQuery, [department, c_nc, area, location, make, size, type, body, trim, cv, application, installation_year, date_of_procurement]);
        return result; 
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