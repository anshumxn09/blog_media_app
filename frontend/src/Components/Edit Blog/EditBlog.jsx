import React, { useEffect } from 'react'
import { Button, Card, Col, Form, Input, Row } from 'antd';
import { editBlog, getASingleBlog, getMyBlogs } from '../../Actions/blogActions';
import { loadUser } from '../../Actions/userAction';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const EditBlog = ({}) => {
    const {id} = useParams();
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const {blog} = useSelector(state => state.singleBlog);

    const handleEditBlog = async (values) => {
        console.log(values);
        let {title , description} = values;
        title = title ? title : blog.title;
        description = description ? description : blog.description;
        await dispatch(editBlog(id, title, description));
        await dispatch(loadUser());
        await dispatch(getMyBlogs());
        dispatch({type : 'CLEAR_BLOG'});
        navigator("/profile");
    }
    useEffect(() => {
        dispatch(getASingleBlog(id));
    }, [dispatch])
  return blog && blog._id === id && (
    <Row className='h-100 gradient-blue' justify={"center"} align={"middle"}>
        <Col lg={{span : 8}} md={{span : 10}} sm={{span : 12}} xs={{span : 20}}>
            <Card style={{border : "2px solid #1890ff"}} >
                <Form layout='vertical' onFinish={handleEditBlog}>
                    <Form.Item label="Title: " name="title">
                        <Input defaultValue={blog.title} placeholder='enter your title'></Input>
                    </Form.Item>

                    <Form.Item label="Description: " name="description" >
                       <Input.TextArea defaultValue={blog.description} style={{resize : "none", height : "200px"}}></Input.TextArea>
                    </Form.Item>
                    <Button block type='primary' className='mt-10' htmlType='submit'>EDIT</Button>
                </Form>
            </Card>
        </Col>
    </Row>
  )
}

export default EditBlog;