import { Box, Button, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addBloodGlucoseTest,
  addBloodTest,
  getBasicDetailOfPatientById,
  updateRequest,
} from "@/api/requestApi/reqest";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { Typography, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { checkPermissions } from "@/utils/utils";

const Test = () => {
  const [patientDetail, setPatientDetail] = useState({});

  const {
    clearErrors,
    reset,
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:
      patientDetail[0]?.test === "Blood Test"
        ? {
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
          }
        : {
            fastingBloodSugar: "",
            postprandialBloodSugar: "",
            randomBloodSugar: "",
            cholesterol: "",
            insulinLevel: "",
            hba1c: "",
          },
  });

  const router = useRouter();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkPermission = checkPermissions(18, user?.roles[0]?.permissions);
    if (!checkPermission) {
      router.push("/404");
    }
  }, [router, user]);

  const { mutate } = useMutation({
    mutationFn: (data) => {
      if (data) {
        return getBasicDetailOfPatientById(data);
      }
      return null;
    },
    onSuccess: (res) => {
      if (res) {
        setPatientDetail(res);
      }
    },
  });

  console.log(patientDetail[0]?.test);

  useEffect(() => {
    mutate(router?.query?.test);
  }, [router, mutate]);

  const { mutate: addBloodTestMutate, isLoading: addBloodTestMutateLaoding } =
    useMutation({
      mutationFn: (data) => addBloodTest(data),
      onSuccess: (response) => {
        console.log(response);
        const requestData = {
          id: patientDetail[0]?.id,
          reportStatus: "Done",
        };
        toast.success(response?.data?.message);
        router?.push("/request");
        mutateUpdateStatus(requestData);
      },
    });
  const {
    mutate: addBloodGlucoseTestMutate,
    isLoading: addBloodGlucoseTestMutateLaoding,
  } = useMutation({
    mutationFn: (data) => addBloodGlucoseTest(data),
    onSuccess: (response) => {
      const requestData = {
        id: patientDetail[0]?.id,
        reportStatus: "Done",
      };
      console.log(response);
      toast.success(response?.data?.message);
      router?.push("/request");
      mutateUpdateStatus(requestData);
    },
  });

  const { mutate: mutateUpdateStatus } = useMutation({
    mutationFn: (data) => updateRequest(data),
  });

  const onSubmit = (formData) => {
    const data = {
      email: patientDetail[0]?.email,
      pdfName: patientDetail[0]?.pdfName,
      name: patientDetail[0]?.firstName + " " + patientDetail[0]?.lastName,
      sex: patientDetail[0]?.gender,
      ...formData,
    };
    if (patientDetail[0]?.test === "Blood Test") {
      addBloodTestMutate(data);
    } else {
      addBloodGlucoseTestMutate(data);
    }
  };

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
        <strong>PDF Name</strong>:{patientDetail[0]?.pdfName}
        <br />
      </Box>
      <Divider />

      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h5" sx={{ mt: 3 }}>
              {patientDetail[0]?.test}
            </Typography>
          </Grid>

          {patientDetail[0]?.test === "Blood Test" && (
            <>
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
                  {...register("erythrocyte")}
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
                  {...register("mch")}
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
                  {...register("mchc")}
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
                  {...register("lymphocytes")}
                />
              </Grid>
            </>
          )}

          {patientDetail[0]?.test === "Blood Glucose Test (BGC)" && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ mb: 1 }}
                  label="Fasting Blood Sugar"
                  inputProps={{
                    autoComplete: "none",
                  }}
                  fullWidth
                  {...register("fastingBloodSugar")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ mb: 1 }}
                  label="Postprandial Blood Sugar"
                  inputProps={{
                    autoComplete: "none",
                  }}
                  fullWidth
                  {...register("postprandialBloodSugar")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ mb: 1 }}
                  label="Random Blood Sugar"
                  inputProps={{
                    autoComplete: "none",
                  }}
                  fullWidth
                  {...register("randomBloodSugar")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ mb: 1 }}
                  label="Cholesterol Level"
                  inputProps={{
                    autoComplete: "none",
                  }}
                  fullWidth
                  {...register("cholesterol")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ mb: 1 }}
                  label="Insulin Level"
                  inputProps={{
                    autoComplete: "none",
                  }}
                  fullWidth
                  {...register("insulinLevel")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ mb: 1 }}
                  label="HbA1c"
                  inputProps={{
                    autoComplete: "none",
                  }}
                  fullWidth
                  {...register("hba1c")}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12} sm={12}>
            <Button
              sx={{ float: "right" }}
              variant="outlined"
              type="submit"
              disabled={
                addBloodTestMutateLaoding || addBloodGlucoseTestMutateLaoding
              }
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Test;
