import { CommentOutlined, EditFilled, HeartFilled, HeartOutlined, StarFilled, StarOutlined, MoreOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Dropdown, Form, Input, Modal, Typography } from "antd";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToFavourite, commentBlog, getAllBlogs, getAllFavourite, getMyBlogs, likeBlog } from "../../Actions/blogActions";
import { loadSearchUser, loadUser } from "../../Actions/userAction";
import "../../styles/BlogCard.css";
import CommentCard from "../CommentCard/CommentCard";
import UserProfile from "../UserProfile/UserProfile";

const BlogCard = ({description, title, blogId, likes, comments, owner, favPage=false, myProfile=false, searchUser="" }) => {
    const {user} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const [isLikeOpen, setLikeOpen] = useState(false);
    const [isCommentOpen, setCommentOpen] = useState(false);
    const [likeToggle, setLikeToggle] = useState(false);
    const [starToggle, setStarToggle] = useState(false);

    const likeHandler = async () =>{
        await dispatch(likeBlog(blogId));
        setLikeToggle(!likeToggle);

        if(myProfile){
            await dispatch(getMyBlogs());
        }

        if(searchUser){
            await dispatch(loadSearchUser(searchUser));
        }

        if(favPage){
            await dispatch(getAllBlogs());
            dispatch(getAllFavourite());
        }else dispatch(getAllBlogs());
    }

    const handleComment = async (values) => {
        const {comment} = values;
        await dispatch(commentBlog(blogId, comment));
        if(myProfile){
            await dispatch(getMyBlogs());
        }

        if(searchUser){
            await dispatch(loadSearchUser(searchUser));
        }

        if(favPage){
            await dispatch(getAllBlogs());
            dispatch(getAllFavourite());
        }else dispatch(getAllBlogs());
    }

    const handleStar = async () => {
        setStarToggle(!starToggle);
        await dispatch(addToFavourite(blogId));
        await dispatch(loadUser());
        if(myProfile){
            await dispatch(getMyBlogs());
        }

        if(searchUser){
            await dispatch(loadSearchUser(searchUser));
        }
        
        if(favPage){
            await dispatch(getAllBlogs());
            dispatch(getAllFavourite());
        }else dispatch(getAllBlogs());
    }

    const showComment = () => {
        setCommentOpen(true);
    };

    const handleOkComment = () => {
        setCommentOpen(false);
    };

    const handleCancelComment = () => {
        setCommentOpen(false);
    };

    const showModal = () => {
        setLikeOpen(true);
    };

    const handleOk = () => {
        setLikeOpen(false);
    };

    const handleCancel = () => {
        setLikeOpen(false);
    };

    const items = [{
        key : 1,
        label : <Button style={{border : "none"}}> <EditFilled/> Edit</Button>
    },{
        key : 2,
        label : <Button style={{border : "none"}}> <DeleteOutlined/> Delete</Button>
    }
]
    useEffect(() => {
        likes.forEach((elem) => {
            if(elem._id === user._id){
                setLikeToggle(true)
            }
        })

        if(user){
            if(user.favourites.includes(blogId)){
                setStarToggle(true);
            }
        }

    }, [likes, setLikeToggle, user, setStarToggle])

  return (
    <Card className="card">
      <Link style={{display : 'flex', justifyItems : "space-between", alignItems : "center"}}>
        <div className="topHeaderBlog">
            <img
            src={owner.avatar.url}
            alt={owner.name}
            className="profileImage"
            />
            <Typography.Text className="ml-10 poppins" type="secondary">{owner.name}</Typography.Text>
        </div>
        {
            myProfile && <Dropdown menu={{items}} placement="bottomCenter">
            <Button style={{border : "none"}}> <MoreOutlined /> </Button>
        </Dropdown>
        }
      </Link>
      <Typography.Title className="mt-10 poppins" level={3}>{title}</Typography.Title>
      <Typography.Text className="poppins"> {
        description && description.length > 992 ? description.substring(0, 992)+"..." : description
      } </Typography.Text>
      <div className="actions" style={{marginBottom : "0"}}>
        <div className="like">
            <Modal title="Liked By" okButtonProps={{style : {display : "none"}}} cancelButtonProps={{style : {display : "none"}}} open={isLikeOpen} onOk={handleOk} onCancel={handleCancel}>
                <div style={{height : "300px" ,overflowY : 'auto'}}>
                {
                    likes && likes.length > 0 ? likes.map((elem) => {
                        return <UserProfile id={elem._id} key={elem._id} imageUrl={elem.avatar.url} name={elem.name}/>
                    }) : <Typography.Text className="uppercase">No Likes Yet</Typography.Text>
                }
                </div>
            </Modal>
            {
                likeToggle ? <HeartFilled style={{cursor : "pointer"}} className="blog-icon" onClick={likeHandler}/> : <HeartOutlined style={{cursor : "pointer"}} className="blog-icon" onClick={likeHandler} /> 
            }
            <Typography.Text onClick={showModal} className="poppins" style={{fontSize : "18px", cursor : "pointer", marginLeft : "3px"}}>{likes.length}</Typography.Text>
        </div>
        <div className="comment">
            <Modal title="Comment By" okButtonProps={{style : {display : "none"}}} cancelButtonProps={{style : {display : "none"}}} open={isCommentOpen} onOk={handleOkComment} onCancel={handleCancelComment}>
            <Form layout="inline" onFinish={handleComment}>
                <Form.Item style={{width : "50%"}} name="comment" >
                    <Input maxLength={50} placeholder="enter your comment"></Input>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit"> <EditFilled/> </Button>
                </Form.Item>
            </Form>
            <div style={{height : "300px" ,overflowY : 'auto', marginTop : "5px"}}>
                {
                    comments && comments.length > 0 ? comments.map((elem) => {
                        return <CommentCard key={elem._id} name={elem.user.name} imageUrl={elem.user.avatar.url} comment={elem.message} isUser={elem.user._id === user._id ? true : false} blogID={blogId} />
                    }) : <Typography.Text className="uppercase">No Comments Yet</Typography.Text>
                }
                </div>
            </Modal>
            <CommentOutlined onClick={showComment} className="blog-icon"/>
            <Typography.Text  className="poppins" style={{fontSize : "18px", cursor : "pointer", marginLeft : "3px"}}>{comments.length}</Typography.Text>
        </div>
        <div className="favourite" title={starToggle ? "delete from favourite" : "add to favourite"} style={{cursor : "pointer"}} onClick={handleStar}>
            {
                starToggle ? <StarFilled className="blog-icon"/> : <StarOutlined className="blog-icon" />
            }
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;
