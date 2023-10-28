import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import {useMemo} from 'react'

const TitlesSelector = ({ setValue, error, assignedTitles, clearErrors ,selectedTitles}) => {

 

  const getAssignedTitles = useMemo(() => {
    return selectedTitles?.filter(item => assignedTitles?.includes(item?.id))
  }, [assignedTitles, selectedTitles])

  const handleSelectSections = (_event, value) => {
    clearErrors('userTitleIds')
    setValue(
      'userTitleIds',
      value?.map(e => e?.id)
    )
  }

  return (
    <Autocomplete
      fullWidth
      multiple
      value={getAssignedTitles}
      limitTags={2}
      id='multiple-limit-tags'
      options={selectedTitles}
      getOptionLabel={option => option?.name}
      onChange={handleSelectSections}
      renderInput={params => (
        <TextField
          focused={assignedTitles?.length}
          error={!assignedTitles?.length && !!error}
          helperText={assignedTitles?.length > 0 ? '' : error}
          {...params}
          label='Assign Titles'
          placeholder='Select Titles'
        />
      )}
    />
  )
}

export default TitlesSelector
