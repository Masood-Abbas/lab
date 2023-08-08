import React from 'react'
import { Typography } from '@mui/material'
import { FONT_WEIGHTS } from '@/components/constants'

const CustomTypography = ({ label, variant, textAlign, fontWeight, ...props }) => {
  return (
    <Typography
      sx={{
        marginBottom: 0,
        textAlign: `${textAlign}`,
        fontWeight: FONT_WEIGHTS[fontWeight],
        color: '#09948e',
        width: 'auto',
        height: 'auto'
      }}
      fullWidth
      label={label}
      variant={variant}
      {...props}
      disabled={props?.disabled}
    >
      {label || ''}
    </Typography>
  )
}

export default CustomTypography
