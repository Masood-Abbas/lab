import TextField from '@mui/material/TextField'

const CustomTextField = ({ label, variant, ...props }) => {
  return (
    <TextField
      fullWidth
      InputProps={{
        readOnly: props?.disabled
      }}
      label={label}
      variant={variant}
      inputProps={{ ...props }}
      {...props}
    />
  )
}

export default CustomTextField
