import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import axios from "axios"
import InstrumentTable from '@/components/Instruments/InstrumentsTable/index'
import InstrumentAction from '@/components/Instruments/InstrumentsAction'
import { setInstrumentModal, setInstruments, setDeleteInstrumentsModal} from '@/store/instruments/instrumentsSlice'
const Instruments = () => {
   const dispatch = useDispatch()
   const { instruments, instrumentModal, deleteInstrumentModal, instrumentRowSelected } = useSelector(state => state.instrument)
   
   useEffect(() => {
      axios.get('http://localhost:5000/instruments')
      .then(response => {
         dispatch(setInstruments(response.data));
       })
       .catch(error => {
         console.error('Error:', error.message);
       });
   },[dispatch])

   const openInstrumentModal = () =>{
      dispatch(setInstrumentModal(true))
    }
  
    const handleCloseDeleteInstrumentModal =()=>{
         dispatch(setDeleteInstrumentsModal(false))
    }
   return (
      <Box component='main' className='main-content'>
        <>
          <InstrumentAction
           dispatch={dispatch}
           openInstrumentModal={openInstrumentModal}
           />
          <InstrumentTable
           row={instruments} 
           dispatch={dispatch}
           titleModal={instrumentModal}
           deleteInstrumentModal={deleteInstrumentModal}
           handleCloseDeleteInstrumentModal={handleCloseDeleteInstrumentModal}
           instrumentRowSelected={instrumentRowSelected}
            />
        </>
      
    </Box>
   )
}

export default Instruments