import React from "react";
import { TbArrowRight } from "react-icons/tb";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main id="home" className="home-page">
      <h1>Welcome to ERP Dash</h1>
      <Link to="dashboard" className="btn btn__primary">
        Go to dashboard <TbArrowRight />
      </Link>
    </main>
  );
}

export default Home;
