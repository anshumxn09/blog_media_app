import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogs } from '../Actions/blogActions';
import { getAllUser, loadUser } from '../Actions/userAction';
import './../styles/Home.css';
import BlogCard from './BlogCard/BlogCard';
import UserProfile from './UserProfile/UserProfile';
import {toast} from 'react-toastify';

const Home = () => { 
  const dispatch = useDispatch();
  const {users} = useSelector(state => state.allUserReducer);
  const {blogs} = useSelector(state => state.getAllBlogs);
  const {message} = useSelector(state => state.likeReducer);

  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getAllBlogs());
    dispatch(loadUser());
  }, [dispatch])

  useEffect(() => {
    if(message){
        toast.success(message);
        dispatch({type : "CLEAR_MESSAGE"})
    }
}, [dispatch, message, toast])

  return (
    <div className="homeContainer">
      <div className="left flex-col">
        {
          users && users.map((elem) => {
            return <UserProfile key={elem._id} imageUrl={elem.avatar.url} name={elem.name}/>
          })
        }
      </div>
      <div className="right flex-col">
        {
          blogs && blogs.map((elem) => {
            return <BlogCard key={elem._id} owner={elem.owner} blogId={elem._id} title={elem.title} description={elem.description} likes={elem.likes} comments={elem.comments} />
          })
        }
      </div>  
    </div>
  )
}

export default Home;