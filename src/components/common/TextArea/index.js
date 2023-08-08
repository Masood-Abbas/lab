import React from 'react'
import TextField from '@mui/material/TextField'

const TextArea = ({ label, variant, ...props }) => {
  return (
    <TextField
      focused
      fullWidth
      disabled={props?.disabled}
      label={label}
      variant={variant}
      multiline
      {...props}
      inputProps={{ ...props }}
    />
  )
}

export default TextArea
