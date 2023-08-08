import React, { useEffect, useMemo, useState } from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Loader from '@/components/common/Loader/Loader'
import { themePalette } from '@/Lib/theme/palette'
// import { setAuthenticated, setUserInfo } from '@/store/auth/authSlice'
// import { useAuthUser } from '@/api/authApi/authApi'
// import BreadcrumbLayout from '@/components/common/Breadcrumbs'

const drawerWidth = 240

const AdminLayout = ({ children, roles = null }) => {
  const [open, setOpen] = useState(true)
  const dispatch = useDispatch()
  const router = useRouter()
  const [accessGranted, setAccessGranted] = useState(false)
  // const { authenticated } = useSelector(state => state.auth)

  // const { isLoading } = useAuthUser({
  //   onSuccess: data => {
  //     dispatch(setAuthenticated(true))
  //     dispatch(setUserInfo(data))
  //     setAccessGranted(data?.isActive)
  //   },
  //   onError: () => {
  //     dispatch(setAuthenticated(false))
  //     if (!router?.pathname?.includes('/set-password')) {
  //       router.push('/login')
  //     } 
  //   }
  // })

  useEffect(() => {
    if (router?.pathname === '/archives') {
      router.push('/')
    }
  }, [router])

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  const isAuthenticated = () => {
    return true
  }

  const activeBreadCrumb = useMemo(() => {
    return router?.pathname?.includes('/all-files')
  }, [router])

  return (
    <ThemeProvider theme={themePalette}>
      {/* {isLoading && <Loader />} */}
      {isAuthenticated() && (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Header handleDrawerToggle={handleDrawerToggle} />
          <Sidebar handleDrawerToggle={handleDrawerToggle} open={open} drawerWidth={drawerWidth} />
          <Box className='main-layout' component='main' sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
           

            <Box sx={{ flexGrow: 1, p: 3, mt: activeBreadCrumb ? 3 : 0 }}>{children}</Box>
          </Box>
        </Box>
      )} 
    </ThemeProvider>
  )
}

export default AdminLayout
