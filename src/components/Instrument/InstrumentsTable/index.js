import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "@/components/Instrument/InstrumentsTable/columns";
import { useSelector } from "react-redux";
import {
  setInstrumentModal,
  setPage,
  setDeleteInstrumentModal,
} from "@/store/instruments/instrumentsSlice";
import TableEmpty from "@/components/common/TableEmpty";
import AddInstrument from "./AddInstrument";
import DeleteInstrumentModal from "./AddInstrument/DeleteInstrumentModal";
import { checkPermissions } from "@/utils/utils";
const InstrumentTable = ({
  row,
  dispatch,
  instrumentModal,
  deleteInstrumentModal,
  handleCloseDeleteInstrumentModal,
  instrumentRowSelected,
  openInstrumentModal,
}) => {
  const { user } = useSelector((state) => state.auth);
  const updateInstrumentPermission = checkPermissions(
    15,
    user?.roles[0]?.permissions
  );
  const deleteInstrumentPermission = checkPermissions(
    16,
    user?.roles[0]?.permissions
  );

  const handleInstrumentModalClose = () => {
    dispatch(setInstrumentModal(false));
  };

  return (
    <>
      <div style={{ height: "70vh", width: "100%" }}>
        <DataGrid
          components={{
            NoRowsOverlay: TableEmpty,
          }}
          rows={row}
          columns={columns({
            dispatch,
            openInstrumentModal,
            updateInstrumentPermission,
            deleteInstrumentPermission,
          })}
          rowLength={100}
          rowsPerPageOptions={[15]}
          pageSize={15}
          rowCount={row?.length}
          pagination={false}
          className="hide-pagination"
        />
      </div>
      {instrumentModal && (
        <AddInstrument
          instrumentRowSelected={instrumentRowSelected}
          open={instrumentModal}
          handleClose={handleInstrumentModalClose}
        />
      )}
      {deleteInstrumentModal && (
        <DeleteInstrumentModal
          open={deleteInstrumentModal}
          handleClose={handleCloseDeleteInstrumentModal}
          instrumentRowSelected={instrumentRowSelected}
          dispatch={dispatch}
        />
      )}
    </>
  );
};

export default InstrumentTable;
