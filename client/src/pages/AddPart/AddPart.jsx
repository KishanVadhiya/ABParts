import React, { useState } from 'react';
import './AddPart.css'

const AddPart = () => {
  const [division, setDivision] = useState('');
  const [partType, setPartType] = useState('');
  const [columns, setColumns] = useState([]);
  const [formData, setFormData] = useState({});

  const handleDivisionChange = (e) => {
    setDivision(e.target.value);
  };

  const handlePartTypeChange = (e) => {
    setPartType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/v1/api/get-columns?division=${division}&parttype=${partType}`);
    const data = await response.json();
    console.log(data); // Debugging line
    if (data.success && Array.isArray(data.data)) {
      const columnNames = data.data.map(item => item.COLUMN_NAME); // Updated property name
      setColumns(columnNames);
    } else {
      setColumns([]);
    }
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const endpoint = `http://localhost:3000/v1/api/${partType}-${division}/parts`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Successfully added');
      setDivision('');
      setPartType('');
      setColumns([]);
      setFormData({});
    }
  };

  return (
    <>
    <div className="form-container">
      <form className="active-control-valve-form" onSubmit={handleSubmit}>
        <div>
          <label>
            Division:
            <div>
              <select value={division} onChange={handleDivisionChange}>
                <option value="">Select Division</option>
                <option value="active">Active</option>
                <option value="spare">Spare</option>
              </select>
            </div>
          </label>
        </div>
        <div>
          <label>
            Part Type:
            <div>
              <select value={partType} onChange={handlePartTypeChange}>
                <option value="">Select Part Type</option>
                <option value="flow-meter">Flow Meter</option>
                <option value="control-valve">Control Valve</option>
              </select>
            </div>
          </label>
        </div>
        <button type="submit" className="active-control-valve-button">Get Columns</button>
      </form>
    </div>
    <div className="form-container">
      {columns.length > 0 && (
        <form className="active-control-valve-form" onSubmit={handleFormSubmit}>
          {columns.map((column, index) => (
            <div key={index}>
              <label>
                {column}:
                <div>
                  <input type="text" name={column} onChange={handleFormChange} />
                </div>
              </label>
            </div>
          ))}
          <button type="submit" className="active-control-valve-button">Add Part</button>
        </form>
      )}
    </div>
    </>
  );
};

export default AddPart;