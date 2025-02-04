import React from "react";
import { Outlet } from "react-router-dom";

/* React Components
=================== */
import SideNav from "../components/SideNav";
import Header from "../ui/Header";

function Dashboard() {
  return (
    <main id="dashboard" className="dashboard">
      <SideNav />
      <section className="dashboard__content">
        <Outlet />
      </section>
    </main>
  );
}

export default Dashboard;
