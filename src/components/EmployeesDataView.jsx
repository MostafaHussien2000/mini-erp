import React, { useState } from "react";

function EmployeesDataView() {
  const [employees, setEmployees] = useState([
    {
      id: 0,
      name: "John Doe",
      role: "Software",
      email: "john_123@email.com",
      phone: "+201082531540",
      startDate: "02/12/2024",
      active: true,
    },
    {
      id: 0,
      name: "Ali Mike",
      role: "Data Entry",
      email: "ali_123@email.com",
      phone: "+201082531540",
      startDate: "02/12/2024",
      active: false,
    },
  ]);
  return (
    <div className="employees-data-view">
      <div className="employees-data-view__actions"></div>
      <div className="employees-data-view__table">
        <table>
          <thead>
            <th>
              <td>Employee</td>
            </th>
            <th>
              <td>Role</td>
            </th>
            <th>
              <td>E-Mail</td>
            </th>
            <th>
              <td>Phone</td>
            </th>
            <th>
              <td>Start Date</td>
            </th>
            <th>
              <td>Active</td>
            </th>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <TableRow key={employee.id} employee={employee} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeesDataView;

function TableRow({ employee }) {
  return (
    <tr>
      <td>{employee.name}</td>
      <td>{employee.role}</td>
      <td>{employee.email}</td>
      <td>{employee.phone}</td>
      <td>{employee.startDate}</td>
      <td>{employee.active ? "Active" : "Not Active"}</td>
    </tr>
  );
}
