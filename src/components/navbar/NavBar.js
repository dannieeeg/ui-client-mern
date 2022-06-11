import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// used for log out if token is expired
import EventBus from "../../common/EventBus";

function NavBar(props) {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [showAdmin, setShowAdmin] = useState(false);

  console.log("Home-current user:" + currentUser);

  useEffect(() => {
    if (currentUser) {
      setShowAdmin(currentUser.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      props.logOut();
    });
  }, [currentUser, props]);

  const handleClick = (e) => {
    let targetEl = e.currentTarget;
    let link = targetEl.getElementsByClassName("nav-link")[0];
    let currentlyActive = Array.from(document.getElementsByClassName("active"));
    currentlyActive.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  };

  const pageUrl =
    window.location.pathname === "" ? "/" : window.location.pathname;
  console.log(pageUrl);

  const activeItem = {
    home: pageUrl === "/" ? " active" : "",
    createAccount: pageUrl === "/createaccount" ? " active" : "",
    login: pageUrl === "/login" ? " active" : "",
    deposit: pageUrl === "/deposit" ? " active" : "",
    withdraw: pageUrl === "/withdraw" ? " active" : "",
    allData: pageUrl === "/alldata" ? " active" : "",
    welcome: pageUrl === "/welcome" ? " active" : "",
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="p-3">
        <img src="mylogo.png" alt="MyBank" width="65px" />
        <Link className="navbar-brand brand-text" to ="#/" title="Home Page">
          BANK SAFELY WITH DANIEL GUTIERREZ 
        </Link>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item px-4" onClick={(e) => handleClick(e)}>
            <Link
              className={"nav-link" + activeItem["home"]}
              to ="/"
              title="Home"
              data-toggle="tooltip"
            >
              Home
            </Link>
          </li>
          {!currentUser && (
            <li className="nav-item px-4" onClick={(e) => handleClick(e)}>
              <Link
                className={"nav-link" + activeItem["createAccount"]}
                to ="/createaccount"
                title="Create Account"
                data-toggle="tooltip"
              >
                Create Account
              </Link>
            </li>
          )}
          {!currentUser && (
            <li className="nav-item px-4" onClick={(e) => handleClick(e)}>
              <Link
                className={"nav-link" + activeItem["login"]}
                to ="/login"
                title="Login"
                data-toggle="tooltip"
              >
                Login
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item px-4" onClick={(e) => handleClick(e)}>
              <Link
                to={"/welcome"}
                className={"nav-link" + activeItem["welcome"]}
              >
                My Account
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item px-4" onClick={(e) => handleClick(e)}>
              <Link
                className={"nav-link" + activeItem["deposit"]}
                to ="/deposit"
                title="Deposit"
                data-toggle="tooltip"
              >
                Deposit
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item px-4" onClick={(e) => handleClick(e)}>
              <Link
                className={"nav-link" + activeItem["withdraw"]}
                to ="/withdraw"
                title="Withdraw"
                data-toggle="tooltip"
              >
                Withdraw
              </Link>
            </li>
          )}

          {currentUser && showAdmin && (
            <li className="nav-item px-4" onClick={(e) => handleClick(e)}>
              <Link
                className={"nav-link" + activeItem["allData"]}
                to="/alldata"
                title="All Data"
                data-toggle="tooltip"
              >
                All Data
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item px-4" onClick={props.logOut}>
              <Link
                className={"nav-link"}
                to ="/login"
                title="logout"
                data-toggle="tooltip"
              >
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
