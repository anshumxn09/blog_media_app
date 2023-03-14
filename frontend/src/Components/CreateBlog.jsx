import React, { useEffect } from 'react'
import {Row, Col, Card, Form , Input, Button, Typography} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../Actions/blogActions';
import { loadUser } from '../Actions/userAction';
import { toast } from 'react-toastify';

const CreateBlog = () => {
  const dispatch = useDispatch();
  const {loading, message} = useSelector(state => state.likeReducer);
  const navigator = useNavigate();
  const handleCreate = async (values) => {
    const {title , description} = values;
    await dispatch(createBlog(title, description));
    dispatch(loadUser());
    navigator("/profile");
  } 

  useEffect(() => {
    if(message){
      toast.info(message);
      dispatch({type : "CLEAR_MESSAGE"});
    }
  }, [dispatch, message, toast])

  return (
    <Row className='h-100 gradient-blue' justify={"center"} align={"middle"}>
        <Col lg={{span : 8}} md={{span : 10}} sm={{span : 12}} xs={{span : 20}}>
            <Card style={{border : "2px solid #1890ff"}} >
                <Form layout='vertical' onFinish={handleCreate}>
                    <Form.Item label="Title: " name="title" rules={[{
                        required : true,
                        message : "Kindly set your title"
                    }]}>
                        <Input placeholder='enter your title'></Input>
                    </Form.Item>

                    <Form.Item label="Description: " name="description" rules={[{
                        required : true,
                        message : "Kindly enter your description"
                    }]}>
                       <Input.TextArea style={{resize : "none", height : "200px"}}></Input.TextArea>
                    </Form.Item>

                    <Button block type='primary' disabled={loading} className='mt-10' htmlType='submit'>CREATE</Button>
                </Form>
            </Card>
        </Col>
    </Row>
  )
}

export default CreateBlog;