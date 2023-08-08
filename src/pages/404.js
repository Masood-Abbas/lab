import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'

const PageNotFound = () => {
  const router = useRouter()

  const handleClickGoBack = () => {
    router.back()
  }

  const handleClickHomePage = () => {
    router.push('/')
  }

  return (
    <Box component='main' className='main-content' sx={{ height: '90vh' }}>
      <div className='page-not-found-image-container'>
        <div className='btn-404-page'>
          <Button
            sx={{
              color: 'white',
              bgcolor: 'rgb(0,181,174)',
              height: '50px',
              borderRadius: '5px',
              width: '120px',
              mt: 5
            }}
            variant='contained'
            onClick={handleClickGoBack}
          >
            Go Back
          </Button>

          <Button
            sx={{
              color: 'gray',
              border: 'gray',
              bgcolor: 'white',
              height: '50px',
              width: '150px',
              marginLeft: '20px',
              borderRadius: '5px',
              mt: 5,
              '&:hover': {
                backgroundColor: 'white'
              }
            }}
            variant='contained'
            onClick={handleClickHomePage}
          >
            HOMEPAGE
          </Button>
        </div>
      </div>
    </Box>
  )
}

export default PageNotFound
