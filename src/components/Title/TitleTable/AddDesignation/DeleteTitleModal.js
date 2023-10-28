import { useEffect ,useState } from 'react'
import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Box, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useQueryClient } from 'react-query'
import { BootstrapDialog, BootstrapDialogTitle } from '@/components/common/DialogTitle/DialogTitle'
import { titleSchema } from '@/schema/titleSchema'
import { useCreateDesignation, useUpdateTitle } from '@/api/titleApi'
import { setTitleRowSelected, setSubmissionData } from '@/store/title/titleSlice'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { FileOperationsEnum } from '@/utils/constants'
import { checkUserAssignPermissions } from '@/utils/utils'
import axios from 'axios'
import { deleteTitle } from "@/api/titleApi/index";
import { useMutation } from "react-query";


const DeleteTitleDesignation = ({ handleClose, open,titleRowSelected ,dispatch }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data) => deleteTitle(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries("getTitles");
      handleClose();
      toast.success(res.message);
    },
  });

   
      
const handleDeleteTitle =()=>{
  mutate(titleRowSelected?.id)
}


  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <BootstrapDialogTitle id='customized-dialog-title' onClose={handleClose}>
          <Typography sx={{ fontWeight: 600, marginBottom: 1.5 }}>
             Delete Title Confirmation
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box sx={{ minWidth: 500 }}>
            
             <Typography>Are you sure to delete this title?</Typography>
             <Typography></Typography>



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
                  onClick={handleDeleteTitle}
                >
                   Save
                </LoadingButton>
              </Box>
            
          </Box>
        </DialogContent>
      </BootstrapDialog>

   
    </div>
  )
}

export default DeleteTitleDesignation
