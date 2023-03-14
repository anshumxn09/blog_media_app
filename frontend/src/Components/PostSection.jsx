import { Row, Typography } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogCard from './BlogCard/BlogCard';

const PostSection = () => {
    const {blogs} = useSelector(state => state.myBlogs);

  return (
    <div className="flex-col" style={{paddingTop : "20px", marginBottom : "10px"}}>
        {
            blogs && blogs.length > 0 ? (
                blogs.map((elem) => {
                    return  <BlogCard key={elem._id} owner={elem.owner} blogId={elem._id} title={elem.title} description={elem.description} likes={elem.likes} comments={elem.comments} myProfile={true} />
                })
            ) : <Typography.Title className='poppins uppercase text-center' level={3} >No Blogs Uploaded</Typography.Title>
        }
    </div>
  )
}

export default PostSection;