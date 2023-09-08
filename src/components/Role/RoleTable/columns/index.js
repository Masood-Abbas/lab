import moment from 'moment'
import Button from '@mui/material/Button'
import { BiEditAlt } from 'react-icons/bi'
import Tooltip from '@mui/material/Tooltip'
import { setRoleRowSelected } from '@/store/role/roleSlice'
import Highlighter from 'react-highlight-words'

export const columns = ({ dispatch, handleRoleModalOpen, searchRoleName, disable_edit_role_button,crossLocationEntityPermission }) => {
  const handleSelectRow = ({ row }) => {
    handleRoleModalOpen()
    dispatch(setRoleRowSelected(row))
  }

  return [
    {
      key: '1',
      field: 'id',
      headerName: 'ID',
      headerAlign: 'center',
      align: 'center',
      width: 50
    },
    {
      key: '2',
      field: 'role',
      headerName: 'Role',
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => (
        <Tooltip title={row?.name}>
          <div className='wrap-text'>
            <Highlighter
              highlightClassName='YourHighlightClass'
              searchWords={[searchRoleName]}
              autoEscape={true}
              textToHighlight={row?.name}
            />
          </div>
        </Tooltip>
      )
    },
    {
      key: '9',
      field: 'type',
      headerName: 'Type',
      headerAlign: 'center',
      align: 'center',
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        return <>{ row?.type ? row?.type==='global'? 'Global':'Location Bound' : '-'}</>
      }
    },
    {
      key: '3',
      field: 'createdAt',
      headerName: 'Created At',
      headerAlign: 'center',
      align: 'center',
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        return <>{moment(row?.createdAt).format('MM-DD-YYYY HH:mm:ss')}</>
      }
    },
    {
      key: '4',
      field: 'createdBy',
      headerName: 'Created By',
      headerAlign: 'center',
      align: 'center',
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <>
            {row?.roleCreator?.employeeNo
              ? `${row?.roleCreator?.firstName} ${row?.roleCreator?.lastName} - ${row?.roleCreator?.employeeNo}`
              : '-'}
          </>
        )
      }
    },
    {
      key: '5',
      field: 'updatedAt',
      headerName: 'Updated At',
      headerAlign: 'center',
      align: 'center',
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        const createdDate = moment(row?.createdAt).format('MM-DD-YYYY HH:mm:ss')
        const updatedDate = moment(row?.updatedAt).format('MM-DD-YYYY HH:mm:ss')

        return <>{createdDate === updatedDate ? '-' : updatedDate}</>
      }
    },

    {
      key: '6',
      field: 'updatedBy',
      headerName: 'Updated By',
      headerAlign: 'center',
      align: 'center',
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <>
            {row?.roleUpdater?.employeeNo
              ? `${row?.roleUpdater?.firstName} ${row?.roleUpdater?.lastName} - ${row?.roleUpdater?.employeeNo}`
              : '-'}
          </>
        )
      }
    },
    {
      key: '7',
      field: 'actions',
      headerName: 'Actions',
      headerAlign: 'center',
      sortable: false,
      minWidth: 150,
      flex: 1,
      disableClickEventBubbling: true,
      align: 'center', 
      renderCell: ({ row }) => {
      const locationType=row?.type

        return ( 
          <>
            <Button
              id='basic-button'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={() => handleSelectRow({ row })}
              color='primary'              
              disabled={!disable_edit_role_button || (locationType === 'global' && !crossLocationEntityPermission ) }
            >
              <BiEditAlt size={20} />
            </Button>
          </>
        )
      }
    }
  ]
}
