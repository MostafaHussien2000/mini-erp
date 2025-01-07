import React, { useEffect, useState } from "react";
import Icons from "../ui/Icons";
import { Employees } from "../api/Employees";
import { Link } from "react-router-dom";
import AddNewEmployeeForm from "./AddNewEmployeeForm";

const employeesInstance = new Employees();

function EmployeesDataView() {
  const [employees, setEmployees] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [addNewEmployeeForm, showAddNewEmployeeForm] = useState(false);

  const getEmployees = async () => {
    try {
      setLoading(true);
      const data = await employeesInstance.getAllEmployees();

      setEmployees(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeEmployee = async (employee) => {
    if (confirm(`Do you want to delete ${employee.name}`)) {
      await employeesInstance.deleteEmployee(employee.id);
      setEmployees((current) => current.filter((el) => el.id !== employee.id));
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
        <button
          onClick={() => showAddNewEmployeeForm(true)}
          className="employees-data-view__actions__add"
        >
          <Icons.Plus /> New Employee
        </button>
      </div>

      {addNewEmployeeForm && (
        <AddNewEmployeeForm
          close={() => {
            showAddNewEmployeeForm(false);
          }}
          setEmployees={setEmployees}
        />
      )}
      <div className="employees-data-view__table">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Role</th>
              <th>E-Mail</th>
              <th>Phone</th>
              <th>Start Date</th>
              <th>Active</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employees?.length > 0 ? (
              employees.map((employee) => (
                <TableRow
                  key={employee.id}
                  employee={employee}
                  removeEmployee={removeEmployee}
                />
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

function TableRow({ employee, removeEmployee }) {
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
      <td>
        <button
          onClick={() => removeEmployee(employee)}
          className="remove-employee"
        >
          <Icons.Trash />
        </button>
      </td>
    </tr>
  );
}
