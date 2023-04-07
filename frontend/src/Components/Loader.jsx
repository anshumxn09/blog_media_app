import { Spin } from 'antd';
import React from 'react'
const Loader = () => {
  return (
    <div style={{display : "flex" , justifyContent : "center", alignItems : "center", width : "100%", height : "90vh", background : "white"}}>
        <Spin tip="Loading..." size="large">
      </Spin>
    </div>
  )
}

export default Loader;