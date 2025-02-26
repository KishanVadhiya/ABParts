const db = require('../config/database');  // Use the promise-based client

// Get all departments (DISTINCT departments)
const getDepartments = async () => {
    try {
        const [rows] = await db.query('SELECT DISTINCT department FROM flow_meter_active');
        return rows;  // Return the rows (departments)
    } catch (err) {
        throw new Error('Failed to fetch departments: ' + err.message);
    }
};

// Get parts by department
const getPartsByDepartment = async (department) => {
    try {
        const [rows] = await db.query('SELECT * FROM flow_meter_active', [department]);
        return rows;
    } catch (err) {
        throw new Error('Failed to fetch parts by department: ' + err.message);
    }
};

// Add a new part
const addPart = async (partDetails) => {
    const { department, c_nc, plant, location, make, size, type, moc, application, installation_year, date_of_purchase } = partDetails;
    const query = `
        INSERT INTO flow_meter_active 
        (department, c_nc, plant, location, make, size, type, moc, application, installation_year, date_of_purchase)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    try {
        const [result] = await db.query(query, [department, c_nc, plant, location, make, size, type, moc, application, installation_year, date_of_purchase]);
        return result;  // Return the result of the insert
    } catch (err) {
        throw new Error('Failed to add part: ' + err.message);
    }
};

// Update part details
const updatePart = async (sr_no, updatedDetails) => {
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(updatedDetails)) {
        fields.push(`${key} = ?`);
        values.push(value);
    }

    const query = `
        UPDATE flow_meter_active 
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

// Delete a part by its serial number
const deletePart = async (sr_no) => {
    const query = 'DELETE FROM flow_meter_active WHERE sr_no = ?';

    try {
        const [result] = await db.query(query, [sr_no]);
        return result;  // Return the result of the deletion
    } catch (err) {
        throw new Error('Failed to delete part: ' + err.message);
    }
};

const transferPart = async (sr_no,partDetails) =>{
    const {department, c_nc, plant, make, type, application, installation_year, date_of_purchase} = partDetails;

    try{
        const [row] = await db.query('SELECT transferred_department, location, size, moc FROM flow_meter_spare WHERE sr_no = ?', [sr_no]);
        const {transferred_department, location, size, moc} = row[0];

        if(transferred_department != null){
            throw new Error("Spare Part Already Transferred");
        }

        const transferQuery = `INSERT INTO flow_meter_active 
        (department, c_nc, plant, location, make, size, type, moc, application, installation_year, date_of_purchase)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `

        db.query("UPDATE flow_meter_spare SET transferred_department=? where sr_no=?",[department,sr_no]);
        const [result] = await db.query(transferQuery, [department, c_nc, plant, location, make, size, type, moc, application, installation_year, date_of_purchase]);
        return result; 
    }catch (err) {
        throw new Error('Failed to add part from spare: ' + err.message);
    }
};

module.exports = {
    getDepartments,
    getPartsByDepartment,
    addPart,
    updatePart,
    deletePart,
    transferPart
};