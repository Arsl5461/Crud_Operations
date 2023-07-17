import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { email, password } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warn("Email and password are required");
    } else {
      const response = await axios.post(
        "http://localhost:4000/login",
        formData
      );
      if (response.data.success) {
        toast.success("Login Successfully!");
        setFormData({
          email: "",
          password: "",
        });

        navigate("/dashboard");
      } else {
        toast.error("Login Error");
      }
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };
  return (
    <>
      <div>
        <br />
        <br />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card-group mb-0">
                <div className="card p-4">
                  <div className="card-body">
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <form onSubmit={onSubmit}>
                      <div className="input-group mb-3">
                        <span className="input-group-addon">
                          <i className="fa fa-user" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Email"
                          name="email"
                          value={email}
                          onChange={onChange}
                        />
                      </div>
                      <div className="input-group mb-4">
                        <span className="input-group-addon">
                          <i className="fa fa-lock" />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          name="password"
                          value={password}
                          onChange={onChange}
                        />
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <button
                            type="submit"
                            className="btn btn-primary px-4"
                          >
                            Login
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className="card text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <div className="card-body text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <button
                        type="button"
                        onClick={goToRegister}
                        className="btn btn-primary active mt-3"
                      >
                        Register Now!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
