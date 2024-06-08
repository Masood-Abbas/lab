import List from '@mui/material/List'
import Paper from '@mui/material/Paper' 
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import ListItemAvatar from '@mui/material/ListItemAvatar'

import Avatar from '@mui/material/Avatar'

import ListItemText from '@mui/material/ListItemText'

const headingStyle = {
    textAlign: 'center',
    paddingBottom: '8px',
    marginBottom: '8px',
    pt:5
  };
const appoitmentList = [
    {
      name: 'Dr. Agatha',
      picture: '/images/doctors/doctor1.jpg',
      patient: 'CBC Check',
    },
    {
      name: 'Dr. Jane Doe',
      picture: '/images/doctors/doctor2.jpg',
      quote: 'Dedicated to advancing research and innovation.',
    },
    {
      name: 'Dr. Elizabeth White',
      picture: '/images/doctors/doctor3.jpeg',
      quote: 'Committed to maintaining high lab standards.',
    },
    {
      name: 'Dr. Emily Brown',
      picture: '/images/doctors/doctor4.jpeg',
      quote: 'Passionate about precision and reliability.',
    },
    {
      name: 'Dr. William Lee',
      picture: '/images/doctors/doctor5.jpeg',
      quote: 'Exploring new frontiers in scientific discovery.',
    },
    {
      name: 'Dr. Michael Johnson',
      picture: '/images/doctors/doctor6.jpeg',
      quote: 'Striving for excellence in every lab project.',
    },
  ];


const AppoitmentList = () =>{
    return (
        <Paper square sx={{pb: '50px'}}>
            <Typography variant="h6" sx={headingStyle}  color='primary'>
                Appoitment List
            </Typography>
            <List sx={{ pb: '10px', alignItems: 'center', justifyContent: 'center' , display: 'flex', flexDirection: 'column', gap: '5px', borderRadius: '15px' }}>
                {
                    appoitmentList.map((item, index) => (
                        <ListItem key={index} sx={{bgcolor: '#F7F7F7', width: '90%', pb: '10px'}}>
                            <ListItemAvatar>
                                <Avatar sx={{bgcolor:'#1976d2'}}>
                                    <img src={item.picture} alt='doctor' height='100px' width='100px'/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.name} secondary={item.patient} />
                        </ListItem>
                    ))
                }
            </List>
        </Paper>
    )
}

export default AppoitmentList;