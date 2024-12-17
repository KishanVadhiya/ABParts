const mysql = require('mysql2');
const xlsx = require('xlsx');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.HOST,     // Database host
  user: process.env.USR,          // Database username
  password: process.env.PASSWORD,          // Database password
  database: process.env.DB  // Name of the database
});

// Read Excel file
const file = xlsx.readFile('01. Control valve.xlsx');
const sheets = file.SheetNames;
const x = file.Sheets[sheets[1]];  // Assuming the second sheet is the one we need
const jsonData = xlsx.utils.sheet_to_json(x);

// Function to preprocess and insert data
const processAndInsertData = (data) => {
  let currentDepartment = null;
  const insertValues = [];

  // Loop through the data
  data.forEach(item => {
    // Check if the entry only has 'AREA'
    if (Object.keys(item).length === 1 && item.AREA) {
      // If AREA is provided, update the current department
      currentDepartment = item.AREA;
      // console.log(`Current department updated to: ${currentDepartment}`);
    } else {
      // Prepare values for all other data with the current department
      insertValues.push([
        item["Sr.No."] || null,          // Sr.No. (Primary Key, Auto Increment)
        currentDepartment || null,       // Use the current department tracked
        item["c/nc"] || null,            // c/nc column (if exists in the data)
        item["AREA"] || null,            // AREA
        item["LOCATION"] || null,        // LOCATION
        item["MAKE"] || null,            // MAKE
        item["SIZE"] || null,            // SIZE
        item["TYPE"] || null,            // TYPE
        item["Body MOC"] || null,
        item["Trim MOC"] || null,        // Trim MOC
        item["CV"] || null,              // CV
        item["Application"] || null,     // Application
        item["Installation year "] || null, // Installation Year (new column)
        item["Date Of procurement "] || null // Date of Procurement (new column)
      ]);
    }
  });

  // Define the insert query for multiple rows
  const insertQuery = `INSERT INTO control_valve_active 
    (sr_no, department, c_nc, area, location, make, size, type, body_moc, trim_moc, cv, application, installation_year, date_of_procurement)
    VALUES ?`;

    // console.log(insertValues);

  // Execute the query to insert all rows at once
  connection.query(insertQuery, [insertValues], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
    } else {
      console.log('Inserted rows:', results.affectedRows);
    }
  });
};

// Process the data and insert into the database
processAndInsertData(jsonData);

// Close the connection
connection.end();