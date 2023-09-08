import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Collapse, Typography } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Divider from '@mui/material/Divider'
import { useRouter } from 'next/router'
import { AiOutlineFieldTime } from 'react-icons/ai'
import { SiHomebridge } from 'react-icons/si'
import { getMenuList, menu } from './MenuList'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CircleIcon from '@mui/icons-material/Circle'
import Tooltip from '@mui/material/Tooltip'
import { capitalize } from 'lodash'
import { WORKFLOW_ROUTES, FileOperationsEnum } from '@/utils/constants'
import { userContainsRoles } from '@/utils/utils'
import { checkUserAssignPermissions } from '@/utils/utils'



const Sidebar = props => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [openSubMenu, setOpenSubMenu] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const [menuList, setMenuList] = useState([])
  const [subMenuList, setSubMenu] = useState([])
  const [checkUserRole, setCheckUserRole] = useState(null)

  const { window, handleDrawerToggle, open, drawerWidth } = props
  const [collapseOpen, setCollapseOpen] = useState(false)

 

  const handleUserTab = () => {
    setUserOpen(!userOpen)
  }

  const handleClick = () => {
    setCollapseOpen(!collapseOpen)
  }

  const styles = {
    fontSize: '1.375rem'
  }

  const handleSubMenuToggle = () => {
    setOpenSubMenu(!openSubMenu)
  }


  const drawer = (
    <div>
      <Toolbar />
      <List>
        <Link href='/Home' passHref>
          <ListItem disablePadding className='truncate-text'>
            <ListItemButton className={router?.pathname === '/Home' ? 'active' : ''} sx={styles}>
              <ListItemIcon>
                <SiHomebridge className={router?.pathname === '/Home' ? 'active-icon' : 'inactive-icon'} />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link href='/users' passHref>
          <ListItem disablePadding className='truncate-text'>
            <ListItemButton className={router?.pathname === '/users' ? 'active' : ''} sx={styles}>
              <ListItemIcon>
                <SiHomebridge className={router?.pathname === '/users' ? 'active-icon' : 'inactive-icon'} />
              </ListItemIcon>
              <ListItemText primary='Users' />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>

      <List>
        <Link href='/title' passHref>
          <ListItem disablePadding className='truncate-text'>
            <ListItemButton className={router?.pathname === '/title' ? 'active' : ''} sx={styles}>
              <ListItemIcon>
                <SiHomebridge className={router?.pathname === '/title' ? 'active-icon' : 'inactive-icon'} />
              </ListItemIcon>
              <ListItemText primary='Title' />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      
      <List>
        <Link href='/instrument' passHref>
          <ListItem disablePadding className='truncate-text'>
            <ListItemButton className={router?.pathname === '/instrument' ? 'active' : ''} sx={styles}>
              <ListItemIcon>
                <SiHomebridge className={router?.pathname === '/instrument' ? 'active-icon' : 'inactive-icon'} />
              </ListItemIcon>
              <ListItemText primary='Instrument' />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
        

      
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label='mailbox folders'>
      <Drawer
        container={container}
        variant='temporary'
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

export default Sidebar
