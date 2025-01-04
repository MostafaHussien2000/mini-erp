import React from "react";
import { Link } from "react-router-dom";

function MainView() {
  return (
    <section>
      <h1>Welcome to your dashboard</h1>
      <nav>
        <Link to="teams">Teams</Link>
        <Link to="employees">Employees</Link>
        <Link to="settings">Settings</Link>
      </nav>
    </section>
  );
}

export default MainView;
