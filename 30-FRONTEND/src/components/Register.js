import React, {useState} from "react";
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState(false);
  const navigage = useNavigate();


  const saveData = async(e) =>{
    if(!name || !email || !password){
      setErrorMsg(true)
      return false
    }
    e.preventDefault();
    let abcd = await fetch("http://localhost:4000/register",{
      method: 'POST',
      body: JSON.stringify({name, email, password}),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    abcd = await abcd.json();
    setData(abcd);
    navigage('/usersdetail')
  }


  return (
    <div className="container">
      <form className="w-50">
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            User Name
          </label>
          <input
            type="text"
            required
            className="form-control"
            id="userName"
            onChange={(e)=>setName(e.target.value)}            
          /> 
          {errorMsg && !name && <span className="errorHandle">User name is required</span>}         
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"            
            id="exampleInputEmail1" 
            onChange={(e)=>setEmail(e.target.value)}           
          />     
          {errorMsg && !email && <span className="errorHandle">Email is mandatory to get register</span>}              
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
          required
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e)=>setPassword(e.target.value)}
          />
          {errorMsg && !password && <span className="errorHandle">Please enter password before regiter</span>}         
        </div>
        
        <button onClick={saveData} type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
