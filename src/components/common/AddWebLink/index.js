import React from 'react'
import FormHelperText from '@mui/material/FormHelperText'
import Button from '@mui/material/Button'

import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import { TextField, Tooltip } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import { isValidLink } from '@/utils/utils'

const AddWebLink = ({ label, error, helperText, onChange, type, ...props }) => {
  const handelOnChange = e => {
    if (onChange) {
      onChange({
        target: {
          name: props?.name,
          value: e.target.value
        }
      })
    }
  }

  const openWebLink = url => {
    if (isValidLink(url)) {
      window.open(url)
    }
  }

  return (
    <>
      <FormGroup>
        <Grid style={{ marginTop: '20px' }} container>
          <Grid item xs={6}>
            <FormLabel component='legend' sx={{ fontWeight: '600', color: '#09948e' }}>
              {label}
              {props?.isRequired && ' *'}
            </FormLabel>
            {props?.isPreviewed && (
              <TextField
                disabled={props?.disabled}
                onChange={handelOnChange}
                placeholder={props?.placeholder}
                value={props?.value || ''}
              />
            )}
            <FormLabel component='legend' sx={{ fontWeight: '300', color: '#09948e' }}>
              {props?.value?.name}
            </FormLabel>
          </Grid>
          <Grid item xs={6}>
            <Tooltip title={`${props?.value || ''}`}>
              <Button
                disabled={props?.disabled}
                variant='outline'
                sx={{ color: 'black' }}
                onClick={() => openWebLink(props?.value)}
              >
                <LaunchIcon />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
        {error && (
          <FormHelperText style={{ color: 'red' }} error>
            {error}
          </FormHelperText>
        )}
        {helperText && <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>}
      </FormGroup>
    </>
  )
}

export default AddWebLink
