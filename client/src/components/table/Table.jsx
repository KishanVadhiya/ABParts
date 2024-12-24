import React, { useState, useEffect } from "react";

const Table = ({ columns, data }) => {
    const [tableData, setTableData] = useState(data);

    useEffect(() => {
        if (data && data.length > 0) {
            setTableData(data);
        }
    }, [data]);

    const handleUpdate = async (index) => {
        const updatedRow = {
            ...tableData[index],
            flow_meter_description: "Updated Description", // Example update
        };
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/posts/${index + 1}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedRow),
                }
            );
            if (response.ok) {
                const updatedData = [...tableData];
                updatedData[index] = updatedRow;
                setTableData(updatedData);
                console.log("Row updated successfully!");
            }
        } catch (error) {
            console.error("Failed to update row:", error);
        }
    };

    const handleDelete = async (index) => {
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/posts/${index + 1}`,
                {
                    method: "DELETE",
                }
            );
            if (response.ok) {
                const updatedData = tableData.filter((_, i) => i !== index);
                setTableData(updatedData);
                console.log("Row deleted successfully!");
            }
        } catch (error) {
            console.error("Failed to delete row:", error);
        }
    };

    return (
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
                {tableData && tableData.length > 0 ? (
                    tableData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>
                                    {row[column.COLUMN_NAME] !== null
                                        ? row[column.COLUMN_NAME]
                                        : "null"}
                                </td>
                            ))}
                            <td>
                                <button onClick={() => handleUpdate(rowIndex)}>Update</button>
                                <button onClick={() => handleDelete(rowIndex)}>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length + 1}>No data available</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Table;