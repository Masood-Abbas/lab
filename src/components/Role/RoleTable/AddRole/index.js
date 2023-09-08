import { useCallback, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Box, TextField, Typography, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { BootstrapDialog, BootstrapDialogTitle } from '@/components/common/DialogTitle/DialogTitle'
import { useAddRole, useGetRoleById, useUpdateRole } from '@/api/roleApi'
import { useGetPermission } from '@/api/permissionApi'
import { roleSchema } from '@/schema/roleSchema'
import {  getAuthorityType ,checkUserAssignPermissions} from '@/utils/utils'
import { setPermission } from '@/store/permission/permissionSlice'
import { setSubmissionData } from '@/store/role/roleSlice'
import { setAuthPasswordModal } from '@/store/global/globalSlice'
import PasswordConfirmationModal from '@/components/common/Modal/Modal'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { FileOperationsEnum } from '@/utils/constants'

const AddRole = ({ handleClose, open, dispatch, refetch}) => {
  const [checkboxValues, setCheckboxValues] = useState({})
  const [selectedCheckboxIds, setSelectedCheckboxIds] = useState([])
  const [selectedRoleData, setSelectedRoleData] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [disableType,setDisableType]= useState(false) 
  const [locationTypeState, setLocationTypeState] = useState('')
  const [locationTypePermission, setLocationTypePermission] = useState(true)
  const { userPermissions ,authUserLocation} = useSelector(state => state.auth) 
  const { roleRowSelected, submissionData } = useSelector(state => state.role)
  const { permissions } = useSelector(state => state.permission)
  const [assignAuthoritiesPermission,setAssignAuthoritiesPermission]= useState(false) 

  const { authPasswordModal } = useSelector(state => state.global)

  const { mutate: mutateCreateSection, isLoading: createLoading } = useAddRole()

  const { mutate: mutateUpdateRole, isLoading: updateLoading } = useUpdateRole(roleRowSelected?.id)

  useGetRoleById({
    params: roleRowSelected?.id,
    onSuccess: response => {
      setSelectedRoleData(response)
    }
  })

  useGetPermission({
    onSuccess: response => {
      dispatch(setPermission(response))
    }
  })

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: null,
      locationType: '',
    },
    resolver: yupResolver( roleSchema  )
  })
  const name = watch('name')
  const locationType = watch('locationType' )

  useEffect(() => {
    setLocationTypePermission(checkUserAssignPermissions(FileOperationsEnum?.CREATE_GLOBAL_ENTITIES, userPermissions))  
    setAssignAuthoritiesPermission(checkUserAssignPermissions(FileOperationsEnum?.ASSIGN_PERMISSIONS, userPermissions))  
  }, [userPermissions ])
  
  useEffect(() => {
    if (!locationTypePermission) {
      setDisableType(true)
      setValue('locationType','location_bound')
    }
  },[locationTypePermission,setValue])
  
  

  useEffect(() => {
    if (roleRowSelected?.id) {
      const userPermissionsIds = selectedRoleData?.permissions?.map(item => item.id)
      setValue('locationType',roleRowSelected?.type)
      setValue('name', selectedRoleData?.name)
      setDisableType((roleRowSelected?.type === 'global' && locationTypePermission) ||
      (roleRowSelected?.type === 'location_bound' && !locationTypePermission) )
      setLocationTypeState(roleRowSelected?.type)
      setCheckboxValues(prevCheckboxValues => {
        const updatedCheckboxValues = { ...prevCheckboxValues }
        userPermissionsIds?.forEach(id => {
          updatedCheckboxValues[id] = true
        })

        return updatedCheckboxValues
      })
      setSelectedCheckboxIds(userPermissionsIds || [])
      if (permissions?.length === userPermissionsIds?.length) {
        setSelectAll(true)
      }
    }
  }, [
    setValue,
    roleRowSelected?.id,
    roleRowSelected?.name,
    roleRowSelected?.rolePermissions,
    permissions?.length,
    selectedRoleData,
    locationTypePermission,  
    authUserLocation?.id,
     roleRowSelected?.type
  ])

  useEffect(() => {
    if (permissions?.length === selectedCheckboxIds?.length) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
  }, [selectedCheckboxIds?.length, permissions?.length])

  const handleCloseAuthModal = () => {
    dispatch(setAuthPasswordModal(false))
  }

  const handleMutateSuccess = response => {
    refetch()
    handleCloseAuthModal()
    toast.success(response?.data?.message)
    handleClose()
  }

  const handleMutateError = error => {
    toast.error(error?.response?.data?.message)
  }

  const locationTypeHandleOnChange = event => {
    clearErrors('locationType')
    setLocationTypeState(event?.target?.value)
    setValue('locationType', event?.target?.value)
  }



  const onSubmit = item => {
    
    dispatch(
      setSubmissionData({
        ...submissionData,
        name: item?.name,
        permissionIds: selectedCheckboxIds,
        type: item?.locationType,
        locationId: locationTypeState === 'global' ? null :authUserLocation?.id
      })
    )
   
    dispatch(setAuthPasswordModal(true))
   
  }

  const handleFinalSubmit = password => {
    let titleData = {
      ...submissionData,
      password
    }

    const mutateFunction = roleRowSelected?.id ? mutateUpdateRole : mutateCreateSection

    mutateFunction(titleData, {
      onSuccess: handleMutateSuccess,
      onError: handleMutateError
    })
  }

  const handleCheckboxChange = useCallback(
    (event, id) => {
      const isChecked = event.target.checked

      setCheckboxValues({
        ...checkboxValues,
        [id]: isChecked
      })

      if (isChecked) {
        setSelectedCheckboxIds([...selectedCheckboxIds, id])
      } else {
        setSelectedCheckboxIds(selectedCheckboxIds.filter(selectedId => selectedId !== id))
      }
    },
    [checkboxValues, selectedCheckboxIds]
  )

  const handleSelectAll = event => {
    const isChecked = event.target.checked
    const updatedCheckboxValues = { ...checkboxValues }
    const updatedSelectedCheckboxIds = []
    permissions?.forEach(permission => {
      updatedCheckboxValues[permission?.id] = isChecked
      if (isChecked) {
        updatedSelectedCheckboxIds?.push(permission?.id)
      }
    })
    setCheckboxValues(updatedCheckboxValues)
    setSelectedCheckboxIds(updatedSelectedCheckboxIds)
    setSelectAll(isChecked)
  }


  const checkboxes = permissions?.map(permission => (
    <FormControlLabel
      key={permission.id}
      control={
        <Checkbox
          checked={checkboxValues[permission.id] || false}
          onChange={event => handleCheckboxChange(event, permission.id)}
          disabled={!assignAuthoritiesPermission}
        />
      }
      label={getAuthorityType(permission.name)}
    />
  ))

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        fullWidth={true}
        maxWidth='lg'
      >
        <BootstrapDialogTitle id='customized-dialog-title' onClose={handleClose}>
          <Typography sx={{ fontWeight: 600, marginBottom: 1.5 }}>
            {roleRowSelected?.id ? 'Update Role' : 'Create New Role'}
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box>
            <Box component='form' noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12} sm={6} lg={6} >
              <TextField
                label='Name'
                fullWidth 
                focused={name}
                error={!!errors['name']}
                helperText={errors['name'] ? errors['name'].message : ''}
                {...register('name')}
                />
                </Grid>

                <FormControl fullWidth sx={{mt:2}}>
                <InputLabel id='demo-simple-select-label'>Type</InputLabel>
                <Select
                  error={!!errors['locationType']}
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={locationType}
                  defaultValue={locationType}
                  label='Type'
                  onChange={locationTypeHandleOnChange}
                  disabled={disableType}
                >
                  <MenuItem value='global'>Global</MenuItem>
                  <MenuItem value='location_bound'>Location Bound</MenuItem>
                </Select>

              </FormControl>
              {errors?.locationType && (
                <Typography color='error' sx={{ fontSize: '0.75rem', color: '#d32f2f', marginBottom: 1 }}>
                  {errors.locationType?.message}
                </Typography>
              )}

             
                <>
                  <Typography sx={{ fontWeight: 600, marginBottom: 1.5,mt:2 }}>Select Your Desire Permissions</Typography>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectAll}
                        onChange={handleSelectAll}
                        disabled={!assignAuthoritiesPermission}
                       
                      />
                    }
                    label={<span className='select-all-checkbox'>Select All</span>}
                  />
                  <FormGroup row>{checkboxes}</FormGroup>
                </>

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
                  loading={updateLoading || createLoading}
                  className='btn-primary'
                  sx={{ py: '0.55rem', px: '1.5rem', mt: '1rem', color: '#fff' }}
                >
                  {roleRowSelected?.id ? 'Update' : 'Save'}
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </BootstrapDialog>

      {authPasswordModal && (
        <PasswordConfirmationModal
          open={authPasswordModal}
          handleClose={handleCloseAuthModal}
          dispatch={dispatch}
          handleMutate={handleFinalSubmit}
        />
      )}
    </div>
  )
}

export default AddRole
