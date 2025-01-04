import React from "react";
import { TbChartPie, TbChevronDown, TbUsers } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import Icons from "../ui/Icons";

function SideNav() {
  return (
    <aside className="sidenav">
      <div className="sidenav__logo">
        <img src="logo.png" alt="ERP Dash Logo" width={"150px"} />
      </div>
      <nav className="sidenav__nav">
        <ul className="sidenav__nav__links">
          <li>
            {/* <TbChartPie /> */}
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                isActive
                  ? "sidenav__nav__links__link active"
                  : "sidenav__nav__links__link"
              }
            >
              <div className="sidenav__nav__links__link__icon">
                <Icons.Dashboard />
              </div>
              <span className="sidenav__nav__links__link__text">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/teams"
              className={({ isActive }) =>
                isActive
                  ? "sidenav__nav__links__link active"
                  : "sidenav__nav__links__link"
              }
            >
              <div className="sidenav__nav__links__link__icon">
                <Icons.Team />
              </div>
              <span className="sidenav__nav__links__link__text">Teams</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/employees"
              className={({ isActive }) =>
                isActive
                  ? "sidenav__nav__links__link active"
                  : "sidenav__nav__links__link"
              }
            >
              <div className="sidenav__nav__links__link__icon">
                <Icons.Employee />
              </div>
              <span className="sidenav__nav__links__link__text">Employees</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) =>
                isActive
                  ? "sidenav__nav__links__link active"
                  : "sidenav__nav__links__link"
              }
            >
              <div className="sidenav__nav__links__link__icon">
                <Icons.Settings />
              </div>
              <span className="sidenav__nav__links__link__text">Settings</span>
              <Icons.ChevronDown />
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default SideNav;
