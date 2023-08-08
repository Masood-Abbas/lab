import { DataGrid } from '@mui/x-data-grid'
import { columns } from '@/components/common/ApprovedFormHistory/HistoryTable/columns/columns'
import React, { useState } from 'react'
import TableEmpty from '@/components/common/TableEmpty'
import { toast } from 'react-toastify'
import Loader from '@/components/common/Loader/Loader'
import { useGetApprovedFormHistory } from '@/api/workflowInboxApi'
import { useRouter } from 'next/router'

const ApprovedFormHistoryTable = ({ formId }) => {
  const [history, setHistory] = useState([])
  const router = useRouter()

  const [sortModel, setSortModel] = useState([
    {
      field: 'id',
      sort: 'desc'
    }
  ])

  const { isLoading } = useGetApprovedFormHistory({
    onSuccess: response => {
      setHistory(response)
    },
    onError: err => {
      toast.error(err?.response?.data?.message)
    },
    params: formId
  })

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && history && (
        <div style={{ height: '50vh', width: '100%' }}>
          <DataGrid
            components={{
              NoRowsOverlay: TableEmpty
            }}
            rows={history}
            columns={columns()}
            rowLength={100}
            sortModel={sortModel}
            onSortModelChange={newSortModel => setSortModel(newSortModel)}
            pageSize={15}
            rowsPerPageOptions={[15]}
            disableRowSelectionOnClick
            disableColumnMenu
            hideFooterSelectedRowCount
          />
        </div>
      )}
    </>
  )
}

export default ApprovedFormHistoryTable
