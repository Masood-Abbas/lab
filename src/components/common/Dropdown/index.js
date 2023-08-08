import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import { InputLabel } from '@mui/material'
import { LabEntity } from '@/utils/utils'

const CustomDropdown = ({ label, selectLabel, variant, options, value, onChange, ...props }) => {
  return (
    <>
      <Typography sx={{ fontWeight: '600', color: '#09948e', mb: 1 }}>
        {selectLabel ? selectLabel : LabEntity(label)}
        {props?.isRequired && ' *'}
      </Typography>
      <FormControl sx={{ m: 1, ml: 0, minWidth: 300, width: '100%' }}>
        <InputLabel id='form-template-component'>{selectLabel ? selectLabel : LabEntity(label)}</InputLabel>
        <Select
          labelId='form-template-component'
          id='form-template-component'
          label={selectLabel || LabEntity(label)}
          value={value}
          onChange={onChange}
          variant={variant}
          disabled={props?.disabled}
          {...props}
        >
          {options?.length > 0 &&
            options?.map(option => (
              <MenuItem key={option?.value} value={option?.name}>
                {option?.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  )
}

export default CustomDropdown
