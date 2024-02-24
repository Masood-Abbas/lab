import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import ContectModal from "@/pages/home/contectModal";
import { useQuery } from "react-query";
import { getUserByEmail } from "@/api/userApi";
import { getFromLocalStorage } from "@/utils/utils";

const headingStyle = {
  textAlign: "center",
  paddingBottom: "8px",
  marginBottom: "16px",
  pt: 5,
};

const root = {
  flexGrow: 1,
  padding: "4px",
};
const card = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
};

const cardContent = {
  flexGrow: 1,
};

const doctorPicture = {
  width: "100%",
  height: "150px",
  borderRadius: "50%",
  margin: "0 auto",
};

const contectHeading = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const doctors = [
  {
    name: "Dr. Agatha",
    picture: "/images/doctors/doctor1.jpg",
    quote: "Ensuring accurate results and patient care.",
  },
  {
    name: "Dr. Jane Doe",
    picture: "/images/doctors/doctor2.jpg",
    quote: "Dedicated to advancing research and innovation.",
  },
  {
    name: "Dr. Elizabeth White",
    picture: "/images/doctors/doctor3.jpeg",
    quote: "Committed to maintaining high lab standards.",
  },
  {
    name: "Dr. Emily Brown",
    picture: "/images/doctors/doctor4.jpeg",
    quote: "Passionate about precision and reliability.",
  },
  {
    name: "Dr. William Lee",
    picture: "/images/doctors/doctor5.jpeg",
    quote: "Exploring new frontiers in scientific discovery.",
  },
  {
    name: "Dr. Michael Johnson",
    picture: "/images/doctors/doctor6.jpeg",
    quote: "Striving for excellence in every lab project.",
  },
];

const services = [
  {
    title: "Equipment Management",
    description:
      "Keep track of laboratory equipment, maintenance schedules, and usage history.",
    borderColor: "#1976d2",
  },
  {
    title: "Experiment Tracking",
    description:
      "Log and analyze experiment data, set up protocols, and record results.",
    borderColor: "#4caf50",
  },
  {
    title: "Sample Management",
    description:
      "Organize and catalog samples, manage storage, and retrieve data quickly.",
    borderColor: "#ff9800",
  },
  {
    title: "Data Analysis",
    description: "Analyze and visualize data from experiments and research.",
    borderColor: "#e91e63",
  },
  {
    title: "Quality Control",
    description: "Ensure quality standards and compliance with regulations.",
    borderColor: "#9c27b0",
  },
  {
    title: "Collaborative Research",
    description:
      "Collaborate with other labs and researchers for breakthrough discoveries.",
    borderColor: "#f44336",
  },
];

const Home = () => {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  };

  useQuery({
    mutationFn: () => getUserByEmail(getFromLocalStorage("appEmail")),
    onSuccess: (res) => {
      res;
    },
  });

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <Box component="main" className="main-content">
      <Box className="Home-Page-container" />

      <Typography variant="h4" sx={headingStyle} color="primary">
        Our Services
      </Typography>
      <div style={root}>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={card}
                style={{ borderBottom: `4px solid ${service.borderColor}` }}
              >
                <CardContent sx={cardContent}>
                  <Typography variant="h6" component="h2">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <Divider />
      <Typography variant="h4" sx={headingStyle} color="primary">
        Our Team
      </Typography>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Meet our team
      </Typography>

      <div style={root}>
        <Grid container spacing={4}>
          {doctors.map((doctor, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card sx={card}>
                <CardContent sx={cardContent}>
                  <img
                    src={doctor.picture}
                    alt={doctor.name}
                    height={350}
                    width="100%"
                    sx={{ height: "300px" }}
                  />
                  <Typography variant="h6" component="h2">
                    {doctor.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {doctor.quote}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      <Typography variant="h4" sx={headingStyle} color="primary">
        Contect Us
      </Typography>

      <div className={contectHeading}>
        <Typography variant="h5" component="h1" align="center">
          Get in touch with our laboratory experts for comprehensive and
          cutting-edge
        </Typography>
        <Typography variant="h5" component="h1" align="center">
          scientific solutions. Your inquiries are important to us.
        </Typography>
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", paddingTop: 30 }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ color: "white" }}
          onClick={handleOpenModal}
        >
          Get in Touch
        </Button>
      </div>

      <Divider sx={{ pt: 3 }} />

      <div className={contectHeading}>
        <Typography variant="h5" component="h1" align="center">
          Our goal is at the heart of all that we do. We make our clients
        </Typography>
        <Typography variant="h5" component="h1" align="center">
          happiness our sole priority.
        </Typography>
      </div>

      {open && <ContectModal open={open} handleClose={handleCloseModal} />}
    </Box>
  );
};

export default Home;
