import React from "react";

interface ITable {
  empName: string;
  description: string;
  date: string;
  time: string;
}
interface ITableData {
  tableData: ITable[];
  onDeleteClick: (e: any, index: number) => void;
}
const EmployeeTable = ({ tableData, onDeleteClick }: ITableData) => {
  return (
    <table>
      <thead>
        <tr>
          <th style={{ padding: "10px" }}>Name</th>
          <th style={{ padding: "10px" }}>Description</th>
          <th style={{ padding: "10px" }}>Date</th>
          <th style={{ padding: "10px" }}>Time</th>
          <th style={{ padding: "10px" }}>Delete</th>
        </tr>
      </thead>
      <tbody>
        {tableData &&
          tableData.map((el, index) => (
            <tr key={index}>
              <td style={{ padding: "10px" }}>{el.empName}</td>
              <td style={{ padding: "10px" }}>{el.description}</td>
              <td style={{ padding: "10px" }}>{el.date}</td>
              <td style={{ padding: "10px" }}>{el.time}</td>
              <td
                style={{ padding: "10px" }}
                onClick={(e) => onDeleteClick(e, index)}
              >
                Delete
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
