import { Box, Button, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getBasicDetailOfPatientById } from "@/api/requestApi/reqest";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { Typography, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

const Test = () => {
  const {
    clearErrors,
    reset,
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      hemoglobin: "",
      wbcCount: "",
      lekocyte: "",
      bloodSedimentationRate: "",
      trombositeAmount: "",
      hematocrite: "",
      erythrocyte: "",
      plateletCount: "",
      mcv: "",
      mch: "",
      mchc: "",
      eosinophil: "",
      basophil: "",
      neutrophil: "",
      monocytes: "",
      lymphocytes: "",
    },
  });

  const [patientDetail, setPatientDetail] = useState({});
  const router = useRouter();
  console.log(router?.query?.test);

  const { mutate } = useMutation({
    // mutationFn: (data) => getBasicDetailOfPatientById(data),
    // onSuccess:(res)=>{
    //   setPatientDetail(res)
    // },
    mutationFn: (data) => {
      // Check if data is defined before making the API call
      if (data) {
        return getBasicDetailOfPatientById(data);
      }
      return null; // Return null or handle the case where data is undefined
    },
    onSuccess: (res) => {
      // Check if res is defined before updating the state
      if (res) {
        setPatientDetail(res);
      }
    },
  });

  useEffect(() => {
    mutate(router?.query?.test);
  }, [router]);

  console.log(patientDetail);

  return (
    <Box component="main" className="main-content">
      <Typography variant="h5" sx={{ mb: 2 }}>
        Patient Basic Detail
      </Typography>
      <Box>
        <strong>Name</strong>:{patientDetail[0]?.firstName}{" "}
        {patientDetail[0]?.lastName}
        <br />
        <strong>phoneNumber</strong>:{patientDetail[0]?.phoneNumber}
        <br />
        <strong>CNIC</strong>:{patientDetail[0]?.CNIC}
        <br />
        <strong>Gender</strong>:{patientDetail[0]?.gender}
        <br />
        <strong>email</strong>:{patientDetail[0]?.email}
        <br />
        <strong>test</strong>:{patientDetail[0]?.test}
        <br />
      </Box>
      <Divider />

      <Grid container spacing={4}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h5" sx={{ mt: 3 }}>
            {patientDetail[0]?.test}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ mb: 1 }}
            label="Hemoglobin"
            inputProps={{
              autoComplete: "none",
            }}
            fullWidth
            {...register("hemoglobin")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ mb: 1 }}
            label="wbcCount"
            inputProps={{
              autoComplete: "none",
            }}
            fullWidth
            // error={!!errors['lastName']}
            // helperText={errors['lastName'] ? errors['lastName'].message : ''}
            {...register("wbcCount")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ mb: 1 }}
            label="lekocyte"
            inputProps={{
              autoComplete: "none",
            }}
            fullWidth
            // error={!!errors['lastName']}
            // helperText={errors['lastName'] ? errors['lastName'].message : ''}
            {...register("lekocyte")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ mb: 1 }}
            label="bloodSedimentationRate"
            inputProps={{
              autoComplete: "none",
            }}
            fullWidth
            // error={!!errors['lastName']}
            // helperText={errors['lastName'] ? errors['lastName'].message : ''}
            {...register("bloodSedimentationRate")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ mb: 1 }}
            label="trombositeAmount"
            inputProps={{
              autoComplete: "none",
            }}
            fullWidth
            // error={!!errors['lastName']}
            // helperText={errors['lastName'] ? errors['lastName'].message : ''}
            {...register("trombositeAmount")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ mb: 1 }}
            label="hematocrite"
            inputProps={{
              autoComplete: "none",
            }}
            fullWidth
            // error={!!errors['lastName']}
            // helperText={errors['lastName'] ? errors['lastName'].message : ''}
            {...register("hematocrite")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ mb: 1 }}
            label="erythrocyte"
            inputProps={{
              autoComplete: "none",
            }}
            fullWidth
            // error={!!errors['lastName']}
            // helperText={errors['lastName'] ? errors['lastName'].message : ''}
            {...register("erythrocyte")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ mb: 1 }}
            label="Last Name"
            inputProps={{
              autoComplete: "none",
            }}
            fullWidth
            // error={!!errors['lastName']}
            // helperText={errors['lastName'] ? errors['lastName'].message : ''}
            // {...register('lastName')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ mb: 1 }}
            label="plateletCount"
            inputProps={{
              autoComplete: "none",
            }}
            fullWidth
            // error={!!errors['lastName']}
            // helperText={errors['lastName'] ? errors['lastName'].message : ''}
            {...register("plateletCount")}
          />
        </Grid>{" "}
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ mb: 1 }}
            label="mcv"
            inputProps={{
              autoComplete: "none",
            }}
            fullWidth
            // error={!!errors['lastName']}
            // helperText={errors['lastName'] ? errors['lastName'].message : ''}
            {...register("mcv")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ mb: 1 }}
            label="mch"
            inputProps={{
              autoComplete: "none",
            }}
            fullWidth
            // error={!!errors['lastName']}
            // helperText={errors['lastName'] ? errors['lastName'].message : ''}
            // {...register('mch')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ mb: 1 }}
            label="mchc"
            inputProps={{
              autoComplete: "none",
            }}
            fullWidth
            // error={!!errors['lastName']}
            // helperText={errors['lastName'] ? errors['lastName'].message : ''}
            // {...register('mchc')}
          />
        </Grid>{" "}
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ mb: 1 }}
            label="eosinophil"
            inputProps={{
              autoComplete: "none",
            }}
            fullWidth
            // error={!!errors['lastName']}
            // helperText={errors['lastName'] ? errors['lastName'].message : ''}
            {...register("eosinophil")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ mb: 1 }}
            label="basophil"
            inputProps={{
              autoComplete: "none",
            }}
            fullWidth
            // error={!!errors['lastName']}
            // helperText={errors['lastName'] ? errors['lastName'].message : ''}
            {...register("basophil")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ mb: 1 }}
            label="neutrophil"
            inputProps={{
              autoComplete: "none",
            }}
            fullWidth
            // error={!!errors['lastName']}
            // helperText={errors['lastName'] ? errors['lastName'].message : ''}
            {...register("neutrophil")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ mb: 1 }}
            label="monocytes"
            inputProps={{
              autoComplete: "none",
            }}
            fullWidth
            // error={!!errors['lastName']}
            // helperText={errors['lastName'] ? errors['lastName'].message : ''}
            {...register("monocytes")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            sx={{ mb: 1 }}
            label="lymphocytes"
            inputProps={{
              autoComplete: "none",
            }}
            fullWidth
            // error={!!errors['lastName']}
            // helperText={errors['lastName'] ? errors['lastName'].message : ''}
            {...register("lymphocytes")}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button sx={{ float: "right" }} variant="outlined">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Test;
