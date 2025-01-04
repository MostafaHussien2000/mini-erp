import React from "react";
import { TbChevronDown } from "react-icons/tb";
import { NavLink } from "react-router-dom";

function SideNav() {
  return (
    <aside className="sidenav">
      <div className="sidenav__logo"></div>
      <nav className="sidenav__nav">
        <ul className="sidenav__nav__links">
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/teams">Teams</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/employees">Employees</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/settings">
              Settings <TbChevronDown />
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default SideNav;
