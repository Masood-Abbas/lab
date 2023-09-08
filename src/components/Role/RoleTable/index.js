import { useState , useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { columns } from '@/components/Role/RoleTable/columns'
import { useSelector } from 'react-redux'
import TableEmpty from '@/components/common/TableEmpty'
import AddRoleModal from './AddRole/index'
import { setRoleModal ,setRolePage} from '@/store/role/roleSlice'
import { FileOperationsEnum } from '@/utils/constants'
import { checkUserAssignPermissions } from '@/utils/utils'
import Pagination from '@mui/material/Pagination';

const Table = ({ dispatch, handleRoleModalOpen, row, refetch ,setSkip,totalRows}) => {
  const { userPermissions } = useSelector(state => state.auth)
  const [crossLocationEntityPermission,setCrossLocationEntityPermission] = useState(false)

  const [sortModel, setSortModel] = useState([
    {
      field: 'name',
      sort: 'asc'
    }
  ])

  const handlePageChange = (event, newPage) => {
    dispatch(setRolePage(newPage))
    setSkip((newPage-1)*15)
  };

  useEffect(() => {
    setCrossLocationEntityPermission(checkUserAssignPermissions(FileOperationsEnum?.CREATE_GLOBAL_ENTITIES, userPermissions))
  },[userPermissions])


  const { roleModal, searchRoleName ,rolePage} = useSelector(state => state.role)

  const handleRoleModalClose = () => {
    dispatch(setRoleModal(false))
  }

  let disable_edit_role_button = checkUserAssignPermissions(FileOperationsEnum?.EDIT_ROLES, userPermissions)

  return (
    <>
      <div style={{ height: '70vh', width: '100%' }}>
        <DataGrid 
          components={{
            NoRowsOverlay: TableEmpty
          }}
          rows={row}
          columns={columns({
            dispatch, handleRoleModalOpen,
            searchRoleName,
            disable_edit_role_button,
            crossLocationEntityPermission
          })}
          rowLength={100}
          pageSize={15}
          rowsPerPageOptions={[15]}
          sortModel={sortModel}
          onSortModelChange={newSortModel => setSortModel(newSortModel)}
          rowCount={totalRows}
          pagination={false}
          className="hide-pagination"  
        />
        <Pagination
          count={Math.ceil(totalRows / 15)}
          page={rolePage}
          color="primary"
          onChange={handlePageChange}        
          sx={{ mt: 1 }}
          variant="outlined"
      />
      </div>
      {roleModal && (
        <AddRoleModal open={roleModal} dispatch={dispatch} handleClose={handleRoleModalClose} refetch={refetch} />
      )}
    </>
  )
}

export default Table
