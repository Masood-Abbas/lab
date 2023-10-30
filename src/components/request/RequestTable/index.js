import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "@/components/request/RequestTable/RequestColumns";
import { useSelector } from "react-redux";
import {
  setRequestModal,
} from  "@/store/request/requestSlice";
import TableEmpty from "@/components/common/TableEmpty";
import AddRequest from "./AddRequest";
import { useRouter } from 'next/router';
import DeleteRequestModal from "./AddRequest/DeleteRequestModal";
const RequestTable = ({
  row,
  dispatch,
  requestModal,
  deleteInstrumentModal,
  handleCloseDeleteInstrumentModal,
  requestById,
  openRequestModal,
}) => {
  const router = useRouter();
  const { test } = router.query; 
  console.log(test)
  const [sortModel, setSortModel] = useState([
    {
      field: "name",
      sort: "asc",
    },
  ]);

  const handleRequestModalClose = () => {
    dispatch(setRequestModal(false));
  };


  return (
    <>
      <div style={{ height: "70vh", width: "100%" }}>
        <DataGrid
          components={{
            NoRowsOverlay: TableEmpty,
          }}
          rows={row}
          sx={{cursor:'pointer'}}
          columns={columns({ dispatch, openRequestModal })}
          rowLength={100}
          rowsPerPageOptions={[15]}
          sortModel={sortModel}
          onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
          pageSize={15}
          rowCount={row?.length}
          pagination={false}
          className="hide-pagination"
          onRowClick={(params) => {
            router.push(`/request/patientDetail/${params.row.id}`)
           
           
          }}
        />
      </div>
      {requestModal && (
        <AddRequest
          requestById={requestById}
          open={requestModal}
          handleClose={handleRequestModalClose}
        />
      )}
      {deleteInstrumentModal && (
        <DeleteRequestModal
          open={deleteInstrumentModal}
          handleClose={handleCloseDeleteInstrumentModal}
          requestById={requestById}
          dispatch={dispatch}
        />
      )}
    </>
  );
};

export default RequestTable;
