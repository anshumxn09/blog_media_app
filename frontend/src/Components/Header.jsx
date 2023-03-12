import { HomeFilled } from '@ant-design/icons';
import { HeartFilled, PlusOutlined, SearchOutlined, StarFilled, UserOutlined } from '@ant-design/icons/lib/icons';
import { Col, Row } from 'antd';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Header = () => {

    const [path, setPath] = useState(window.location.pathname);

  return (
    <Row justify={"space-around"} align={"middle"} style={{padding : "15px 0px", borderBottom : "1px solid  #1890ff"}}>
        <Col>
            <Link to={"/"} onClick={() => setPath("/")}>
                <HomeFilled className={`home-icon ${path === "/" && "circleit"}`}/>
            </Link>
        </Col>
        <Col>
            <Link to={"/create/blog"} onClick={() => setPath("/create/blog")}>
                <PlusOutlined className={`home-icon ${path === "/create/blog" && "circleit"}`}/>
            </Link>
        </Col>
        <Col>
            <Link to={"/favourites"} onClick={() => setPath("/favourites")}>
                <StarFilled className={`home-icon ${path === "/favourites" && "circleit"}`}/>
            </Link>
        </Col>
        <Col>
            <Link to={"/search"} onClick={() => setPath("/search")}>
                <SearchOutlined className={`home-icon ${path === "/search" && "circleit"}`}/>
            </Link>
        </Col>
        <Col>
            <Link to={"/profile"} onClick={() => setPath("/profile")}>
                <UserOutlined className={`home-icon ${path === "/profile" && "circleit"}`}/>
            </Link>
        </Col>
    </Row>
  )
}

export default Header;