import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import Avatar from '@mui/material/Avatar';

const root= {
  flexGrow: 1,
  padding: '4px',
}

const card= {
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}

  const services = [
    {
      title: 'Total Reports',
      description: '1000',
      borderColor: '#1976d2',
      icon: <AssessmentIcon/> 
    },
    {
      title: 'Delivered Reports',
      description: '450',
      borderColor: '#4caf50',
      icon: <CallMadeIcon/>
    },
    {
      title: 'Pending Reports',
      description: '650',
      borderColor: '#ff9800', 
      icon: <CallReceivedIcon/>
    },
  ];

const DashboardCard = () => {
    return (
      <div>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card sx={card} style={{borderBottom: `4px solid ${service.borderColor}`}}>
                <CardContent>
                  <Avatar sx={{bgcolor: `${service.borderColor}`}}>
                    {service.icon}
                  </Avatar>
                </CardContent>
                <CardContent>
                  <Grid sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography variant='h6' component='h3'>
                        {service.title}
                    </Typography>
                    <Typography variant="h6" color="h2">
                        {service.description}
                    </Typography>
                  </Grid>
                </CardContent>                  
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    )
}

export default DashboardCard