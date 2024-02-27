import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { setSearchRole } from "@/store/role/roleSlice";
import { checkPermissions } from "@/utils/utils";
import { useSelector } from "react-redux";
const RoleActions = ({ openRoleModal, dispatch, searchRoleName }) => {
  const { user } = useSelector((state) => state.auth);
  const addRolePermission = checkPermissions(5, user?.roles[0]?.permissions);

  const handleSearch = (value) => {
    dispatch(setSearchRole(value?.trimStart()));
  };
  const resetSearch = () => {
    dispatch(setSearchRole(""));
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} lg={4}>
        <h1 style={{marginBottom:'30px'}}>Roles</h1>
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
            onClick={openRoleModal}
            variant="contained"
            sx={{ color: "#fff", fontWeight: 600, py: 1, mb: 1 }}
            disabled={!addRolePermission}
          >
            Add New
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default RoleActions;
