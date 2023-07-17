import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const UpdateComp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  //   const [data, setData] = useState([]);
  const navigate = useNavigate();

  const params = useParams();

  const { name, email, password } = formData;
  const getUserDetail = async () => {
    let res = await axios.get(`http://localhost:4000/userdetail/${params.id}`);
    setFormData({
      name: res.data.name,
      email: res.data.email,
      password: res.data.password,
    });
  };
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateData = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:4000/userupdate/${params.id}`, formData);
    navigate("/usersdetail");
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  return (
    <div className="container">
      <form className="w-50">
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Name
          </label>
          <input
            value={name}
            name="name"
            type="text"
            className="form-control"
            id="userName"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            value={email}
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={password}
            type="text"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={onChange}
          />
        </div>

        <button onClick={updateData} type="submit" className="btn btn-primary">
          Update Record
        </button>
      </form>
    </div>
  );
};

export default UpdateComp;
