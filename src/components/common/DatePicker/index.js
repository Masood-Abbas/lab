import * as React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Typography from '@mui/material/Typography'
import FormHelperText from '@mui/material/FormHelperText'
import { DATE_PICKER_LABELS } from '@/components/constants'
import dayjs from 'dayjs'

export default function FirstComponent({ label, error, helperText, ...props }) {
  return (
    <>
      <Typography sx={{ fontWeight: '600', color: '#09948e', mb: 1 }}>
        {label}
        {props?.isRequired && ' *'}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disabled={props?.disabled}
          value={props?.value ? dayjs(props?.value) : null}
          label={DATE_PICKER_LABELS[props?.type]?.label}
          views={DATE_PICKER_LABELS[props?.type]?.views}
          onChange={newValue => {
            if (props?.onChange) {
              props?.onChange({
                target: {
                  name: props.name,
                  value: newValue?.$d || newValue?.date
                }
              })
            }
          }}
        />
        {error && (
          <FormHelperText style={{ color: 'red' }} error>
            {error}
          </FormHelperText>
        )}
        {helperText && <FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>}
      </LocalizationProvider>
    </>
  )
}
