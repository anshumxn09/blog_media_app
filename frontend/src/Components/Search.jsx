import { Col, Row , Input} from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser } from '../Actions/userAction'
import UserProfile from './UserProfile/UserProfile'

const Search = () => {
  const [value, setValue] = useState("");
  const {user} = useSelector(state => state.userReducer);
  const {users} = useSelector(state => state.allUserReducer);
  const dispatch = useDispatch();

  const getResult = (value) => {
    dispatch(getAllUser(value));
  }

  const handleInput = (e) => {
    setValue(e.target.value);
    if(value.length === 1) dispatch(getAllUser());
  }

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  return (
    <Row className='h-100 gradient-blue' justify={"center"} style={{paddingTop : "20px"}}>
      <Col lg={{span : 16}} md={{span : 10}} sm={{span : 12}} xs={{span : 20}} >
        <div className="search-block flex-col" style={{background : "white", borderRadius : "20px", padding : "30px"}}>
        <Input.Search onSearch={getResult} placeholder="enter your search here..." size="large" allowClear onChange={handleInput}></Input.Search>

        <div style={{marginTop : "20px", display : "flex", justifyContent : "center", alignItems : "center", flexDirection : "column", width : "100%", borderRadius : "20px"}}>
        {
            users && users.map((elem) => {  
              return elem._id !== user._id && 
              <UserProfile search={true} id={elem._id} key={elem._id} imageUrl={elem.avatar.url} name={elem.name}/>
            })
          }
        </div>
        </div>
      </Col>
    </Row>
  )
}

export default Search