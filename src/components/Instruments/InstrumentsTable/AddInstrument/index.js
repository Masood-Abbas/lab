import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Box, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { toast } from 'react-toastify'
import { BootstrapDialog, BootstrapDialogTitle } from '@/components/common/DialogTitle/DialogTitle'
import { instrumentSchema } from '@/schema/instrumentSchema'
import axios from 'axios'

const AddInstrument = ({ handleClose, open, }) => {

   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm({
      defaultValues: {
         name: null,
         quantity: 0
      },
      resolver: yupResolver(instrumentSchema)
   })


   const onSubmit = item => {
      const instrumentData = {
         name: item?.name,
         quantity: item?.quantity
      }

      axios.post('http://localhost:5000/instrument', instrumentData)
         .then(response => {
            toast.success(response?.data?.message)
            handleClose()
            console.log('Response:', response.data);
         })
         .catch(error => {
            toast.error(error?.response?.data?.message)
            handleClose()
            console.error('Error:', error.message);
         });


   }

   return (
      <div>
         <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
            <BootstrapDialogTitle id='customized-dialog-title' onClose={handleClose}>
               <Typography sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                  Add Instrument
               </Typography>
            </BootstrapDialogTitle>
            <DialogContent dividers>
               <Box sx={{ minWidth: 500 }}>
                  <Box component='form' noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                     <TextField
                        sx={{ mb: 2 }}
                        label='Name'
                        fullWidth
                        error={!!errors['name']}
                        helperText={errors['name'] ? errors['name'].message : ''}
                        {...register('name')}
                     />
                     <TextField
                        sx={{ mb: 2 }}
                        label='Quantity'
                        fullWidth
                        error={!!errors['quantity']}
                        helperText={errors['quantity'] ? errors['quantity'].message : ''}
                        {...register('quantity')}
                     />
                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                        <Button
                           onClick={handleClose}
                           variant='outlined'
                           color='error'
                           sx={{ py: '0.5rem', px: '1rem', mt: '1rem', mx: '0.5rem' }}
                        >
                           Cancel
                        </Button>
                        <LoadingButton
                           variant='contained'
                           type='submit'
                           className='btn-primary'
                           sx={{ py: '0.55rem', px: '1.5rem', mt: '1rem', color: '#fff' }}
                        >
                           Save
                        </LoadingButton>
                     </Box>
                  </Box>
               </Box>
            </DialogContent>
         </BootstrapDialog>


      </div>
   )
}

export default AddInstrument
