import React from "react";
import { Link, useNavigate } from "react-router-dom";
import profile from "../assets/profile.webp";
import { useState, useEffect } from "react";

function Navbar() {
  const [isTokenValid, setIsTokenValid] = useState(true);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");

  const isValidToken = (token) => token && token.length > 0;
  useEffect(() => {
    const token = getToken();
    if (!isValidToken(token)) {
      setIsTokenValid(false);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setIsTokenValid(false);
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-md mb-16">
      <div className="container mx-auto">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            Ecommerce
          </Link>
        </div>
        {isTokenValid ? (
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src={profile} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={logout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <Link to="/login" className="btn btn-primary mr-4 text-xl">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary text-xl">
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
