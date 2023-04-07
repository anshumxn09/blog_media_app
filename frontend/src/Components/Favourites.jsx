import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFavourite } from '../Actions/blogActions';
import BlogCard from './BlogCard/BlogCard';
import {toast} from 'react-toastify';
import Typography from 'antd/es/typography/Typography';

const Favourites = () => {
    const dispatch = useDispatch();
    const {favs} = useSelector(state => state.getFavourite);
    const {message} = useSelector(state => state.likeReducer);

    useEffect(() => {
        dispatch(getAllFavourite());
    }, [dispatch]);

    useEffect(() => {
        if(message){
            toast.success(message);
            dispatch({type : "CLEAR_MESSAGE"})
        }
    }, [dispatch, message, toast])
    
  return favs  && favs.length > 0 ? (
    <div className="flex-col gradient-blue" style={{height : "90vh", overflowY : "auto"}}>
        {
            favs.map((elem) => {
                return <BlogCard key={elem._id} owner={elem.owner} blogId={elem._id} title={elem.title} description={elem.description} likes={elem.likes} comments={elem.comments} favPage={true} />
            })
        }
    </div>
  ) : <Typography.Paragraph style={{marginTop : "20px"}} className="uppercase text-center" type="secondary" >No Blogs Have Been Marked As Favourite</Typography.Paragraph>
}

export default Favourites;