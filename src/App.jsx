import { Route, Routes } from "react-router-dom";

/* Pages
======== */
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MainView from "./pages/dashboard-views/MainView";
import TeamsView from "./pages/dashboard-views/TeamsView";
import EmployeesView from "./pages/dashboard-views/EmployeesView";
import SettingsView from "./pages/dashboard-views/SettingsView";
import EmployeeDetailsView from "./pages/dashboard-views/EmployeeDetailsView";
import Header from "./ui/Header";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/dashboard" Component={Dashboard}>
          <Route index Component={MainView} />
          <Route path="teams" Component={TeamsView} />
          <Route path="employees" Component={EmployeesView} />
          <Route path="employees/:id" Component={EmployeeDetailsView} />
          <Route path="settings" Component={SettingsView} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
