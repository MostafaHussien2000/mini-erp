import { Route, Routes } from "react-router-dom";

/* Pages
======== */
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/dashboard/*" Component={Dashboard} />
      </Routes>
    </>
  );
}

export default App;
