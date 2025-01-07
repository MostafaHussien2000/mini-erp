import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Employees } from "../../api/Employees";
import Header from "../../ui/Header";
import Icons from "../../ui/Icons";
import SwitchButton from "../../ui/SwitchButton";
import EditEmployeeForm from "../../components/EditEmployeeForm";

function EmployeeDetailsView() {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [editNewEmployeeForm, showEditNewEmployeeForm] = useState(false);

  const EmployeesInstance = new Employees();

  const formatDate = (inputDate) => {
    const [year, month, day] = inputDate.split("-");
    return `${day}/${month}/${year}`;
  };

  const getEmployeeDetails = async () => {
    try {
      setLoading(true);

      const data = await EmployeesInstance.getEmployeeDetails(id);

      if (data) {
        setEmployee(data);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployeeDetails();
  }, []);

  return (
    <>
      <Header title="Employees" />

      {loading ? (
        <center>Loading...</center>
      ) : error ? (
        <center>{error}</center>
      ) : employee ? (
        <section className="employee-details">
          <header className="employee-details__header">
            <div className="employee-details__header__info">
              <Link to="/employees">
                <h1>Employees</h1>
              </Link>
              <Icons.ChevronRight />
              <h3>{employee.name}</h3>
            </div>
            <div className="employee-details__header__action">
              <button onClick={() => showEditNewEmployeeForm(true)}>
                Edit Employee
              </button>
            </div>
          </header>

          {editNewEmployeeForm && (
            <EditEmployeeForm
              close={() => showEditNewEmployeeForm(false)}
              employee={employee}
              setEmployee={setEmployee}
            />
          )}

          <div className="employee-details__info">
            <div className="employee-details__info__section">
              <h2>Summary</h2>
              <table>
                <tbody>
                  <tr>
                    <td className="field-name">Employee</td>
                    <td className="with-image">
                      <img src={employee?.image} alt={employee?.name} />
                      <span>{employee?.name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="field-name">Role</td>
                    <td>{employee?.role}</td>
                  </tr>
                  <tr>
                    <td className="field-name">E-Mail</td>
                    <td>{employee?.email}</td>
                  </tr>
                  <tr>
                    <td className="field-name">Phone</td>
                    <td>{employee?.phone}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="employee-details__info__double">
              <div className="employee-details__info__section">
                <h2>Date</h2>
                <table>
                  <tbody>
                    <tr>
                      <td className="field-name">Start Date</td>
                      <td>{formatDate(employee?.startDate)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="employee-details__info__section">
                <h2>Active</h2>
                <table>
                  <tbody>
                    <tr>
                      <td className="field-name">Status</td>
                      <td>
                        <SwitchButton
                          checked={employee?.activeStatus}
                          disabled={true}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <center>No data for this employee id.</center>
      )}
    </>
  );
}

export default EmployeeDetailsView;
