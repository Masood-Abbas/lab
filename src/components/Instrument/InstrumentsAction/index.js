import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { setSearchInstrument } from "@/store/instruments/instrumentsSlice";
import { useSelector } from "react-redux";
import { checkPermissions } from "@/utils/utils";
const InstrumentsAction = ({ dispatch, openInstrumentModal }) => {
  const { user } = useSelector((state) => state.auth);
  const addInstrumentPermission = checkPermissions(
    13,
    user?.roles[0]?.permissions
  );

  const resetSearch = () => {
    dispatch(setSearchInstrument({ name: "" }));
  };

  return (
    <Grid container >
      <Grid item xs={12} md={4} lg={6}>
        <h1 style={{marginBottom:'30px'}}>Instruments</h1>
      </Grid>

      <Grid
        item
        xs={10}
        md={4}
        lg={6}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <div className="inst_button">
          <Button
            onClick={openInstrumentModal}
            variant="contained"
            sx={{ color: "#fff", fontWeight: 600, py: 1, mb: 1 }}
            disabled={!addInstrumentPermission}
          >
            Add Instrument
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default InstrumentsAction;
