import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>Attendance App</h1>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/history">History</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
