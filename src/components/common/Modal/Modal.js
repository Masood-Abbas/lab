import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { FolderDeleteSchema } from '@/schema/directorySchema'
import { Box, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { BootstrapDialog, BootstrapDialogTitle } from '@/components/common/DialogTitle/DialogTitle'

const PasswordConfirmationModal = ({ handleClose, open, handleMutate, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      password: null
    },
    resolver: yupResolver(FolderDeleteSchema)
  })

  useEffect(() => {
    return () => {
      setValue('password')
    }
  }, [setValue])

  const onSubmit = item => {
    handleMutate(item?.password)
  }

  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <BootstrapDialogTitle id='customized-dialog-title' onClose={handleClose}>
          Enter your password
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box component='form' noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <div>
                <FormControl sx={{ m: 1, width: 500 }} variant='outlined'>
                  <InputLabel htmlFor='outlined-adornment-password' className={errors.password ? 'Mui-error' : ''}>
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id='outlined-adornment-password'
                    error={!!errors['password']}
                    helperText={errors['password'] ? errors['password'].message : ''}
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Password'
                  />
                  {errors?.password && (
                    <Typography color='error' sx={{ fontSize: '12px' }}>
                      {errors.password?.message}
                    </Typography>
                  )}
                </FormControl>
              </div>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <Button
                disabled={isLoading}
                onClick={handleClose}
                variant='outlined'
                color='error'
                sx={{ py: '0.5rem', px: '1rem', mt: '1rem', mx: '0.5rem' }}
              >
                Cancel
              </Button>

              <LoadingButton
                disabled={isLoading}
                variant='contained'
                type='submit'
                className='btn-primary'
                sx={{ py: '0.55rem', px: '1.5rem', mt: '1rem', color: '#fff' }}
              >
                Confirm
              </LoadingButton>
            </Box>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </div>
  )
}

export default PasswordConfirmationModal
