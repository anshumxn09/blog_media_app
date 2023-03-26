import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogs } from '../Actions/blogActions';
import { getAllUser, loadUser } from '../Actions/userAction';
import './../styles/Home.css';
import BlogCard from './BlogCard/BlogCard';
import UserProfile from './UserProfile/UserProfile';
import {toast} from 'react-toastify';
import { Typography } from 'antd';
import Loader from './Loader';

const Home = () => { 
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.userReducer);
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

  return users && blogs ? (
    <>
    <div className="horizontalView">
        {
          users && users.map((elem) => {
            return elem._id !== user._id && <UserProfile id={elem._id} key={elem._id} isVertical={true}  imageUrl={elem.avatar.url} name={elem.name}/>
          })
        }
    </div>
    <div className="homeContainer">
      <div className="left flex-col">
        {
          users && users.map((elem) => {
            return elem._id !== user._id && <UserProfile id={elem._id} key={elem._id} imageUrl={elem.avatar.url} name={elem.name}/>
          })
        }
      </div>
      <div className="right flex-col">
        {
          blogs ? blogs.map((elem) => {
            return <BlogCard key={elem._id} owner={elem.owner} blogId={elem._id} title={elem.title} description={elem.description} likes={elem.likes} comments={elem.comments} />
          }) : <Typography.Title className='uppercase text-center poppins'  style={{color : "white"}}  level={3} >No Blogs Available</Typography.Title>
        }
      </div>  
    </div>
    </>
  ) : <Loader/>
}

export default Home;