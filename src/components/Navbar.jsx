import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../app/userSlice";
function Navbar() {
  let { user } = useSelector((state) => state.user);
  let dispetch = useDispatch();
  console.log(user);
  return (
    <header className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>

            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/login">Login</Link>
          </li>

          <li>
            <Link to="/registor">Regitor</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-10">
        <div className="avatar">
          <div className="  rounded-full ring ring-offset-2 size-16 object-cover">
            <img src={user.photoURL} className=" object-cover" />
          </div>
        </div>

        <button
          onClick={() => {
            dispetch(logout(user));
          }}
          className="btn"
        >
          LogOut
        </button>
      </div>
    </header>
  );
}

export default Navbar;
