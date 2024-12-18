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
const file = xlsx.readFile('01.Flow meter  SPARE.xlsx');
const sheets = file.SheetNames;
const x = file.Sheets[sheets[0]];  
const jsonData = xlsx.utils.sheet_to_json(x);

// console.log(jsonData);

// Function to preprocess and insert data
const processAndInsertData = (data) => {

  const insertValues = [];


  data.forEach(item => {

      insertValues.push([      
        item["Flow meter Discription"] || null,            
        item["Size"] || null,            
        item["Qty"] || null,        
        item["Area Usage"] || null,            
        item["Serial No"] || null,            
        item["Range"] || null,            
        item[" Location "] || null,
        item["Reason  for replace "] || null,        
        item["Old flow meter make "] || null,              
        item["PO No"] || null,     
        item["MOC"] || null, 
        item["Asset No"] || null
      ]);
    
  });

//   console.log(insertValues);

  // Define the insert query for multiple rows
  const insertQuery = `INSERT INTO flow_meter_spare 
    (flow_meter_description, size, qty, area_usage, serial_no, \`range\`, location, reason_for_replace, old_flow_meter_make, po_no, moc, asset_no)
    VALUES ?`;

    console.log("\n\n"+insertValues+"\n\n");

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