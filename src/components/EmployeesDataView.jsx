import React, { useEffect, useState } from "react";
import Icons from "../ui/Icons";
import { Employees } from "../api/Employees";
import { Link } from "react-router-dom";

const employeesInstance = new Employees();

function EmployeesDataView() {
  const [employees, setEmployees] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getEmployees = async () => {
    try {
      setLoading(true);
      const data = await employeesInstance.getAllEmployees();

      console.log(data);

      setEmployees(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);
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
            {employees?.length > 0 ? (
              employees.map((employee) => (
                <TableRow key={employee.id} employee={employee} />
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <center style={{ opacity: 0.5 }}>No Data</center>
                </td>
              </tr>
            )}
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
      <td>
        <Link to={`${employee.id}`}>{employee.name || "Unknown"}</Link>
      </td>
      <td>{employee.role || "-"}</td>
      <td>{employee.email || "-"}</td>
      <td>{employee.phone || "-"}</td>
      <td>{employee.startDate || "-"}</td>
      <td>{employee.activeStatus ? <Icons.Tick /> : <Icons.X />}</td>
    </tr>
  );
}
