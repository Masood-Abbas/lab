import {Button, TextField} from '@mui/material'
import Grid from '@mui/material/Grid'
import {setSearchInstrument} from '@/store/instruments/instrumentsSlice'
const InstrumentsAction = ({ dispatch, openInstrumentModal }) => {

   const resetSearch = () => {
      dispatch(setSearchInstrument({name:''})) 
   }


   return(
      <Grid container spacing={2}>
         <Grid item xs={12} md={4} lg={3}>
            <TextField
               sx={{ mb: 1 }}
               id='name'
               fullWidth={true}
               name='name'
               size='small'
               label='Search Equipments' />
         </Grid>
         <Grid item xs={2} md={4} lg={1}>
            <Button onClick={resetSearch} variant='contained' sx={{color: '#fff', fontWeight: 600, py:1, mb:1 }}>Clear</Button>
         </Grid>

         <Grid item xs={10} md={4} lg={8} sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <div className='inst_button'>
               <Button
                  onClick={openInstrumentModal}
                  variant='contained'
                  sx={{ color: '#fff', fontWeight: 600, py: 1, mb: 1 }}
               >
                  Add Equipments
               </Button>
            </div>
         </Grid>
      </Grid>
   )
}

export default InstrumentsAction