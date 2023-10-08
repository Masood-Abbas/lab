import { useEffect } from "react"
import { Box } from "mdi-material-ui"
import { useDispatch, useSelector } from 'react-redux'
import { setFilterUser, setUsers } from '@/store/user/userSlice'
import Table from '@/components/Users/UserTable/index'
import axios from "axios"

const Users = () => {
  const dispatch =useDispatch()
  const { users } = useSelector(state => state.user)
 

  useEffect(() => {

  axios.get('http://localhost:5000/user')
      .then(response => {
        dispatch(setUsers(response.data));
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  }, [dispatch]);



  return (
    <div component='main' className='main-content' style={{fontSize:30,paddingTop:'30px'}}>
      <Table row={users}  />
    </div>

 
   
   
  )
}

export default Users
