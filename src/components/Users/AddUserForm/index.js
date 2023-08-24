import Box from '@mui/material/Box'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { LoadingButton } from '@mui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import Grid from '@mui/material/Grid'
import SectionSelector from '@/components/Users/AddUserForm/SectionSelector'
import TitlesSelector from '@/components/Users/AddUserForm/Titles'
import RoleSelector from '@/components/Users/AddUserForm/RoleSelector'
import PermissionSelector from 'components/Users/AddUserForm/PermissionSelector'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { addUserSchema, updateNonActiveUserSchema, updateUserSchema } from '@/schema/userSchema'
import { useAddUser, useUpdateUser } from '@/api/userApi'
import { useRouter } from 'next/router'
import PasswordConfirmation from '@/components/common/PasswordConfirmation'
import { setAuthCheckModal } from '@/store/global/globalSlice'
import { setUpdateUserData } from '@/store/user/userSlice'
import { useGetLocation } from '@/api/locationApi'
import { s3BaseURL } from '@/utils/utils'
import UserSignAndStampModal from '@/components/Users/AddUserForm/UploadSignImage'
import { setLocations } from '@/store/location/locationSlice'
import Divider from '@mui/material/Divider'
import AWS from 'aws-sdk'
import { useResendEmail } from '@/api/userApi'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { FileOperationsEnum } from '@/utils/constants'
import { checkUserAssignPermissions } from '@/utils/utils'
import { deleteCookie } from '@/utils/utils'
import { useGetTitle } from '@/api/titleApi'
import { useGetRoles } from '@/api/roleApi'
import { useGetSections } from '@/api/sectionApi'
import LocationSelector from '@/components/Users/AddUserForm/LocationSelector'

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
})

const s3Bucket = new AWS.S3({
  params: { Bucket: process.env.NEXT_PUBLIC_S3_BUCKET },
  region: process.env.NEXT_PUBLIC_AWS_REGION
})

