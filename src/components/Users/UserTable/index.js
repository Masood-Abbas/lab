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

const Table = ({ row, roles, titles }) => {
  const [sortModel, setSortModel] = useState([
    {
      field: "firstName",
      sort: "asc",
    },
  ]);

  const [openAddUserModal, setOpenAddUSerModal] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const { filterUser, userById } = useSelector((state) => state.user);
  const [userSearchType, setUserSearchType] = useState("name");
  const [status, setStatus] = useState(filterUser?.status);

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
    setOpenAddUSerModal(false)};


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} lg={3}>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">Filter by</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userSearchType}
              label="Filter By"
              onChange={handleChangeRolesSearchType}
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="employeeNo">Employee No</MenuItem>
              <MenuItem value="status">Status</MenuItem>
              <MenuItem value="unit">Unit</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          {userSearchType === "name" ? (
            <TextField
              sx={{ mb: 1 }}
              label="Search by Name"
              id="name"
              fullWidth
              size="small"
              name="name"
              value={filterUser?.name}
              onChange={(e) => handleSearch(e?.target?.value, e?.target?.name)}
            />
          ) : userSearchType === "employeeNo" ? (
            <TextField
              sx={{ mb: 1 }}
              label="Search by Employee No"
              id="employeeNo"
              fullWidth
              size="small"
              name="employeeNo"
              value={filterUser?.employeeNo}
              onChange={(e) => handleSearch(e?.target?.value, e?.target?.name)}
              type="number"
            />
          ) : userSearchType === "status" ? (
            <FormControl size="small" fullWidth>
              <InputLabel id="demo-simple-select-label">
                Filter by Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                name="isActive"
                label="Filter By Status"
                onChange={handleChangeStatusSearchType}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <TextField
              sx={{ mb: 1 }}
              label="Search by Unit"
              id="unit"
              fullWidth
              size="small"
              name="unit"
              value={filterUser?.unit}
              onChange={(e) => handleSearch(e?.target?.value, e?.target?.name)}
            />
          )}
        </Grid>
        <Grid item xs={2} md={4} lg={1}>
          <Button
            onClick={resetSearch}
            variant="contained"
            sx={{ color: "#fff", fontWeight: 600, py: 1, mb: 1 }}
          >
            Reset
          </Button>
        </Grid>

        <Grid
          item
          xs={10}
          md={4}
          lg={5}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <div>
            <Button
              onClick={() => setOpenAddUSerModal(true)}
              variant="contained"
              sx={{ color: "#fff", fontWeight: 600, py: 1, mb: 1 }}
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
        />
      }
    </>
  );
};

export default Table;
