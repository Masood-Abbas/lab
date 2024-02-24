import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "@/components/Title/TitleTable/columns";
import { useSelector } from "react-redux";
import {
  setTitleModal,
  setPage,
  setDeleteTitleModal,
} from "@/store/title/titleSlice";
import TableEmpty from "@/components/common/TableEmpty";
import AddDesignation from "./AddDesignation";
import DeleteTitleDesignation from "./AddDesignation/DeleteTitleModal";
import { checkPermissions } from "@/utils/utils";

const Table = ({
  row,
  dispatch,
  titleModal,
  deleteTitleModal,
  handleCloseDeleteTitleModal,
  titleRowSelected,
  openTitleModal,
}) => {
  const [sortModel, setSortModel] = useState([
    {
      field: "name",
      sort: "asc",
    },
  ]);

  const { user } = useSelector((state) => state.auth);
  const updateTitlePermission = checkPermissions(
    11,
    user?.roles[0]?.permissions
  );
  const deleteTitlePermission = checkPermissions(
    12,
    user?.roles[0]?.permissions
  );

  const handleTitleModalClose = () => {
    dispatch(setTitleModal(false));
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
            openTitleModal,
            updateTitlePermission,
            deleteTitlePermission,
          })}
          rowLength={100}
          rowsPerPageOptions={[15]}
          sortModel={sortModel}
          onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
          pageSize={15}
          rowCount={row?.length}
          pagination={false}
          className="hide-pagination"
        />
      </div>
      {titleModal && (
        <AddDesignation
          open={titleModal}
          handleClose={handleTitleModalClose}
          titleRowSelected={titleRowSelected}
        />
      )}
      {deleteTitleModal && (
        <DeleteTitleDesignation
          open={deleteTitleModal}
          handleClose={handleCloseDeleteTitleModal}
          titleRowSelected={titleRowSelected}
          dispatch={dispatch}
        />
      )}
    </>
  );
};

export default Table;
