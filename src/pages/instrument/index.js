import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import axios from "axios"
import InstrumentTable from '@/components/Instrument/InstrumentsTable/index'
import InstrumentAction from '@/components/Instrument/InstrumentsAction'
import { setInstrumentModal, setInstruments, setDeleteInstrumentModal,setInstrumentRowSelected} from '@/store/instruments/instrumentsSlice'
const Instruments = () => {
   const dispatch = useDispatch()
   const { instruments, instrumentModal, deleteInstrumentModal, instrumentRowSelected } = useSelector(state => state.instrument)
   
   useEffect(() => {
      axios.get('http://localhost:5000/instrument')
      .then(response => {
         dispatch(setInstruments(response.data));
       })
       .catch(error => {  
         console.error('Error:', error.message);
       });
   },[dispatch])

   const openInstrumentModal = () =>{
    dispatch(setInstrumentRowSelected({}))
      dispatch(setInstrumentModal(true))
    }
  
    const handleCloseDeleteInstrumentModal =()=>{
         dispatch(setDeleteInstrumentModal(false))
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
           instrumentModal={instrumentModal}
           deleteInstrumentModal={deleteInstrumentModal}
           handleCloseDeleteInstrumentModal={handleCloseDeleteInstrumentModal}
           instrumentRowSelected={instrumentRowSelected}
           openInstrumentModal={openInstrumentModal}
            />
        </>
      
    </Box>
   )
}

export default Instruments