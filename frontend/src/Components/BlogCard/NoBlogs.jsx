import { Col, Empty, Row } from 'antd';
import React from 'react'

const NoBlogs = () => {
  return (
    <Row data-aos="zoom-out" style={{height : "100%", width : "100%"}} justify={"center"} align={"middle"}>
        <Col span={22} style={{background : "whitesmoke", height : "70%", borderRadius : "30px"}}>
        <Row justify={"center"} align={"middle"} style={{height : "100%"}}>
            <Col>
            <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} description="No Blogs Available" />
            </Col>
        </Row>
        </Col>
    </Row>
  )
}

export default NoBlogs;