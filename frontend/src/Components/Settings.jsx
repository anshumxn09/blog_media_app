import { Button, Col, Row } from 'antd';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadUser, logoutUser } from '../Actions/userAction';

const Settings = () => {
    const dispatch = useDispatch();
    const naviagte = useNavigate();
    const handleSignout = async () => {
        if(window.confirm("Are you sure to logout?")){
            await dispatch(logoutUser());
            naviagte("/");
            dispatch(loadUser());
        }
    }
  return (
    <>
    <Row justify={"center"} align={"middle"} gutter={[17, 10]}>
        <Col>
            <Button>Update Profile</Button>
        </Col>
        <Col>
            <Button>Update Password</Button>
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