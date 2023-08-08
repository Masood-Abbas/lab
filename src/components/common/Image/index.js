import React from 'react'
import Typography from '@mui/material/Typography'
import { s3BaseURL } from '@/utils/utils'

function Image({ label, value, ...props }) {
  return (
    <>
      <Typography sx={{ fontWeight: '600', color: '#09948e', mb: 1 }}>{label}</Typography>
      <img
        width={`${props?.width || 100}%`}
        height={`${props?.height || 100}%`}
        src={typeof value === 'object' ? URL.createObjectURL(value) : s3BaseURL(value)}
        alt='Preview'
      />
    </>
  )
}

export default Image
