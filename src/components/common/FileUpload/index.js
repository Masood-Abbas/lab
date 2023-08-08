import React, { useState } from 'react'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormHelperText from '@mui/material/FormHelperText'

import CloudUpload from '@mui/icons-material/CloudUpload'
import AttachmentIcon from '@mui/icons-material/Attachment'
import { s3BaseURL } from '@/utils/utils'

function FileUpload({ label, error, helperText, onChange, ...props }) {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = event => {
    if (onChange && event?.target?.files?.[0]) {
      const file = event.target.files[0]
      setSelectedFile(file)
      onChange({
        target: {
          name: props?.name,
          value: file
        }
      })
    }
  }

  return (
    <>
      <Typography sx={{ fontWeight: '600', color: '#09948e', mb: 1 }}>
        {label}
        {props?.isRequired && ' *'}
      </Typography>
      <Input
        disabled={props?.disabled}
        type='file'
        id='file-upload'
        inputProps={{ accept: '.pdf, .docx, .xlsx, .png, .jpeg' }}
        onChange={handleFileChange}
        endAdornment={
          <InputAdornment position='end'>
            <label htmlFor='file-upload'>
              <IconButton component='span' disabled={props?.disabled}>
                <CloudUpload />
              </IconButton>
            </label>
          </InputAdornment>
        }
      />
      <div>
        {(selectedFile || props?.value) && (
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (props?.value?.toString()?.includes('attachments')) {
                window.open(s3BaseURL(props?.value))
              }
            }}
          >
            <AttachmentIcon />
            {selectedFile?.name || props?.value?.name || props?.value || ''}
          </span>
        )}
      </div>
      {error && (
        <FormHelperText style={{ color: 'red' }} error>
          {error}
        </FormHelperText>
      )}
      {helperText && <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>}
    </>
  )
}

export default FileUpload
