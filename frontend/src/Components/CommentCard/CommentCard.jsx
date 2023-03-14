import { DeleteFilled, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import Typography from 'antd/es/typography/Typography';
import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteComment, getAllBlogs, getAllFavourite, getMyBlogs } from '../../Actions/blogActions';
import './../../styles/CommentCard.css';

const CommentCard = ({imageUrl, name, comment, isUser, blogID}) => {
    const dispatch = useDispatch();

    const deleteCommentHandler = async () =>{
        await dispatch(deleteComment(blogID));
        await dispatch(getAllFavourite());
        await dispatch(getMyBlogs());
        dispatch(getAllBlogs());
    }
    
    const items = [
        {key : 1, label : (
            <Typography.Text onClick={deleteCommentHandler}> <DeleteFilled/> Delete</Typography.Text>
        )}
    ]


  return (
    <div className="commentCard">
        <div className="commentTopNav">
            <div className="commentProfile">
                <img src={imageUrl} alt="" className='profileImage' />
                <Typography.Text className="ml-10 poppins">{name}</Typography.Text>
            </div>
            {
                isUser && <Dropdown menu={{items,}} placement="bottomCenter" ><Button style={{border : "none"}}><MoreOutlined/></Button></Dropdown>
            }
        </div>
        <Typography.Text className="poppins" type="secondary">{comment}</Typography.Text>
    </div>
  )
}

export default CommentCard;