import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom'

const UpdateComp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//   const [data, setData] = useState([]);
  const navigate = useNavigate();

  const params = useParams();


    const getUserDetail = async() =>{
        let res = await fetch(`http://localhost:4000/userdetail/${params.id}`)
        res = await res.json();
        setName(res.name)
        setEmail(res.email)
        setPassword(res.password)
        
    }


  const updateData = async(e) =>{
    e.preventDefault();
   let res = await fetch(`http://localhost:4000/userupdate/${params.id}`,{
    method: "put",
    body: JSON.stringify({name, email, password}),
    headers:{
        "Content-Type": "Application/json"
    }
   })
   res = await res.json();
   console.log(res);
   navigate('/usersdetail');
  }

  useEffect(() => {
    getUserDetail();
  }, [])


  return (
    <div className="container">    
      <form className="w-50">
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Name
          </label>
          <input
          value={name}
            type="text"
            className="form-control"
            id="userName"
            onChange={(e)=>setName(e.target.value)}            
          />          
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
          value={email}
            type="email"
            className="form-control"            
            id="exampleInputEmail1" 
            onChange={(e)=>setEmail(e.target.value)}           
          />          
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={password}
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e)=>setPassword(e.target.value)}
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
