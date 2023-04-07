import React, { useEffect } from 'react'
import {Row, Col, Card, Form, Input, Typography, Button} from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import { login } from '../Actions/userAction';

const Login = () => {
    const dispatch = useDispatch();
    const {message : loginMessage, loading : loginLoading} = useSelector(state => state.userReducer);

    const loginHandler = (values) => {
        const {email, password} = values;
        dispatch(login(email, password));
    }

    useEffect(() => {
        if(loginMessage){
            toast.info(loginMessage, {
                className : "toast-message"
            });
        } 
        dispatch({type : "CLEAR_MESSAGE"});
    } , [dispatch, loginMessage])
  return (
    <Row className='h-100 curvyWall' justify={"center"} align={"middle"}>
    <div className="footer" style={{
        position : "absolute",
        bottom : "5px",
        textTransform : "uppercase",
        letterSpacing : "2px"
    }}>
        <Typography.Text type='secondary' className='text-center'>&copy; Anshuman Sharma 2023</Typography.Text>
    </div>
    <Col lg={{span : 8}} md={{span : 10}} sm={{span : 12}} xs={{span : 20}}>
        <Card data-aos="zoom-in"  style={{border : "2px solid #1890ff"}}>
            <Form layout='vertical' onFinish={loginHandler}>
                <div className='text-center'>
                <img src="https://i.pinimg.com/originals/c6/65/dd/c665dd90922ac404225ac0764878e50d.png" alt="LOGO" width={90} height={90}/>
                </div>
                <Form.Item label="Email" name="email" rules={[
                    {required : true,
                    message : "Kindly enter your email"}
                ]}>
                    <Input placeholder='enter your email'></Input>
                </Form.Item>

                <Form.Item label="Password" name="password" rules={[
                    {required : true,
                    message : "Kindly enter your password"}
                ]}>
                    <Input.Password placeholder='enter your password'></Input.Password>
                </Form.Item>

                <Button style={{marginTop : "10px"}} block disabled={loginLoading} htmlType='submit' type='primary'>LOGIN</Button>

                <Typography.Paragraph style={{marginTop : "15px"}} className='text-center'>
                    <Typography.Text>Don't have an account? </Typography.Text>
                    <Link to="/register">Register</Link>
                </Typography.Paragraph>
            </Form>
        </Card>
    </Col>
</Row>
  )
}

export default Login