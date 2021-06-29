import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
function Navbar() {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(startLogout());
  };
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">{name}</span>
      <button className="btn btn-outline-danger">
        <div className="fas fa-sign-out-alt"></div>
        <span onClick={handleLogout}> Salir</span>
      </button>
    </div>
  );
}

export default Navbar;
