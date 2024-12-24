import React, { useState } from 'react';
import { Header } from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';

const AddNewPart = () => {
  const [division, setDivision] = useState('');
  const [partType, setPartType] = useState('');
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle API request to fetch columns
  const fetchColumns = async () => {
    if (!division || !partType) {
      alert('Please select division and part type.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/v1/api/get-columns?division=${division}&parttype=${partType}`
      );
      const data = await response.json();
      setFormFields(data.columns); // Assuming the API returns a `columns` array
    } catch (error) {
      console.error('Error fetching columns:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!division || !partType) {
      alert('Please select division and part type.');
      return;
    }

    const endpoint = `http://localhost:3000/v1/api/${division}-${partType}/parts`;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Part added successfully!');
      } else {
        alert('Failed to add part.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <Sidebar />
        <div style={styles.content}>
          <h1>Add New Part</h1>
          <div style={styles.formGroup}>
            <label style={styles.label}>Division:</label>
            <select
              style={styles.select}
              value={division}
              onChange={(e) => setDivision(e.target.value)}
            >
              <option value="">Select Division</option>
              <option value="control-valve">Control Valve</option>
              <option value="flow-meter">Flow Meter</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Part Type:</label>
            <select
              style={styles.select}
              value={partType}
              onChange={(e) => setPartType(e.target.value)}
            >
              <option value="">Select Part Type</option>
              <option value="active">Active</option>
              <option value="spare">Spare</option>
            </select>
          </div>
          <button style={styles.button} onClick={fetchColumns}>
            Fetch Form Fields
          </button>
          {loading && <p>Loading...</p>}
          {formFields.length > 0 && (
            <form style={styles.dynamicForm}>
              {formFields.map((field, index) => (
                <div key={index} style={styles.formGroup}>
                  <label style={styles.label}>{field.label}:</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={formData[field.name] || ''}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    placeholder={field.placeholder || ''}
                  />
                </div>
              ))}
              <button
                type="button"
                style={styles.button}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
  },
  content: {
    flex: 1,
    padding: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  dynamicForm: {
    marginTop: '20px',
  },
};

export default AddNewPart;