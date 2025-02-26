import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LiaEdit } from "react-icons/lia";
import { MdDeleteForever } from "react-icons/md";
import './ActiveControlValve.css'
const ActiveControlValve = () => {
  const apiurl = import.meta.env.VITE_BACKEND_URL;
  const [columns, setColumns] = useState([]);
  const [parts, setParts] = useState([]);
  const [editingPart, setEditingPart] = useState(null);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await axios.get(`${apiurl}v1/api/get-columns?division=active&parttype=control-valve`);
        if (response.data.success) {
          setColumns(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching columns:', error);
      }
    };

    fetchColumns();
  }, [apiurl]);

  const fetchParts = async () => {
    try {
      const response = await axios.get(`${apiurl}v1/api/control-valve-active/parts`);
      if (response.data.success) {
        setParts(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching parts:', error);
    }
  };

  useEffect(() => {
    fetchParts();
  }, [apiurl]);

  const handleUpdate = async (sr_no, updatedFields) => {
    try {
      await axios.patch(`${apiurl}v1/api/control-valve-active/parts/${sr_no}`, updatedFields);
      fetchParts(); // Re-fetch the parts to update the table
      setEditingPart(null); // Close the form
    } catch (error) {
      console.error('Error updating part:', error);
      alert('Error updating part: ' + error.message);
    }
  };

  const handleDelete = async (sr_no) => {
    try {
      await axios.delete(`${apiurl}v1/api/control-valve-active/parts/${sr_no}`);
      fetchParts(); // Re-fetch the parts to update the table
    } catch (error) {
      console.error('Error deleting part:', error);
    }
  };

  const handleEditClick = (part) => {
    setEditingPart(part.sr_no);
    setFormValues(part);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleUpdate(editingPart, formValues);
  };

  return (
    <div>
      {editingPart ? (
        <form onSubmit={handleFormSubmit}>
          {columns.map((column, index) => (
            <div key={index}>
              <label>{column.COLUMN_NAME}</label>
              <input
                type="text"
                name={column.COLUMN_NAME}
                value={formValues[column.COLUMN_NAME] || ''}
                onChange={handleFormChange}
              />
            </div>
          ))}
          <button type="submit">Submit</button>
          <button type="button" onClick={() => setEditingPart(null)}>Cancel</button>
        </form>
      ) : (
        <table>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.COLUMN_NAME}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((part) => (
              <tr key={part.sr_no}>
                {columns.map((column, index) => (
                  <td key={index}>{part[column.COLUMN_NAME]}</td>
                ))}
                <td>
                  <button onClick={() => handleEditClick(part)}><LiaEdit /></button>
                  <button onClick={() => handleDelete(part.sr_no)}><MdDeleteForever /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ActiveControlValve;
