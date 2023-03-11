import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllUser } from '../Actions/userAction';
import Header from './Header';

const Home = () => { 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch])
  return (
    <div>
    </div>
  )
}

export default Home;