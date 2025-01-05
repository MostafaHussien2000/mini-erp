import React from "react";

/* React Components
=================== */
import Header from "../../ui/Header";
import EmployeesDataView from "../../components/EmployeesDataView";

function EmployeesView() {
  return (
    <>
      <Header title="Employees" />
      <section>
        <EmployeesDataView />
      </section>
    </>
  );
}

export default EmployeesView;
