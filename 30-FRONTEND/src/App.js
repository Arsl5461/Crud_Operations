import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Register from './components/Register';
import UsersData from './components/UsersData';
import Login from './components/Login';
import UpdateComp from './components/UpdateComp';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path='/' element={<h1>Home Page</h1>} />
          <Route path='/products' element={<h1>Products Page</h1>} />
          <Route path='/users' element={<h1>Users Page</h1>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/usersdetail' element={<UsersData />} />
          <Route path='/editform/:id' element={<UpdateComp />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
