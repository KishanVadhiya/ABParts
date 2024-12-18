const mysql = require('mysql2');
const xlsx = require('xlsx');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.HOST,     // Database host
  user: process.env.USR,      // Database username
  password: process.env.PASSWORD, // Database password
  database: process.env.DB    // Name of the database
});

// Read Excel file (Placeholder for file name)
const fileName = '02. Flow Meter details.xlsx'; // Replace with your Excel file name
const file = xlsx.readFile(fileName);
const sheets = file.SheetNames;
const x = file.Sheets[sheets[1]]; // Assuming the first sheet is the one we need
const jsonData = xlsx.utils.sheet_to_json(x);

// Function to preprocess and insert data
const processAndInsertData = (data) => {
  let currentDepartment = null;
  const insertValues = [];

  // Loop through the data
  data.forEach(item => {
    if (Object.keys(item).length <= 4 && item.Plant) {
      // If the entry has only the "Plant" key, update the current department
      currentDepartment = item.Plant;
    } else {
      // Prepare values for all other data with the current department
      insertValues.push([
        currentDepartment || null,         // Use the current department tracked
        item["C/NC"] || null,              // c_nc column
        item["Plant"] || null,             // plant column
        item["LOACTION"] || null,          // location column
        item["MAKE"] || null,              // make column
        item["SIZE"] || null,              // size column
        item["TYPE"] || null,              // type column
        item[" MOC"] || null,               // moc column
        item["Application"] || null,       // application column
        item["Installation year "] || null, // installation_year column
        item["Date Of Purchase"] || null // date_of_procurement column
      ]);
    }
  });

  // Define the insert query for multiple rows
  const insertQuery = `INSERT INTO flow_meter_active 
    (department, c_nc, plant, location, make, size, type, moc, application, installation_year, date_of_purchase)
    VALUES ?`;

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