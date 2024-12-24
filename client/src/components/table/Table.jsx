import React, { useState } from 'react';

const Table = ({ columns, data }) => {
    const [tableData, setTableData] = useState(data);

    const handleUpdate = async (index) => {
        const updatedRow = { ...tableData[index], name: 'Updated Name' }; // Example update
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${index + 1}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedRow),
        });
        if (response.ok) {
            const updatedData = [...tableData];
            updatedData[index] = updatedRow;
            setTableData(updatedData);
        }
    };

    const handleDelete = async (index) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${index + 1}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            const updatedData = tableData.filter((_, i) => i !== index);
            setTableData(updatedData);
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column}</th>
                    ))}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <td key={colIndex}>{row[column] !== undefined ? row[column] : 'null'}</td>
                        ))}
                        <td>
                            <button onClick={() => handleUpdate(rowIndex)}>Update</button>
                            <button onClick={() => handleDelete(rowIndex)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;