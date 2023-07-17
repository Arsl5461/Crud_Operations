import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UsersData = () => {
  const [uData, setUData] = useState([]);

  const userData = async () => {
    let res = await axios.get("http://localhost:4000/registerUser");
    setUData(res.data);
  };

  useEffect(() => {
    userData();
  }, []);

  const deleteUser = async (id) => {
    let res = await axios.delete(`http://localhost:4000/user/${id}`);
    if (res.data) {
      userData();
    } else {
      <h1>No Data Found!</h1>;
    }
  };

  return (
    <div>
      <h1 className="display-0 fw-bold my-4 text-primary">User's Details</h1>
      <hr />
      <table className="table table-hover w-75 mx-auto">
        <thead>
          <tr className="bg-warning">
            <th scope="col">Sr.No.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {uData?.length === 0 ? (
            <tr>
              <td colSpan="5">No data available</td>
            </tr>
          ) : (
            uData?.map((user, ind) => (
              <tr key={user._id}>
                <th scope="row">{ind + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <Link
                    to={`/editform/${user._id}`}
                    className="btn btn-success btn-sm me-2"
                  >
                    <i className="fas fa-edit"></i>
                  </Link>
                  <a
                    onClick={() => deleteUser(user._id)}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersData;
