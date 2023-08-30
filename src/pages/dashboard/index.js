import IconButton from '@mui/material/IconButton'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import { AppBar, Toolbar } from '@mui/material'
import AiOutlineMenu from 'react-icons/ai'

const Dashboard = () => {
   return (
      <Box sx={{ display: 'flex' }}>
         <CssBaseline />
         <AppBar position='absolute'>
            <Toolbar
               sx={{
               pr: '24'
               }}>
               <IconButton
                  edge='start'
                  color='inherit'
                  aria-label='open drawer'
               >
                  <AiOutlineMenu />
               </IconButton>
            </Toolbar>
         </AppBar>
      </Box>
   )
}

export default Dashboard