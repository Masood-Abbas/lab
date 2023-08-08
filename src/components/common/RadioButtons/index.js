import React from 'react'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'

import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'

const CustomRadioButtons = ({ label, options, value, onChange, error, helperText, disable, ...props }) => {
  const handleRadioChange = event => {
    if (onChange) {
      if (event.target.type === 'radio') onChange(event)
      else {
        onChange({
          target: {
            name: props.name,
            value: `__Other __${event.target.value}`
          }
        })
      }
    }
  }

  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend' sx={{ fontWeight: '600', color: '#09948e' }}>
        {label}
        {props?.isRequired && ' *'}
      </FormLabel>
      <RadioGroup
        value={value?.includes('__Other __') ? value.split('__')[1] : value}
        onChange={handleRadioChange}
        {...props}
      >
        {options?.map(option => (
          <span key={option?.name}>
            <FormControlLabel
              key={option?.name}
              value={option?.name}
              control={<Radio {...props} />}
              label={option?.name}
            />
            {option?.abbreviation && `(${option?.abbreviation})`}
          </span>
        ))}
        {(value?.includes('__Other __') || value === 'Other ') && (
          <TextField
            required={true}
            disabled={props?.disabled}
            size='small'
            placeholder='Specify'
            value={value.includes('__Other __') ? value.split('__')[2] : ''}
            onChange={handleRadioChange}
            fullWidth
          />
        )}
        {error && (
          <FormHelperText style={{ color: 'red' }} error>
            {error}
          </FormHelperText>
        )}
        {helperText && <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>}
      </RadioGroup>
    </FormControl>
  )
}

export default CustomRadioButtons
