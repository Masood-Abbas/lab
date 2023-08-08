import React from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'

import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'

const CustomCheckbox = ({ label, options, value, onChange, error, helperText, type, row, ...props }) => {
  const handleCheckboxChange = event => {
    const { name, checked } = event?.target
    const currentValue = event?.target?.value
    if (onChange) {
      const updatedValues =
        type === 'row'
          ? checked
            ? [...value, currentValue]
            : value?.filter(v => v !== currentValue)
          : checked
          ? [...value, name]
          : value?.filter(v => v !== name)
      onChange({
        target: {
          name: props?.name,
          value: updatedValues
        }
      })
    }
  }

  return (
    <FormGroup row={row === 'row'}>
      <FormLabel
        component='legend'
        sx={{ fontWeight: '600', color: '#09948e', marginRight: '20px', marginTop: '10px' }}
      >
        {label}
        {props?.isRequired && ' *'}
      </FormLabel>
      {options?.map(option => (
        <FormControlLabel
          key={option?.key}
          control={
            <Checkbox
              {...props}
              disabled={option?.disable}
              checked={(option.value && value?.includes(option?.value)) || value?.includes(option?.name)}
              name={option?.name}
              value={option?.value}
              onChange={handleCheckboxChange}
            />
          }
          label={option?.name}
        />
      ))}
      {error && (
        <FormHelperText style={{ color: 'red' }} error>
          {error}
        </FormHelperText>
      )}
      {helperText && <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>}
    </FormGroup>
  )
}

export default CustomCheckbox
