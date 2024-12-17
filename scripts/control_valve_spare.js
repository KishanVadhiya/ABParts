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
const file = xlsx.readFile('Control valve store Room Details oct 2024.xlsx');
const sheets = file.SheetNames;
const x = file.Sheets[sheets[0]];  
const jsonData = xlsx.utils.sheet_to_json(x);

// Function to preprocess and insert data
const processAndInsertData = (data) => {

  const insertValues = [];


  data.forEach(item => {
    if ( item.Make) {
      insertValues.push([
        item["Sr. No."] || null,         
        item["Make"] || null,            
        item["Type"] || null,            
        item["Size"] || null,        
        item["CV"] || null,            
        item["Actuator type"] || null,            
        item["On-OFF/Control"] || null,            
        item["Body"] || null,
        item["Trim"] || null,        
        item["Char"] || null,              
        item["Serial No"] || null,     
        item["Air To"] || null, 
        item["Asset. No."] || null,
        item["Asset. Desp."] || null ,
        item["Condition"] || null ,
        item["Remarks"] || null 
      ]);
    }
  });

  // Define the insert query for multiple rows
  const insertQuery = `INSERT INTO control_valve_spare 
    (sr_no, make, type, size, cv, actuator_type, on_off_or_control, body, trim, \`char\`, serial_no, air_to, asset_no, asset_desp, \`condition\`, remarks)
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