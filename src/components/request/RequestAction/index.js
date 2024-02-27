import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
const RequestsAction = ({ dispatch, openRequestModal }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} lg={4}>
     <h1 style={{marginBottom:'30px'}}> Patient Details</h1>  
      </Grid>
     

      <Grid
        item
        xs={10}
        md={4}
        lg={8}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <div className="inst_button">
          <Button
            onClick={openRequestModal}
            variant="contained"
            sx={{ color: "#fff", fontWeight: 600, py: 1, mb: 1 }}
          >
            Add New Patient
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default RequestsAction;
