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
import { useQuery } from "react-query";
import { getTitle } from "@/api/titleApi/index";
import Loader from "@/components/common/Loader/Loader";

const Titles = () => {
  const dispatch = useDispatch()
  const { titles ,titleModal,deleteTitleModal,titleRowSelected} = useSelector(state => state.title)
  const { isLoading } = useQuery({
    queryKey: ["getTitles"],
    queryFn: getTitle,
    onSuccess: (res) => {
      dispatch(setTitles(res));
    },
  });

 
  
  const openTitleModal = () =>{
    dispatch(setTitleModal(true))
  }

  const handleCloseDeleteTitleModal =()=>{
       dispatch(setDeleteTitleModal(false))
  }



  return (
    <Box component='main' className='main-content'>
        <>
        {isLoading && <Loader />}
          <TitleActions
           dispatch={dispatch}
           openTitleModal={openTitleModal}
           />
           {!isLoading && (
          <Table
           row={titles} 
           dispatch={dispatch}
           titleModal={titleModal}
           deleteTitleModal={deleteTitleModal}
           handleCloseDeleteTitleModal={handleCloseDeleteTitleModal}
           titleRowSelected={titleRowSelected}
           openTitleModal={openTitleModal}
            />
            )}
        </>
      
    </Box>
  )
}

export default Titles
