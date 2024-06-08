import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'


const image ={
  margin: 'auto',
  display: 'block',
  height: '100px',
  border: '1px solid black',
  borderRadius: '5px',
  border: 'none',
  outline: 'none',
}


const GreetingDoctor = () => {
  return (
    <Paper sx={{
      backgroundColor: '#18BBAAFF',
      p: 2,
      margin: 'auto'
    }}>
      <Grid container spacing={2}>
        <Grid item>
            <img src='/images/doctors/doctor1.jpg' alt='doctor' style={image}/>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h5" component="div">
                Good Morning 
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Dr Zain 
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default GreetingDoctor