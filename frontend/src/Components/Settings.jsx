import { Button, Col, Form, Modal, Row, Avatar, Card, Input} from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadUser, logoutUser, updateUser, updateMyPassword} from '../Actions/userAction';
import {toast} from 'react-toastify';

const Settings = () => {
    const dispatch = useDispatch();
    const naviagte = useNavigate();
    const {user} = useSelector(state => state.userReducer);
    const {loading : updateLoading, message : updateMessage} = useSelector(state => state.likeReducer);
    const [image, setImage] = useState("");
    const [updateProfile, setUpdateProfile] = useState(false);
    const [updatePassword, setUpdatePassword] = useState(false);

    const showUpdateModal = () => setUpdateProfile(true);
    const handleCancelUpdate = () => setUpdateProfile(false);

    const showPasswordModal = () => setUpdatePassword(true);
    const handleCancelPassword = () => setUpdatePassword(false);

    const handleSignout = async () => {
        if(window.confirm("Are you sure to logout?")){
            await dispatch(logoutUser());
            naviagte("/");
            dispatch(loadUser());
        }
    }
    const handleAvatar = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                setImage(reader.result);
            }
        }
        reader.readAsDataURL(file);
    }

    const handleRegister = async (values) => {
        const {name} = values;
        await dispatch(updateUser(name ? name : user.name, image));
        dispatch(loadUser());
        setUpdateProfile(false);
    }

    const handlePasswordUpdate = async (values) => {
        const {oldpass, newpass} = values;
        await dispatch(updateMyPassword(oldpass, newpass));
        dispatch(loadUser());
    }

    useEffect(() => {
        if(updateMessage){
            toast.info(updateMessage);
            dispatch({type : "CLEAR_MESSAGE"});
        }
    }, [dispatch, updateMessage, toast])
  return (
    <>
    <Row justify={"center"} align={"middle"} gutter={[17, 10]}>
        <Col>
            <Button onClick={showUpdateModal} >Update Profile</Button>
            <Modal open={updateProfile} okButtonProps={{style : {display : "none"}}} cancelButtonProps={{style : {display : "none"}}} onCancel={handleCancelUpdate}>
            <Row justify={"center"}>
        <Col span={22}>
            <Card  style={{border : "2px solid #1890ff"}} >
            <Form layout='vertical' onFinish={handleRegister}>
                <div className="flexCenter">
                <Avatar src={image ? image : user.avatar.url} style={{width : "80px", height : "80px"}}/>
                </div>

                <Form.Item label="Name: " name="name">
                <Input defaultValue={user.name} placeholder='enter your name'></Input>
                </Form.Item>

                <Form.Item label="Email: " name="email">
                <Input disabled defaultValue={user.email} placeholder='enter your email'></Input>
                </Form.Item>

                <div className="flexCenter">
                    <input type="file" accept="image/*" onChange={handleAvatar}></input>
                </div>

                <Button disabled={updateLoading} htmlType='submit' type='primary' block>Update Profile</Button>
            </Form>
            </Card>
        </Col>
    </Row>
            </Modal>
        </Col>
        <Col>
        <Modal
        onCancel={handleCancelPassword}
        title="Update Password"
        open={updatePassword}
        okButtonProps={{
          style: {
            display: "none",
          },
        }}
        cancelButtonProps={{
          style: {
            display: "none",
          },
        }}
      >
        <Form layout="vertical" onFinish={handlePasswordUpdate}>
          <Form.Item
            label="Old Password: "
            name="oldpass"
            rules={[
              {
                required: true,
                message: "Kindly enter your old password",
              },
            ]}
          >
            <Input.Password placeholder="enter your old password"></Input.Password>
          </Form.Item>
          <Form.Item
            label="New Password: "
            name="newpass"
            rules={[
              {
                required: true,
                message: "Kindly enter your new password",
              },
            ]}
          >
            <Input.Password placeholder="enter your new password"></Input.Password>
          </Form.Item>
          <Button
            type="primary"
            disabled={updateLoading}
            className="mt-10"
            block
            htmlType="submit"
          >
            UPDATE PASSWORD
          </Button>
        </Form>
      </Modal>
            <Button onClick={showPasswordModal} >Update Password</Button>
        </Col>
    </Row>
    <Row justify={"center"} align={"middle"}>
        <Col lg={{span : 6}} xs={{span : 10}}>
            <Button onClick={handleSignout} style={{marginTop : "10px"}} type="primary" block danger>Signout</Button>
        </Col>
    </Row>
    </>
  )
}

export default Settings;