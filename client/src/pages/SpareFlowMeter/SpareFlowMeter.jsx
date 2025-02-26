import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LiaEdit } from "react-icons/lia";
import { MdDeleteForever } from "react-icons/md";
import { TbTransfer } from "react-icons/tb";

const SpareFlowMeter = () => {
  const apiurl = import.meta.env.VITE_BACKEND_URL;
  const [columns, setColumns] = useState([]);
  const [parts, setParts] = useState([]);
  const [editingPart, setEditingPart] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [transferringPart, setTransferringPart] = useState(null);

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await axios.get(`${apiurl}v1/api/get-columns?division=spare&parttype=flow-meter`);
        if (response.data.success) {
          const filteredColumns = response.data.data.filter(column => column.COLUMN_NAME !== 'transferred_department');
          setColumns(filteredColumns);
        }
      } catch (error) {
        console.error('Error fetching columns:', error);
      }
    };

    fetchColumns();
  }, [apiurl]);

  const fetchParts = async () => {
    try {
      const response = await axios.get(`${apiurl}v1/api/flow-meter-spare/parts`);
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
      await axios.patch(`${apiurl}v1/api/flow-meter-spare/parts/${sr_no}`, updatedFields);
      fetchParts();
      setEditingPart(null);
    } catch (error) {
      console.error('Error updating part:', error);
      alert('Error updating part: ' + error.message);
    }
  };

  const handleDelete = async (sr_no) => {
    try {
      await axios.delete(`${apiurl}v1/api/flow-meter-spare/parts/${sr_no}`);
      fetchParts();
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

  const handleTransferClick = async (part) => {
    setTransferringPart(part.sr_no);
    try {
      const response = await axios.get(`${apiurl}v1/api/flow-meter-active/departments`);
      if (response.data.success) {
        setDepartments(response.data.data.map(dept => dept.department));
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleTransferSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiurl}v1/api/flow-meter-active/parts/from-spare/${transferringPart}`, { department: selectedDepartment });
      fetchParts();
      setTransferringPart(null);
      setSelectedDepartment('');
    } catch (error) {
      console.error('Error transferring part:', error);
    }
  };

  return (
    <div>
      {editingPart ? (
        <div className="form-container">
          <form className="active-control-valve-form" onSubmit={handleFormSubmit}>
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
            <button type="submit" className="active-control-valve-button">Submit</button>
            <button type="button" className="active-control-valve-button" onClick={() => setEditingPart(null)}>Cancel</button>
          </form>
        </div>
      ) : transferringPart ? (
        <div className="form-container">
          <form className="active-control-valve-form" onSubmit={handleTransferSubmit}>
            <label>Select Department</label>
            <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
              <option value="">Select Department</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
            <button type="submit" className="active-control-valve-button">Transfer</button>
            <button type="button" className="active-control-valve-button" onClick={() => setTransferringPart(null)}>Cancel</button>
          </form>
        </div>
      ) : (
        <table className="active-control-valve-table">
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
                  <button className="active-control-valve-button" onClick={() => handleEditClick(part)}><LiaEdit /></button>
                  <button className="active-control-valve-button" onClick={() => handleDelete(part.sr_no)}><MdDeleteForever /></button>
                  <button className="active-control-valve-button" onClick={() => handleTransferClick(part)}><TbTransfer /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SpareFlowMeter;