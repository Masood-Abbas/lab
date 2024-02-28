import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "@/components/Users/UserTable/UserColumns";
import TableEmpty from "@/components/common/TableEmpty";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setFilterUser, setUserById } from "@/store/user/userSlice";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, TextField } from "@mui/material";
import AddUserModal from "../AddUserForm/addUserModal";
import { checkPermissions } from "@/utils/utils";
import DeleteUserModal from "../AddUserForm/deleteUserModal";

const Table = ({ row, roles, titles, refetch }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openAddUserModal, setOpenAddUSerModal] = useState(false);
  const [openDeleteUserModal, setOpenDeleteUSerModal] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const addUserPermission = checkPermissions(1, user?.roles[0]?.permissions);
  const updateUserPermission = checkPermissions(2, user?.roles[0]?.permissions);
  const deleteUserPermission = checkPermissions(3, user?.roles[0]?.permissions);
  const { filterUser, userById } = useSelector((state) => state.user);
  const [userSearchType, setUserSearchType] = useState("name");
  const [status, setStatus] = useState(filterUser?.status);

  const handleOpenDeleteModal = (row) => {
    setOpenDeleteUSerModal(true);
    dispatch(setUserById(row));
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteUSerModal(false);
    dispatch(setUserById({}));
  };

  const handleChangeRolesSearchType = (event) => {
    setUserSearchType(event.target.value);
    dispatch(setFilterUser({ status: "", unit: "", name: "", employeeNo: "" }));
  };

  const handleChangeStatusSearchType = (event) => {
    setStatus(event.target.value);
    dispatch(
      setFilterUser({
        ...filterUser,
        ["status"]: event.target.value,
      })
    );
  };

  const resetSearch = () => {
    setStatus("");
    dispatch(setFilterUser({ status: "", unit: "", name: "", employeeNo: "" }));
  };

  const handleSearch = (value, name) => {
    dispatch(
      setFilterUser({
        ...filterUser,
        [name]: value?.trimStart(),
      })
    );
  };

  const handleCloseAddUserModal = () => {
    dispatch(setUserById({}));
    setOpenAddUSerModal(false);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={4} lg={4}>
          <h3 style={{ marginBottom: "30px" }}>Users</h3>
        </Grid>

        <Grid
          item
          xs={10}
          md={4}
          lg={8}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <div>
            <Button
              onClick={() => setOpenAddUSerModal(true)}
              variant="contained"
              sx={{ color: "#fff", fontWeight: 600, py: 1, mb: 1 }}
              disabled={!addUserPermission}
            >
              Add New
            </Button>
          </div>
        </Grid>
      </Grid>

      <div style={{ height: "70vh", width: "100%" }}>
        <DataGrid
          components={{
            NoRowsOverlay: TableEmpty,
          }}
          rows={row}
          columns={userColumns({
            dispatch,
            router,
            filterUser,
            setOpenAddUSerModal,
            dispatch,
            updateUserPermission,
            deleteUserPermission,
            handleOpenDeleteModal,
          })}
          rowLength={100}
          pageSize={15}
          rowsPerPageOptions={[15]}
          rowCount={row?.length}
          disableColumnMenu
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
        />
      </div>
      {
        <AddUserModal
          open={openAddUserModal}
          handleClose={handleCloseAddUserModal}
          userById={userById}
          userTitles={titles}
          userRoles={roles}
          refetch={refetch}
        />
      }

      <DeleteUserModal
        open={openDeleteUserModal}
        handleClose={handleCloseDeleteModal}
        userById={userById}
        refetch={refetch}
      />
    </>
  );
};

export default Table;
