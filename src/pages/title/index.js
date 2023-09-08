// import { useGetTitle } from '@/api/titleApi'
// import Loader from '@/components/common/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { setTitleModal, setTitles, setDeleteTitleModal,} from '@/store/title/titleSlice'
import Table from '@/components/Title/TitleTable/index'
import Box from '@mui/material/Box'
import TitleActions from '@/components/Title/TitleActions/index'
import { useEffect, useMemo, useState } from 'react'
// import { useDebounce } from 'ahooks'
// import { FileOperationsEnum } from '@/utils/constants'
// import { checkUserAssignPermissions } from '@/utils/utils'
// import { useRouter } from 'next/router'
import axios from "axios"

const Titles = () => {
  const dispatch = useDispatch()
  const { titles ,titleModal,deleteTitleModal,titleRowSelected} = useSelector(state => state.title)

  useEffect(() => {
  axios.get('http://localhost:5000/titles')
      .then(response => {
        dispatch(setTitles(response.data));
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  }, [dispatch]);

  
  const openTitleModal = () =>{
    dispatch(setTitleModal(true))
  }

  const handleCloseDeleteTitleModal =()=>{
       dispatch(setDeleteTitleModal(false))
  }



  return (
    <Box component='main' className='main-content'>
        <>
          <TitleActions
           dispatch={dispatch}
           openTitleModal={openTitleModal}
           />
          <Table
           row={titles} 
           dispatch={dispatch}
           titleModal={titleModal}
           deleteTitleModal={deleteTitleModal}
           handleCloseDeleteTitleModal={handleCloseDeleteTitleModal}
           titleRowSelected={titleRowSelected}
           openTitleModal={openTitleModal}
            />
        </>
      
    </Box>
  )
}

export default Titles
