import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  setSearchRole
} from "@/store/role/roleSlice";
const RoleActions = ({ openRoleModal, dispatch,searchRoleName }) => {
  const handleSearch = value => {
    dispatch(setSearchRole(value?.trimStart()))
   
  }
  const resetSearch = () => {
    dispatch(setSearchRole(''))
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} lg={3}>
        <TextField
          sx={{ mb: 1 }}
          label="Search by Role"
          id="name"
          fullWidth
          size="small"
          name="name"
          value={searchRoleName}
          onChange={e => handleSearch(e?.target?.value)}
        />
      </Grid>
      <Grid item xs={2} md={4} lg={1}>
        <Button
          variant="contained"
          sx={{ color: "#fff", fontWeight: 600, py: 1, mb: 1 }}
          onClick={resetSearch}
        >
          Reset
        </Button>
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
          >
            Add New
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default RoleActions;
