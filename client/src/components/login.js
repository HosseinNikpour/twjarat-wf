import { useHistory, useLocation } from "react-router-dom";
import React, { useState } from "react";

import { login } from "../api/index";

const Login = (props) => {
  const location = useLocation();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(location.message);

  const handelLogin = () => {
    login({ username, password })
      .then((response) => {
        if (response.data.message === "ok") {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", response.data.token);
          const url = location?.state?.from?.pathname ?? "/";

          history.push(url);
          props.callback();
        }
      })
      .catch((error) => {
        console.log(error);
        switch (error.response.status) {
          case 401:
            setMessage("نام کاربری یا رمز عبور اشتباه است");
            break;

          default:
            setMessage(error.message);
            break;
        }
      });
  };

  return (
    <div className="app-main col-12">
      <div className="row">
        <div className="col-4"></div>
        <div className="col-xs-9 col-md-4">
          <div className="card" style={{ fontSize: "20px", fontWeight: "600" }}>
            <div className="card-header">
              <div className="row">
                <div className="col login-header1" style={{ color: "red" }}>
                  {message}
                </div>
              </div>
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="username" className="">
                        نام کاربری
                      </label>
                      <input
                        name="username"
                        className="form-control"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="password" className="">
                        کلمه عبور
                      </label>

                      <input
                        name="password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                      />
                    </div>
                  </div>
                </div>
                <input
                  type="button"
                  className="btn btn-primary"
                  style={{ margin: "10px" }}
                  onClick={() => handelLogin()}
                  value="ورود"
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      handelLogin();
                    }
                  }}
                />
                <input
                  type="button"
                  className="btn btn-outline-primary"
                  style={{ margin: "10px" }}
                  value="بستن"
                />
              </form>
            </div>
          </div>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
};

export default Login;
