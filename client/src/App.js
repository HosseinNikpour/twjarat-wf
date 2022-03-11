import "./assets/css/antd.rtl.css";
import "./assets/css/argon.rtl.css";
import "./assets/css/custom.css";
import "./assets/fonts/IRANSans/style.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/vendor/nucleo/css/nucleo.rtl.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { OtherReports } from './reports/OtherReports';
import Cardboard from "./forms/cardboard/index";
import Login from "./components/login";
import PrivateRoute from "./components/PrivateRoute";
import Report1 from "./reports/report1";
import Report2 from "./reports/report2";
import Unit from "./forms/unit/index";
import User from "./forms/user/index";
import WfItem from "./forms/wf_item/index";
import logo from "./assets/img/brand/tejarat.png";
import logout from "./assets/img/brand/logout.png";
import profile from "./assets/img/brand/user.png";

const TopMenu = () => (
  <div className="top-menu-parent">
    <div className="top-menu">
      <ul>
        <li>
          <Link to="/">
            <span>کارتابل</span>{" "}
          </Link>
        </li>
        <li>
          <Link to="/wfitem">
            <span>ایجاد گردش کار</span>
          </Link>
        </li>
        <li>
          <Link to="/report1">
            <span>گزارش گردش کار</span>
          </Link>
        </li>
        <li>
          <Link to="/report2">
            <span>گزارش پیشرفت</span>
          </Link>
        </li>
        <li>
          <Link to="/other_reports">
            <span>سایر گزارشها</span>
          </Link>
        </li>
        <li>
          <Link to="/unit">
            <span>واحد ها</span>
          </Link>
        </li>
        <li>
          <Link to="/user">
            <span>مدیریت کاربران</span>
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : undefined;
    if (user) {
      setCurrentUser({
        name: user.name,
        lastLoginDate: user.last_login,
        role_id: user.role_id,
        unit_id: user.unit_id,
      });
    }
  }, []);

  const signOut = () => {
    setCurrentUser({});
    localStorage.clear();
    window.location.reload();
  };

  const loginCallback = () => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : undefined;

    if (user) {
      setCurrentUser({
        name: user.name,
        lastLoginDate: user.last_login,
        role_id: user.role,
      });
    }
  };

  return (
    <div className="App" dir="RTL">
      <Router>
        <div className="main-content" id="panel">
          <nav className="navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom">
            <div className="container-fluid">
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <Link to="/">
                  <img
                    src={logo}
                    className="navbar-brand-img"
                    alt="..."
                    style={{ width: "59px" }}
                  />
                </Link>

                <div className="head-all">
                  {" "}
                  جریان فرآیندی ابلاغ هدف گذاری های شعب{" "}
                </div>

                {localStorage.getItem("user") && (
                  <ul className="navbar-nav align-items-center  ml-md-auto login-container ">
                    <li className="nav-item dropdown">
                      <span className="nav-link">
                        <div className="nav-login">
                          <img src={profile} className="profile" alt="..." />
                          <span className="">
                            {currentUser ? currentUser.name : ""}
                          </span>
                        </div>
                      </span>
                    </li>
                    <div className="logoutBox" onClick={() => signOut()}>
                      <img src={logout} className="logout" alt="..." />

                      <span className="exit">خروج</span>
                    </div>
                  </ul>
                )}
              </div>
            </div>
          </nav>
          <TopMenu />
          <div className="header bg-light pb-6">
            <Switch>
              <PrivateRoute path="/user" component={User} role={0} />
              <PrivateRoute path="/unit" component={Unit} role={0} />

              <PrivateRoute path="/wfitem" component={WfItem} role="" />
              <PrivateRoute path="/report1" component={Report1} role="" />
              <PrivateRoute path="/report2" component={Report2} role="" />
              <PrivateRoute path="/other_reports" component={OtherReports} role="" />

              <Route path="/login">
                <Login callback={loginCallback} />
              </Route>
              <PrivateRoute path="/" component={Cardboard} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
