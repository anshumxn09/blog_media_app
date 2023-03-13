import { Avatar, Col, Modal, Row, Typography } from 'antd';
import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import '../styles/Profile.css';
import Settings from './Settings';
import UserProfile from './UserProfile/UserProfile';

const Profile = () => {
  const {user} = useSelector(state => state.userReducer);
  const [isFollowerOpen, setIsFollowerOpen] = useState(false);
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);
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
  return (
    <Row className="h-100" justify={"center"} style={{padding : "20px"}}>
      <Col span={22}>
        <Row justify={"center"} align="middle" dir='column' gutter={[0, 10]} >
          <Col span={24} className="text-center">
              <Avatar size={200} src={user.avatar.url}></Avatar>
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
          <Col span={24}>
            <Settings/>
          </Col>
        </Row>
      </Col>

      <Col>

      </Col>
    </Row>
  )
}

export default Profile;