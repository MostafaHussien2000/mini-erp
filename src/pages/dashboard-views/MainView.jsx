import React from "react";
import { Link } from "react-router-dom";
import Icons from "../../ui/Icons";

function MainView() {
  return (
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
  );
}

export default MainView;
