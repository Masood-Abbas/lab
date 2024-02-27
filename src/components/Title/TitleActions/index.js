import { Button, TextField } from "@mui/material";
import { setSearchTitle, setPage } from "@/store/title/titleSlice";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { checkPermissions } from "@/utils/utils";

const TitleActions = ({ dispatch, openTitleModal }) => {
  const { user } = useSelector((state) => state.auth);
  const addTitlePermission = checkPermissions(9, user?.roles[0]?.permissions);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} lg={4}>
        <h1 style={{ marginBottom: "30px" }}>Titles</h1>
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
            onClick={openTitleModal}
            variant="contained"
            sx={{ color: "#fff", fontWeight: 600, py: 1, mb: 1 }}
            disabled={!addTitlePermission}
          >
            Add New Title
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default TitleActions;
