import { useState ,useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { columns } from '@/components/Title/TitleTable/columns'
import { useSelector } from 'react-redux'
import { setInstrumentModal ,setPage ,setDeleteInstrumentModal} from '@/store/instruments/instrumentsSlice'
import TableEmpty from '@/components/common/TableEmpty'
import AddInstrument from './AddInstrument'
import DeleteInstrumentModal from './AddInstrument/DeleteInstrumentModal'
const InstrumentTable = ({ row, dispatch, instrumentModal, deleteInstrumentsModal, handleCloseDeleteInstrumentModal,instrumentRowSelected}) => {
  


  const [sortModel, setSortModel] = useState([
    {
      field: 'name',
      sort: 'asc'
    }
  ])


  const handleInstrumentModalClose = () => {
    dispatch(setInstrumentModal(false))
  }

  return (
    <>
      <div style={{ height: '70vh', width: '100%' }}>
        <DataGrid
          components={{
            NoRowsOverlay: TableEmpty
          }}
          rows={row}
          columns={columns({ dispatch})}
          rowLength={100}
          rowsPerPageOptions={[15]}
          sortModel={sortModel}
          onSortModelChange={newSortModel => setSortModel(newSortModel)}
          pageSize={15}
          rowCount={row?.length}
          pagination={false}
          className="hide-pagination"  
        />
      </div>
      { instrumentModal && <AddInstrument  open={instrumentModal} handleClose={handleInstrumentModalClose}  />}
      { deleteInstrumentsModal && <DeleteInstrumentModal open ={deleteInstrumentsModal} handleClose={handleCloseDeleteInstrumentModal} instrumentRowSelected={instrumentRowSelected}
      dispatch={dispatch}/>}
    </>
  )
}

export default InstrumentTable
