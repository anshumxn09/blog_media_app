import { Row, Col, Typography, Avatar, Modal, Button} from 'antd';
import React, { useEffect , useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { followUnfollow, loadSearchUser } from '../../Actions/userAction';
import BlogCard from '../BlogCard/BlogCard';
import PostSection from '../PostSection';
import UserProfile from './UserProfile';

const SearchProfile = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {user, blogs} = useSelector(state => state.getSearchUser);
    const {user : actualUser} = useSelector(state => state.userReducer); 
    const [isFollowerOpen, setIsFollowerOpen] = useState(false);
    const [isFollowingOpen, setIsFollowingOpen] = useState(false);
    const [followToggle, setFollowToggle] = useState("Follow");
    const {message} = useSelector(state => state.likeReducer);

    const showModal = () => {
        setIsFollowerOpen(true);
    };
    const handleCancel = () => {
        setIsFollowerOpen(false);
    };
    const showModalFollowing = () => {
        setIsFollowingOpen(true);
    };
    const handleCancelFollowing = () => {
        setIsFollowingOpen(false);
    };

    const handleFollowToggle = async () => {
        setFollowToggle(followToggle === "Follow" ? "Unfollow" : "Follow")
        await dispatch(followUnfollow(id));
        dispatch(loadSearchUser(id));
    }

    useEffect(() => {
        dispatch(loadSearchUser(id));
        if(actualUser){
            actualUser.followings.map((elem) => {
                if(elem._id === id){
                    setFollowToggle("Unfollow");
                }
            })
        }
    }, [dispatch, id]);

    useEffect(() => {
        if(message){
            toast.info(message);
            dispatch({type : "CLEAR_MESSAGE"});
        }
    }, [dispatch, message, toast])

  return user && (
    <Row className="h-100" justify={"center"} style={{padding : "20px"}}>
        <Col span={22}>
        <Row justify={"center"} align="middle" dir='column' gutter={[0, 10]} >
          <Col span={24} className="text-center">
              <Avatar style={{border : "2px solid #1890ff"}}  size={200} src={user.avatar.url}></Avatar>
          </Col>
          <Col>
            <Typography.Title className='poppins text-center' level={3}>{user.name}</Typography.Title>
            <Typography.Paragraph type='secondary' style={{marginBottom : "2px"}} className='poppins text-center'>{user.email}</Typography.Paragraph>
          </Col>
          <Col span={24} className="blue-border col-pad" style={{borderRadius : "20px", background : "#1890ff"}}>
            <Row justify={"space-around"} align="middle" gutter={[17, 10]} >
                <Col className='text-center'>
                  <Typography.Text style={{color : "white"}} className='poppins font18'>{user.blogs.length} Blogs</Typography.Text>
                </Col>
                <Col style={{marginLeft : "30px", cursor : "pointer"}}>
                  <Typography.Text onClick={showModal} className='poppins font18' style={{color : "white"}}  >{user.followers.length} Followers</Typography.Text>
                  <Modal title="FOLLOWERS" okButtonProps={{style : {display : "none"}}} cancelButtonProps={{style : {display : "none"}}} open={isFollowerOpen} onCancel={handleCancel}>
                      {
                        user  && user.followers.length > 0 ? user.followers.map((elem) => {
                          return <UserProfile key={elem._id} imageUrl={elem.avatar.url} name={elem.name} />
                        }) : <Typography.Title className='text-center uppercase poppins' level={3}>No Followers Yet</Typography.Title>
                      }
                </Modal>
                </Col>
                <Col style={{cursor : "pointer"}}>
                  <Typography.Text onClick={showModalFollowing} style={{color : "white"}}  className='poppins font18'>{user.followings.length} Followings</Typography.Text>
                  <Modal title="FOLLOWINGS" okButtonProps={{style : {display : "none"}}} cancelButtonProps={{style : {display : "none"}}} open={isFollowingOpen} onCancel={handleCancelFollowing}>
                      {
                        user  && user.followings.length > 0 ? user.followings.map((elem) => {
                          return <UserProfile key={elem._id} imageUrl={elem.avatar.url} name={elem.name} />
                        }) : <Typography.Title className='text-center uppercase poppins' level={3}>No Followings Yet</Typography.Title>
                      }
                </Modal>
                </Col>
            </Row>
          </Col>
          {
            actualUser._id !== id && (<Col>
            <Button type='primary' onClick={handleFollowToggle}>{followToggle}</Button>
          </Col>)
          }
        </Row>
      </Col>
      <Col span={23} style={{background : "whitesmoke", borderRadius : "20px", margin : "15px 0px"}}>
      <div className="flex-col" style={{paddingTop : "20px"}}>
        {
            blogs && blogs.length > 0 ? (
                blogs.map((elem) => {
                    return  <BlogCard key={elem._id} owner={elem.owner} blogId={elem._id} title={elem.title} description={elem.description} likes={elem.likes} comments={elem.comments} searchUser={id} />
                })
            ) : <Typography.Title className='poppins uppercase text-center' level={3} >No Blogs Uploaded</Typography.Title>
        }
    </div>
      </Col>
    </Row>
  )
}

export default SearchProfile;