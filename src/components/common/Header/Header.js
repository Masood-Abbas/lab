import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
// import UserDropdown from './UserDropdown'
import Link from 'next/link'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'

const Header = ({ handleDrawerToggle }) => {
  // const { authUserLocation } = useSelector(state => state.auth)

  return (
    <AppBar
      position='fixed'
      sx={{
        zIndex: theme => theme.zIndex.drawer + 1,
        background: 'white'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', px: 3 }}>
        <Toolbar>
          <IconButton
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link href='/' passHref>
            <img src='/images/logos/DigiLab_1.png' width='140' alt='logo' style={{ cursor: 'pointer' }} />
          </Link>
          <Typography sx={{ fontSize: '10px', marginTop: '-15px', ml: 0.5 }}>
            {/* {authUserLocation?.name?.toUpperCase()} */}
          </Typography>
        </Toolbar>
        <Box sx={{ ml: 'auto', width: 'auto' }}>
          {/* <UserDropdown /> */}
        </Box>
      </Box>
    </AppBar>
  )
}

export default Header
