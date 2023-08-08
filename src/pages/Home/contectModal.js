import React,{useState} from 'react'
import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import { useForm } from 'react-hook-form'
import { Box, TextField, Typography, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { toast } from 'react-toastify'
import { BootstrapDialog, BootstrapDialogTitle } from '@/components/common/DialogTitle/DialogTitle'
import Rating from '@mui/material/Rating';
import { contectSchema } from '@/schema/contect'
import { yupResolver } from '@hookform/resolvers/yup'
import emailjs from 'emailjs-com';
import { Grid, FormControl, InputLabel, TextareaAutosize, FormHelperText } from '@mui/material';
const ContectModal = ({open,handleClose}) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };
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
      email:null,
      phoneNumber:null,
      review:''
    },
    resolver: yupResolver( contectSchema  )
  })

  const textarea= {
    fontSize: '16px', // Adjust the font size as needed
  }



  const onFinish = (values) => {
   
    
    emailjs
      .send(
        "service_cpts2i9","template_mdw6roo",
        templateParams,
        "23Wo1yMMyQe3ZXka0"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          navigate("/request-call");
        },
        (error) => {
          message.error("Something went wronge please try again!");
          console.log("FAILED...", error);
        }
      );
  };






  const onSubmit = values => {
    console.log(values)
  

    const templateParams = {
      email: values?.email,
      name: values?.name,
      phoneNumber: values?.phoneNumber,
      review: values?.review,
      rating:rating
    };

    emailjs
    .send(
      "service_wp7x2na","template_8nsi45e",
      templateParams,
      "xJ5mERG7Ygbegv8F-"
    )
    .then(
      (response) => {
        toast.success(response.text)
        console.log("SUCCESS!", response.status, response.text);
      },
      (error) => {        
        console.log("FAILED...", error);
        toast.error(error)
      }
    );



  }
  return (
    <div>
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby='customized-dialog-title'
      open={open}
      fullWidth={true}
      maxWidth='sm'
    >
       <BootstrapDialogTitle id='customized-dialog-title' onClose={handleClose}>
          <Typography sx={{ fontWeight: 600, marginBottom: 1.5 }}>
           Feeback
          </Typography>
        </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box>
          <Box component='form' noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Grid item xs={12} sm={6} lg={6} >
            <TextField
              label='Name'
              sx={{mb:3}}
              fullWidth 
              focused={name}
              error={!!errors['name']}
              helperText={errors['name'] ? errors['name'].message : ''}
              {...register('name')}
              />
              </Grid>

              <Grid item xs={12} sm={6} lg={6} >
            <TextField
            sx={{mb:3}}
              label='Phone Number'
              fullWidth 
              error={!!errors['phoneNumber']}
              helperText={errors['phoneNumber'] ? errors['phoneNumber'].message : ''}
              {...register('phoneNumber')}
              />
              </Grid>

              <Grid item xs={12} sm={6}>
              <TextField
                sx={{ mb: 3 }}
                label='Email'
                fullWidth
                error={!!errors['email']}
                helperText={errors['email'] ? errors['email'].message : ''}
                {...register('email')}
              />
            </Grid>

            <Grid container spacing={2}>
          <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel htmlFor="my-textarea">Review</InputLabel>
          <TextareaAutosize
            id="my-textarea"
            minRows={5}
            maxRows={10}
            aria-describedby="my-textarea-helper-text"
            className={textarea} 
            {...register('review')}
          />
          
        </FormControl>
      </Grid>
    </Grid>
      

    <Box display="flex" justifyContent="center" alignItems="center" sx={{pt:4}}> 
      <Box component="fieldset" borderColor="transparent">
        <Rating
          name="rating"
          value={rating}
          onChange={handleRatingChange}
        />
      </Box>
      </Box>
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
                  className='btn-primary'
                  sx={{ py: '0.55rem', px: '1.5rem', mt: '1rem', color: '#fff' }}
                >
                  Save
                </LoadingButton>
              </Box>
          </Box>
        </Box>
      </DialogContent>
    </BootstrapDialog>

   
  </div>
  )
}

export default ContectModal