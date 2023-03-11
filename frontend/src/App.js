import React, {useEffect} from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from './Actions/userAction';
import CreateBlog from './Components/CreateBlog';
import Search from './Components/Search';
import Profile from './Components/Profile';
import Header from './Components/Header';

const App = () => {
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector(state =>  state.userReducer);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])
  return (
    <Router>
        {isAuthenticated && <Header/>}
      <Routes>
        <Route path='/' element={
          isAuthenticated ? <Home/> : <Login/>
        }></Route>
        <Route path='/login' element={
          isAuthenticated ? <Home/> : <Login/>
        }></Route>
        <Route path='/register' element={
          isAuthenticated ? <Home/> : <Register/>
        }></Route>

        <Route path='/create/blog' element={
          isAuthenticated ? <CreateBlog/> : <Login/>
        }></Route>

        <Route path='/search' element={
          isAuthenticated ? <Search/> : <Login/>
        }></Route>

        <Route path='/profile' element={
          isAuthenticated ? <Profile/> : <Login/>
        }></Route>
      </Routes>
      <ToastContainer autoClose={2000}/>
    </Router>
  )
}

export default App;