const AddUserForm = ({ userById }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [openInitialModal, setOpenInitialModal] = useState(false)
  const [fileExtension, setFileExtension] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [imageKey, setImageKey] = useState(null)
  const [editor, setEditor] = useState(null)
  const [isAllUnit, setIsAllUnit] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [checkSignStamp, setCheckSignStamp] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [assignAuthorityPermission, setAssignAuthorityPermission] = useState(false)
  const [createCrossLocation, setCreateCrossLocation] = useState(true)
  const [editCrossLocation, setEditCrossLocation] = useState(true)
  const [selectedTitles, setSelectedTitles] = useState([])
  const [userRole, setUserRoles] = useState([])
  const [userSection, setUserSections] = useState([])
  const [selectLocationId, setSelectLocationId] = useState('')
  const signatureRef = useRef(null)
  const [signInitialType, setSignInitialType] = useState('picture')
  const [alignment, setAlignment] = useState('picture')
  const focusedInputRef = useRef(null)
  const [disableSaveImage, setDisableSaveImage] = useState(true)
  const [disableSignature, setDisableSignature] = useState(true)
  const { deletedAssignSection, deletedAssignRoles, updateUserData } = useSelector(state => state.user)
  const { authCheckModal } = useSelector(state => state.global)
  const { authUserLocation, employeeId, userPermissions } = useSelector(state => state.auth)
  const { locations } = useSelector(state => state.location)

  const { mutate: mutateRegister, isLoading: registerLoading } = useAddUser()
  const { mutate: resendEmail } = useResendEmail()
  const { mutate: mutateUpdateUer, isLoading: updateLoading } = useUpdateUser(userById?.id)

  const {
    clearErrors,
    reset,
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstName: null,
      lastName: null,
      employeeNo: null,
      email: null,
      password: null,
      confirmPassword: null,
      sections: [],
      roles: [],
      status: '',
      category: '',
      userTitleIds: [],
      permissions: [],
      employeeType: '',
      initial: '',
      sign: '',
      stamp: '',
      userLocation: ''
    },
    resolver: yupResolver(
      userById?.id && userById?.status === 'inactive'
        ? updateNonActiveUserSchema
        : userById?.id && userById?.isSetPassword
        ? updateUserSchema
        : addUserSchema
    )
  })

  const firstName = watch('firstName')
  const lastName = watch('lastName')
  const employeeNo = watch('employeeNo')
  const email = watch('email')
  const sections = watch('sections')
  const roles = watch('roles')
  const userTitleIds = watch('userTitleIds')
  const category = watch('category')
  const permissions = watch('permissions')
  const status = watch('status')
  const employeeType = watch('employeeType')
  const initial = watch('initial')
  const sign = watch('sign')
  const stamp = watch('stamp')
  const userLocation = watch('userLocation')

  useEffect(() => {
    if (userById) {
      let recordExistingIds = userById?.userSections?.map(item => item?.section?.id)
      let rolesExistingIds = userById?.userRolePermissions?.map(item => item?.roleId)
      let permissionsExistingIds = userById?.userRolePermissions?.map(item => item?.permissionId)
      let titleExistingIds = userById?.userDesignations?.map(item => item?.designationId)
      rolesExistingIds = rolesExistingIds?.filter(id => id !== null)
      let userLocationId = locations?.find(location => location?.id === userById?.location?.id)
      permissionsExistingIds = permissionsExistingIds?.filter(id => id !== null)
      setSelectLocationId(userLocationId?.id)
      setValue('roles', rolesExistingIds)
      setValue('permissions', permissionsExistingIds)
      setValue('sections', recordExistingIds)
      setValue('firstName', userById?.firstName)
      setValue('lastName', userById?.lastName)
      setValue('employeeNo', userById?.employeeNo)
      setValue('email', userById?.email)
      setValue('userTitleIds', titleExistingIds)
      setValue('category', userById?.category)
      setValue('status', userById?.status)
      setValue('employeeType', userById?.employeeType)
      setValue('initial', userById?.initials)
      setValue('sign', userById?.sign)
      setValue('stamp', userById?.stamp)
      setIsAllUnit(userById?.isAssignAllSections)
      setValue('userLocation', userLocationId?.id)
    }
  }, [userById, setValue, reset, dispatch, locations])

  useEffect(() => {
    setAssignAuthorityPermission(checkUserAssignPermissions(FileOperationsEnum?.ASSIGN_PERMISSIONS, userPermissions))
    setCreateCrossLocation(checkUserAssignPermissions(FileOperationsEnum?.CREATE_CROSS_LOCATION_USER, userPermissions))
    setEditCrossLocation(checkUserAssignPermissions(FileOperationsEnum?.EDIT_CROSS_LOCATION_USER, userPermissions))
    if (!createCrossLocation) {
      setValue('userLocation', authUserLocation?.id)
      setSelectLocationId(authUserLocation?.id)
    }
  }, [userPermissions, createCrossLocation, setValue, authUserLocation?.id])

  useGetLocation({
    params: {take:0},  
    onSuccess: response => {
      dispatch(setLocations(response?.records))
    }
  })

  useGetRoles({
    params: selectLocationId === '' ? '' : { locationId: selectLocationId,take:0 },
    onSuccess: response => {
      setUserRoles(response?.records)
    }
  })

  useGetTitle({
    params: selectLocationId === '' ? '' : { locationId: selectLocationId ,take:0},
    onSuccess: response => {
      setSelectedTitles(response?.records)
    }
  })

  useGetSections({
    params: selectLocationId === '' ? '' : { locationId: selectLocationId },
    onSuccess: response => {
      const sections = []
      const userSectionObject = { id: 'all', name: 'All', abbreviation: 'all', disabled: false }
      sections.push(userSectionObject)
      for (const item of response) {
        sections.push({ ...item, disabled: false })
      }
      setUserSections([...sections])
    }
  })

  const handleLogout = () => {
    router.push('/login')
    deleteCookie('access_token')
    deleteCookie('refresh_token')
  }

  const handleMutateSuccess = response => {
    toast.success(response?.data?.message)

    if (userById && employeeId === employeeNo && status === 'inactive') {
      handleLogout()
      handleCloseAuthModal()
    } else {
      router.push('/users')
      handleCloseAuthModal()
    }
  }

  const handleMutateError = error => {
    toast.error(error?.response?.data?.message)
  }

  const handleClear = () => {
    reset()
  }

  const categoryHandleOnChange = event => {
    clearErrors('category')
    setValue('category', event?.target?.value)
  }

  const personnelHandleOnChange = event => {
    clearErrors('employeeType')
    setValue('employeeType', event?.target?.value)
  }

  const statusHandleOnChange = event => {
    setValue('status', event?.target?.value)
  }

  const handleOpenAuthModal = () => {
    dispatch(setAuthCheckModal(true))
  }

  const handleCloseAuthModal = () => {
    dispatch(setAuthCheckModal(false))
  }

  function dataURLtoBlob(dataURL) {
    let arr = dataURL.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }

    return new Blob([u8arr], { type: mime })
  }

  const uploadFileAws = file => {
    const params = {
      ACL: 'public-read',
      Body: dataURLtoBlob(file),
      ContentEncoding: 'base64',
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
      ContentType: 'image/png',
      Key: `${
        checkSignStamp === 'sign' ? 'Sign' : checkSignStamp === 'initial' ? 'Initial' : 'Stamp'
      }/${new Date().getTime()}-${
        checkSignStamp === 'sign' ? 'sign.png' : checkSignStamp === 'initial' ? 'initial.png' : 'stamp.png'
      }-${employeeNo}`
    }
    const request = s3Bucket?.upload(params)
    request.send(function (err, data) {
      if (err) {
        console.error('Upload failed', err)
      } else {
        if (checkSignStamp === 'sign') {
          clearErrors('sign')
          setValue('sign', data?.key)
        } else if (checkSignStamp === 'initial') {
          clearErrors('initial')
          setValue('initial', data?.key)
        } else {
          clearErrors('stamp')
          setValue('stamp', data?.key)
        }
      }
    })
  }

  const handleSaveSignAndInitial = param => {
    if (signatureRef?.current !== null) {
      const dataUrl = signatureRef.current.toDataURL('image/png')
      if (param === 'sign') {
        uploadFileAws(dataUrl)
        setValue('sign', dataUrl)
        clearErrors('sign')
      }
      if (param === 'initial') {
        uploadFileAws(dataUrl)
        setValue('initial', dataUrl)
        clearErrors('initial')
      }
      setDisableSignature(true)
      setSignInitialType('picture')
      setOpen(false)
      setSelectedFile(null)
    }
  }

  const handleClearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear()
      setDisableSignature(true)
    }
  }

  const handleSaveClick = param => {
    if (editor !== null) {
      setDisableSaveImage(false)
      const canvas = editor.getImageScaledToCanvas().toDataURL()
      setCroppedImage(canvas)
      if (param === 'sign') {
        uploadFileAws(canvas)
        setValue('sign', canvas)
        clearErrors('sign')
      }
      if (param === 'stamp') {
        uploadFileAws(canvas)
        setValue('stamp', canvas)
        clearErrors('stamp')
      }
      if (param === 'initial') {
        uploadFileAws(canvas)
        setValue('initial', canvas)
        clearErrors('initial')
      }
      setDisableSignature(true)
      setSignInitialType('picture')
      setOpen(false)
      setSelectedFile(null)
    }
  }

  const onSubmit = item => {
    const userData = {
      firstName: item?.firstName,
      lastName: item?.lastName,
      email: item?.email,
      employeeNo: Number(item?.employeeNo),
      sections: item?.sections,
      roles: item?.roles,
      category: item?.category,
      titleIds: item?.userTitleIds,
      permissions: item?.permissions,
      sign: sign,
      stamp: stamp,
      initials: initial,
      employeeType: item?.employeeType,
      isAssignAllSections: isAllUnit,
      locationId: Number(item?.userLocation)
    }

    if (userById?.id) {
      handleOpenAuthModal()
      dispatch(
        setUpdateUserData({
          ...updateUserData,
          firstName: item?.firstName,
          lastName: item?.lastName,
          email: item?.email,
          newSectionIds: item?.sections,
          deletedUserSectionIds: deletedAssignSection,
          newRoleIds: item?.roles,
          password: item?.password,
          deletedUserRoleIds: deletedAssignRoles,
          status: item?.status,
          category: item?.category,
          permissions: item?.permissions,
          userTitleIds: item?.userTitleIds,
          sign: sign,
          stamp: stamp,
          initials: initial,
          employeeType: item?.employeeType,
          isAssignAllSections: isAllUnit,
          locationId: Number(item?.userLocation)
        })
      )
    } else {
      handleSubmitValueWithAuth(userData, null)
    }
  }

  const handleClickShowPassword = () => setShowPassword(showPassword => !showPassword)
  const handleShowConfirmPassword = () => setShowConfirmPassword(showConfirmPassword => !showConfirmPassword)

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleSubmitValueWithAuth = (userData, password) => {
    const mutateFunction = userById?.id ? mutateUpdateUer : mutateRegister

    const data = {
      ...updateUserData,
      password
    }

    if (userById?.id) {
      mutateFunction(data, {
        onSuccess: handleMutateSuccess,
        onError: handleMutateError
      })
    } else {
      mutateFunction(userData, {
        onSuccess: handleMutateSuccess,
        onError: handleMutateError
      })
    }
  }

  const handleOpenModal = param => {
    setCheckSignStamp(param)
    setOpen(true)
    setFileExtension(null)
  }

  const handleCloseModal = () => {
    setSelectedFile(null)
    setSignInitialType('picture')
    setAlignment('picture')
    setDisableSignature(true)
    setOpen(false)
  }

  const handleFileChange = e => {
    setFileExtension(e[0]?.path?.split('.')?.pop())
    setSelectedFile(e[0]?.preview)
    setDisableSignature(false)
  }

  const removeSelectedFile = () => {
    setDisableSignature(true)
    setSelectedFile(null)
  }

  const resendEmailHandler = row => {
    resendEmail(row.id, {
      onSuccess: res => {
        toast?.success(res?.data?.message)
      },
      onError: err => {
        toast.error(err?.response?.data?.message)
      }
    })
  }

  const isDisabled = useMemo(() => {
    return userById?.id ? editCrossLocation : createCrossLocation
  }, [createCrossLocation, userById?.id, editCrossLocation])

  return (
    <Box>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                sx={{ mb: 1 }}
                label='First Name'
                fullWidth
                focused={firstName}
                onFocus={() => {
                  focusedInputRef.current = 'firstName'
                }}
                inputProps={{
                  autoComplete: 'none'
                }}
                error={!!errors['firstName']}
                helperText={errors['firstName'] ? errors['firstName'].message : ''}
                {...register('firstName')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                sx={{ mb: 1 }}
                label='Last Name'
                focused={lastName}
                onFocus={() => {
                  focusedInputRef.current = 'lastName'
                }}
                inputProps={{
                  autoComplete: 'none'
                }}
                fullWidth
                error={!!errors['lastName']}
                helperText={errors['lastName'] ? errors['lastName'].message : ''}
                {...register('lastName')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                InputProps={{
                  readOnly: router.pathname !== '/users/add',
                  min: 0
                }}
                sx={{ mb: 1 }}
                focused={employeeNo}
                onFocus={() => {
                  focusedInputRef.current = 'employeeNo'
                }}
                label='Employee No'
                fullWidth
                error={!!errors['employeeNo']}
                helperText={errors['employeeNo'] ? errors['employeeNo'].message : ''}
                {...register('employeeNo')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                sx={{ mb: 1 }}
                label='Email'
                fullWidth
                focused={email}
                onFocus={() => {
                  focusedInputRef.current = 'email'
                }}
                error={!!errors['email']}
                helperText={errors['email'] ? errors['email'].message : ''}
                {...register('email')}
              />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Employee Type</InputLabel>
                <Select
                  error={!!errors['employeeType']}
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={employeeType}
                  focused={employeeType}
                  label='Employee Type'
                  onChange={personnelHandleOnChange}
                >
                  <MenuItem value='performing_personnel'>Performing Personnel</MenuItem>
                  <MenuItem value='non_performing_personnel'>Non Performing Personnel</MenuItem>
                </Select>
              </FormControl>
              {errors?.employeeType && (
                <Typography color='error' sx={{ fontSize: '12px' }}>
                  {errors.employeeType?.message}
                </Typography>
              )}
            </Grid>

            
          
           

            <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Category</InputLabel>
                <Select
                  error={!!errors['category']}
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={category}
                  defaultValue={category}
                  label='Category'
                  onChange={categoryHandleOnChange}
                >
                  <MenuItem value='medical'>Medical</MenuItem>
                  <MenuItem value='nonMedical'>Non Medical</MenuItem>
                </Select>
              </FormControl>
              {errors?.category && (
                <Typography color='error' sx={{ fontSize: '12px' }}>
                  {errors.category?.message}
                </Typography>
              )}
            </Grid>
          


            <Grid item xs={12}>
              <Divider sx={{ my: 3, width: '100%' }} />
            </Grid>

            <Grid item xs={12} sm={4}>
              {sign && (
                <div className='images-box'>
                  <div>
                    <img src={s3BaseURL(sign)} alt='sign' style={{ width: '100%' }} />
                  </div>
                </div>
              )}

              <div style={{ marginTop: '20px' }}>
                <Button variant='contained' sx={{ color: 'white' }} onClick={() => handleOpenModal('sign')}>
                  {userById?.id ? 'Update Sign' : 'Add Sign'}
                </Button>
              </div>
              {errors?.sign && (
                <Typography color='error' sx={{ fontSize: '12px' }}>
                  {errors.sign?.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={4}>
              {stamp && (
                <div className='images-box'>
                  <div>
                    <img src={s3BaseURL(stamp)} alt='stamp' style={{ width: '100%' }} />
                  </div>
                </div>
              )}

              <div style={{ marginTop: '20px' }}>
                <Button variant='contained' sx={{ color: 'white' }} onClick={() => handleOpenModal('stamp')}>
                  {userById?.id ? 'Update Stamp' : 'Add Stamp'}
                </Button>
              </div>
              {errors?.stamp && (
                <Typography color='error' sx={{ fontSize: '12px' }}>
                  {errors.stamp?.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={4} sx={{ mb: 1 }}>
              {initial && (
                <div className='images-box'>
                  <div>
                    <img src={s3BaseURL(initial)} alt='initial' style={{ width: '100%' }} />
                  </div>
                </div>
              )}

              <div style={{ marginTop: '20px' }}>
                <Button variant='contained' sx={{ color: 'white' }} onClick={() => handleOpenModal('initial')}>
                  {userById?.id ? 'Update Initial' : 'Add Initial'}
                </Button>
              </div>
              {errors?.initial && (
                <Typography color='error' sx={{ fontSize: '12px' }}>
                  {errors.initial?.message}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            {!userById?.id && (
              <Button
                onClick={handleClear}
                variant='outlined'
                color='error'
                sx={{ py: '0.5rem', px: '1rem', mt: '1rem', mx: '0.5rem' }}
              >
                Clear
              </Button>
            )}

            <LoadingButton
              variant='contained'
              type='submit'
              loading={updateLoading || registerLoading}
              className='btn-primary'
              sx={{ py: '0.55rem', px: '1.5rem', mt: '1rem', color: '#fff' }}
            >
              {userById?.id ? 'Update' : 'Register'}
            </LoadingButton>
          </Box>
        </Box>
        {authCheckModal && (
          <PasswordConfirmation
            handleClose={handleCloseAuthModal}
            open={authCheckModal}
            handleSubmitValueWithAuth={handleSubmitValueWithAuth}
          />
        )}
      </form>
      <UserSignAndStampModal
        open={open}
        handleClose={handleCloseModal}
        handleSaveClick={handleSaveClick}
        handleSaveSignAndInitial={handleSaveSignAndInitial}
        handleFileChange={handleFileChange}
        setEditor={setEditor}
        selectedFile={selectedFile}
        setImageKey={setImageKey}
        fileExtension={fileExtension}
        removeSelectedFile={removeSelectedFile}
        userById={userById}
        checkSignStamp={checkSignStamp}
        clearErrors={clearErrors}
        setValue={setValue}
        signatureRef={signatureRef}
        handleClearSignature={handleClearSignature}
        setSignInitialType={setSignInitialType}
        signInitialType={signInitialType}
        alignment={alignment}
        setAlignment={setAlignment}
        disableSaveImage={disableSaveImage}
        disableSignature={disableSignature}
        setDisableSignature={setDisableSignature}
      />
    </Box>
  )
}

export default AddUserForm
