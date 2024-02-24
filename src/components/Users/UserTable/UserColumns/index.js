import Button from '@mui/material/Button'
import { BiEditAlt } from 'react-icons/bi'
import Tooltip from '@mui/material/Tooltip'
import Highlighter from 'react-highlight-words'
import { setUserById} from '@/store/user/userSlice'

export const userColumns = ({ router, filterUser,setOpenAddUSerModal ,dispatch}) => {
  const handleSelectRow = ({ row }) => {
    dispatch(setUserById(row))
    setOpenAddUSerModal(true)
  }

  return [
    {
      key: '1',
      field: 'firstName',
      headerName: 'Name',
      minWidth: 140,
      flex: 1,
      renderCell: ({ row }) => (
        <Tooltip title={`${row?.firstName} ${row?.lastName}`}>
          <div className='wrap-text'>
          {`${row?.firstName} ${row?.lastName}`}
          </div>
        </Tooltip>
      )
    },
    {
      key: '2',
      field: 'employeeNo',
      headerName: 'Employee No',
      headerAlign: 'center',
      align: 'center',
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => (
        <Tooltip title={row?.employee_no        }>
          <div className='wrap-text text-center'>
            <Highlighter
              highlightClassName='YourHighlightClass'
              searchWords={[filterUser?.employeeNo
              ]}
              autoEscape={true}
              textToHighlight={row?.employeeNo
                ?.toString()}
            />
          </div>
        </Tooltip>
      )
    },
    {
      key: '3',
      field: 'email',
      headerName: 'Email',
      headerAlign: 'center',
      align: 'center',
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Tooltip title={row?.email}>
            <div className='wrap-text text-center'>{row?.email}</div>
          </Tooltip>
        )
      }
    },

    {
      key: '4',
      field: 'category',
      headerName: 'category',
      headerAlign: 'center',
      align: 'center',
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Tooltip title={row?.category}>
            <div className='wrap-text text-center'>{row?.category === 'medical' ? 'Medical' : 'Non Medical' }</div>
          </Tooltip>
        )
      }
    },
    
    {
      key: '5',
      field: 'employe_type',
      headerName: 'Employe Type',
      headerAlign: 'center',
      align: 'center',
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Tooltip title={row?.employe_type}>
            <div className='wrap-text text-center'>{row?.employe_type === 'active' ? 'Active' : "InActive"}</div>
          </Tooltip>
        )
      }
    },

    {
      key: '18',
      field: 'actions',
      headerName: 'Actions',
      headerAlign: 'center',
      sortable: false,
      minWidth: 100,
      flex: 1,
      disableClickEventBubbling: true,
      align: 'center',
      renderCell: ({ row }) => {
        return (
          <>
            <Button
              id='basic-button'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={() => handleSelectRow({ row })}
              color='primary'
            >
              <BiEditAlt size={20} />
            </Button>
          </>
        )
      }
    }
  ]
}
