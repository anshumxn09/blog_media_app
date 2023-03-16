import React from 'react'
import { InfinitySpin } from 'react-loader-spinner';
const Loader = () => {
  return (
    <div style={{display : "flex" , justifyContent : "center", alignItems : "center", width : "100vw"}}>
        <InfinitySpin 
            width='300'
            color="#1890ff"
        />
    </div>
  )
}

export default Loader;