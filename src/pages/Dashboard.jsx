import React from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";

/* React Components
=================== */
import SideNav from "../components/SideNav";
import MainView from "./dashboard-views/MainView";
import SettingsView from "./dashboard-views/SettingsView";
import EmployeesView from "./dashboard-views/EmployeesView";

function Dashboard() {
  return (
    <main id="dashboard" className="dashboard">
      <SideNav />
      <hr />
      <section className="dashboard__content">
        <Routes>
          <Route path="/" Component={MainView} />
          <Route path="/teams" element={<h1>Teams Page</h1>} />
          <Route path="/employees" Component={EmployeesView} />
          <Route path="/settings" Component={SettingsView} />
        </Routes>
      </section>
    </main>
  );
}

export default Dashboard;
