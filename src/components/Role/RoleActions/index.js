import { Button, TextField } from '@mui/material'
import Grid from '@mui/material/Grid'
import { setSearchRole ,setRolePage } from '@/store/role/roleSlice'
import { useSelector } from 'react-redux'
import { FileOperationsEnum } from '@/utils/constants'
import { checkUserAssignPermissions } from '@/utils/utils'

const RoleActions = ({ handleRoleModalOpen, dispatch, searchRoleName,setSkip }) => {
  const { userPermissions } = useSelector(state => state.auth)

  const resetSearch = () => {
    dispatch(setSearchRole(''))
    setSkip(0)
    dispatch(setRolePage(1))
  }

  const handleSearch = value => {
    dispatch(setSearchRole(value?.trimStart()))
    setSkip(0)
    dispatch(setRolePage(1))
  }

  let disable_add_role_button = checkUserAssignPermissions(FileOperationsEnum?.ADD_ROLE, userPermissions)

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} lg={3}>
        <TextField
          sx={{ mb: 1 }}
          label='Search by Role'
          id='name'
          fullWidth
          size='small'
          name='name'
          value={searchRoleName}
          onChange={e => handleSearch(e?.target?.value)}
        />
      </Grid>
      <Grid item xs={2} md={4} lg={1}>
        <Button onClick={resetSearch} variant='contained' sx={{ color: '#fff', fontWeight: 600, py: 1, mb: 1 }}>
          Reset
        </Button>
      </Grid>

      <Grid item xs={10} md={4} lg={8} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div>
          <Button
            onClick={handleRoleModalOpen}
            variant='contained'
            sx={{ color: '#fff', fontWeight: 600, py: 1, mb: 1 }}
            disabled={!disable_add_role_button}
          >
            Add New
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default RoleActions
