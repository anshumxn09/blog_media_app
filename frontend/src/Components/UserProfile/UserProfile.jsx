import { Typography } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';

const UserProfile = ({imageUrl, name}) => {
  return (
    <Link className="profile-row">
        <img src={imageUrl} alt={`${name} ProfilePic`} className="profileImage" />
        <Typography.Text className='poppins' type='secondary'>{name}</Typography.Text>
    </Link>
  )
}

export default UserProfile;