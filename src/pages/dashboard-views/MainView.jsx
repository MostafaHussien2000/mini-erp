import React from "react";

import { Link } from "react-router-dom";

/* React Components
=================== */
import Icons from "../../ui/Icons";
import Header from "../../ui/Header";

function MainView() {
  return (
    <>
      <Header title="Dashboard" />
      <section className="dashboard-home">
        <h1>Welcome to your dashboard</h1>
        <nav className="dashboard-home__links">
          <Link className="dashboard-home__links__link" to="teams">
            <Icons.Team />
            <h3>Teams</h3>
          </Link>
          <Link className="dashboard-home__links__link" to="employees">
            <Icons.Employee />
            <h3>Employees</h3>
          </Link>
          <Link className="dashboard-home__links__link" to="settings">
            <Icons.Settings />
            <h3>Settings</h3>
          </Link>
        </nav>
      </section>
    </>
  );
}

export default MainView;
