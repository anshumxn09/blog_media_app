import { Typography } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';

const UserProfile = ({imageUrl, name, id, search=false, isVertical=false}) => {
  return (
    <Link data-aos="zoom-out" style={{background : "white", width : search && "100%", borderRadius : search && "20px", padding : search & '10px 5px', flexDirection : isVertical ? "column" : "row"}} className="profile-row" to={`/user/${id}`}>
        <img src={imageUrl} alt={`${name} ProfilePic`} className="profileImage" />
        <Typography.Text className='poppins' type='secondary'>{name}</Typography.Text>
    </Link>
  )
}

export default UserProfile;