import React, { useState } from "react";
import Icons from "../ui/Icons";

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
      <div className="employees-data-view__actions">
        <div className="employees-data-view__actions__search">
          <Icons.Search />
          <input type="text" placeholder="Search employees" />
        </div>
        <button className="employees-data-view__actions__add">
          <Icons.Plus /> New Employee
        </button>
      </div>
      <div className="employees-data-view__table">
        <table>
          <thead>
            <th>Employee</th>
            <th>Role</th>
            <th>E-Mail</th>
            <th>Phone</th>
            <th>Start Date</th>
            <th>Active</th>
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
      <td>{employee.active ? <Icons.Tick /> : <Icons.X />}</td>
    </tr>
  );
}
