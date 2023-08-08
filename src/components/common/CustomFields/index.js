import CustomTextField from '@/components/common/Input'
import CustomDropdown from '@/components/common/Dropdown'
import CustomTextArea from '@/components/common/TextArea'
import CustomCheckbox from '@/components/common/Checkboxes'
import CustomRadioButtons from '@/components/common/RadioButtons'
import Grid from '@mui/material/Grid'
import DatePicker from '@/components/common/DatePicker/index'
import FileUpload from '@/components/common/FileUpload'
import AddLinks from '@/components/common/AddLink'
import AddWebLink from '@/components/common/AddWebLink'
import { FT_OPTIONS } from '@/utils/constants'
import CustomTypography from '@/components/common/Typography'
import CustomCalender from '@/components/common/CustomCalender/CustomCalender'
import Image from '@/components/common/Image'

const CustomComponent = props => {
  switch (props?.type) {
    case FT_OPTIONS.label:
      return <CustomTypography {...props} />
    case FT_OPTIONS.input:
      return <CustomTextField {...props} />
    case FT_OPTIONS.textArea:
      return <CustomTextArea {...props} />
    case FT_OPTIONS.dropdown:
      return <CustomDropdown {...props} />
    case FT_OPTIONS.checkbox:
    case FT_OPTIONS.monthly:
      return <CustomCheckbox {...props} />
    case FT_OPTIONS.radio:
      return <CustomRadioButtons {...props} />
    case FT_OPTIONS.date:
    case FT_OPTIONS.month:
    case FT_OPTIONS.year:
      return <DatePicker {...props} />
    case FT_OPTIONS.attachment:
      return <FileUpload {...props} />
    case FT_OPTIONS.link:
      return <AddLinks {...props} />
    case FT_OPTIONS.image:
      return <Image {...props} alt='custom-image' />
    case FT_OPTIONS.webLink:
      return <AddWebLink {...props} />
    case FT_OPTIONS.calendar:
      return <CustomCalender {...props} />
    case FT_OPTIONS.entity:
    case FT_OPTIONS.ma:
      return (
        <Grid container spacing={4} alignItems='center'>
          <Grid item xs={12} lg={6}>
            <CustomDropdown {...props} />
          </Grid>
          {props?.entity?.isAbbreviation && (
            <Grid item xs={12} lg={6} alignItems='center' sx={{ mt: 4 }}>
              <CustomTextField label='Abbreviation' disabled='true' />
            </Grid>
          )}
          {props?.isSerialNo && (
            <Grid item xs={12} lg={6} alignItems='center' sx={{ mt: 4 }}>
              <CustomTextField label='Serial Number' disabled='true' />
            </Grid>
          )}
        </Grid>
      )
    default:
      return null
  }
}

export default CustomComponent
