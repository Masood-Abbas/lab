import Header from "@/components/common/Header/Header";
import AppoitmentList from "@/components/dashboard/appoitnmentList";
import BarChart from "@/components/dashboard/charts/BarChart/BarChart";
import LineChart from "@/components/dashboard/charts/LineChart/LineChart";
import DashboardCard from "@/components/dashboard/dashboardCard";
import DashboardTable from "@/components/dashboard/dashboardTable";
import GreetingDoctor from "@/components/dashboard/greetinDr";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const root = {
  flexGrow: 1,
  padding: "4px",
};


const Dashboard = () => {
  return (
    <Box component="main" className="main-content">
        <div style={root}>
          <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
            <Grid item xs={12} lg={12} spacing={2}>
              <Grid spacing={2}>
              <GreetingDoctor/>
              </Grid>
            </Grid>
            <Grid item xs={12}  lg={12}>
              <Grid spacing={4}>
                <DashboardCard />
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div style={root}>
          <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} md={8} spacing={2}>
                <Grid spacing={2}>
                  <DashboardTable />
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <Grid spacing={4}>
                  <AppoitmentList />
                </Grid>
              </Grid>
          </Grid>
        </div>
        <div style={root}>
          <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} md={6} spacing={2}>
                <Grid spacing={2}>
                  <BarChart />
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid spacing={4}>
                  <LineChart />
                </Grid>
              </Grid>
          </Grid>
        </div>
    </Box>
  );
};

export default Dashboard;
