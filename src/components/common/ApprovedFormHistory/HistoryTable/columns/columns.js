import Tooltip from '@mui/material/Tooltip'
import moment from 'moment/moment'
import { getFormActions } from '@/utils/utils'
import { capitalize } from 'lodash'

export const columns = () => {
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
      field: 'firstName',
      headerName: 'Name',
      headerAlign: 'center',
      align: 'center',
      width: 150,
      renderCell: ({ row }) => {
        return <>{`${row?.firstName} ${row?.lastName}`}</>
      }
    },
    {
      key: '3',
      field: 'employeeNo',
      headerName: 'Employee No',
      headerAlign: 'center',
      align: 'center',
      width: 100
    },

    {
      key: '4',
      field: 'date',
      headerName: 'Date',
      headerAlign: 'center',
      align: 'center',
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        return <>{moment(row?.data).format('MM-DD-YYYY HH:mm:ss')}</>
      }
    },
    {
      key: '5',
      field: 'operation',
      headerName: 'Actions',
      headerAlign: 'center',
      align: 'center',
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        return <>{capitalize(getFormActions(row?.operation))}</>
      }
    },
    {
      key: '6',
      field: 'remarks',
      headerName: 'Remarks',
      headerAlign: 'center',
      align: 'center',
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <>
            <Tooltip title={row?.remarks}>
              <span className='wrap-text'>{row?.remarks}</span>
            </Tooltip>
          </>
        )
      }
    }
  ]
}
