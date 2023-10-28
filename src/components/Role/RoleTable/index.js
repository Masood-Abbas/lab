import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "@/components/Role/RoleTable/columns";
import { useSelector } from "react-redux";
import TableEmpty from "@/components/common/TableEmpty";
import AddRoleModal from "./AddRole/index";
import { setRoleModal } from "@/store/role/roleSlice";
import DeleteRoleModal from "./AddRole/DeleteRoleModal";

const Table = ({
  row,
  dispatch,
  roleModal,
  deleteRoleModal,
  handleCloseDeleteRoleModal,
  roleById,
  openRoleModal,
  permissions,
}) => {
  const [sortModel, setSortModel] = useState([
    {
      field: "name",
      sort: "asc",
    },
  ]);

  const handleRoleModalClose = () => {
    console.log("hello");
    dispatch(setRoleModal(false));
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
            openRoleModal,
            permissions
          })}
          rowLength={100}
          pageSize={15}
          rowsPerPageOptions={[15]}
          sortModel={sortModel}
          onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
        />
      </div>
      {roleModal && (
        <AddRoleModal
          open={roleModal}
          dispatch={dispatch}
          handleClose={handleRoleModalClose}
          roleById={roleById}
          permissions={permissions}
        />
      )}
      {deleteRoleModal && (
        <DeleteRoleModal
          open={deleteRoleModal}
          handleClose={handleCloseDeleteRoleModal}
          roleById={roleById}
          dispatch={dispatch}
        />
      )}
    </>
  );
};

export default Table;
