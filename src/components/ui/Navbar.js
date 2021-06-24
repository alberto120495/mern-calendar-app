import React from "react";

function Navbar() {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">Diego</span>
      <button className="btn btn-outline-danger">
        <div className="fas fa-sign-out-alt"></div>
        <span> Salir</span>
      </button>
    </div>
  );
}

export default Navbar;
