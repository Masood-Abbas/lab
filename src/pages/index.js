// ** React Imports
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAuthLogin, useAuthUser } from "@/api/authApi/authApi";

// ** Next Imports
import { useRouter } from "next/router";

// ** MUI Components

import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";

import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";

// ** Icons Imports

import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";

// ** States from Slice
import { setAuthenticated, setUser } from "@/store/auth/authSlice";
import Loader from "@/components/common/Loader/Loader";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, reportSchema } from "@/schema/authSchema";
import CircularProgress from "@mui/material/CircularProgress";
import { loginUser } from "@/api/authApi/authApi";
import { getReport } from "@/api/workflowInboxApi/index";
import { useMutation } from "react-query";
import axios from "axios";
import { saveToLocalStorage } from "@/utils/utils";

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: { width: "28rem" },
}));

const LoginPage = () => {
  // ** Hooks
  const router = useRouter();
  const dispatch = useDispatch();
  const focusedInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [selectedButton, setSelectedButton] = useState("laboratoryMember");
  const {user}=useSelector(state=>state.auth)

  

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { mutate, isLoading: loginLoading } = useMutation({
    mutationFn: (data) => loginUser(data),
    onSuccess: (data) => {
      router.push("/home");
    },
    onError: (err) => {
      router.push("/");
    },
  });
  const { mutate: downloadReport } = useMutation({
    mutationFn: (data) => getReport(data),
    onError:(err)=>{
      toast.error('Not Found such report!')
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      employeeNo: null,
      password: null,
      reportNumber: null,
    },
    resolver: yupResolver(
      selectedButton === "laboratoryMember" ? loginSchema : reportSchema
    ),
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (formData) => {
    const form = {
      email: formData?.employeeNo,
      password: formData?.password,
    };

    if (selectedButton === "laboratoryMember") {
      mutate(form, {
        onSuccess: (data) => {
          data;
          document.cookie = `refresh_token=${data?.data?.refresh_token};path=/;`;
          document.cookie = `access_token=${data?.data?.access_token};path=/;`;
          dispatch(setAuthenticated(true));
          saveToLocalStorage("appEmail", form?.email);
          router.push("/home");
          toast.success("Successfully logged in");
        },
        onError: (err) => {
          err;
          toast.error(err?.response?.data);
        },
      });
    } else {
      const data = { name: formData?.reportNumber?.trim() };
      downloadReport(data);      
    }
    formData;
  };

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <Box className="login-page">
        <Grid container spacing={2}>
          <Grid item xs={12} lg={7} className="login-side-image div-center">
            <img src="/images/pages/login-ch-1.svg" alt="logo" />
          </Grid>
          <Grid
            item
            xs={12}
            lg={5}
            className="div-center "
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card sx={{ zIndex: 1, boxShadow: "none", width: "100%" }}>
              <CardContent
                sx={{
                  padding: (theme) => `${theme.spacing(10, 6)} !important`,
                }}
              >
                <Box sx={{ mb: 6 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      marginBottom: 1.5,
                      textAlign: "center",
                    }}
                  >
                    Welcome to DigiLab!
                  </Typography>
                  <Typography variant="body2" sx={{ textAlign: "center" }}>
                    Please <strong> Sign-in</strong> to your account
                  </Typography>
                </Box>
                <ButtonGroup
                  aria-label="outlined primary button group"
                  sx={{ mb: 5 }}
                >
                  <Button
                    sx={{
                      backgroundColor:
                        selectedButton === "laboratoryMember"
                          ? "#3f9693"
                          : "white",
                      color:
                        selectedButton === "laboratoryMember"
                          ? "white"
                          : "black",
                      transition: "background-color 0.3s, color 0.3s",
                    }}
                    onClick={() => handleButtonClick("laboratoryMember")}
                  >
                    laboratory Member
                  </Button>
                  <Button
                    sx={{
                      backgroundColor:
                        selectedButton === "Patient" ? "#3f9693" : "white",
                      color: selectedButton === "Patient" ? "white" : "black",
                      transition: "background-color 0.3s, color 0.3s",
                    }}
                    onClick={() => handleButtonClick("Patient")}
                  >
                    Patient
                  </Button>
                </ButtonGroup>

                <form onSubmit={handleSubmit(onSubmit)}>
                  {selectedButton === "laboratoryMember" ? (
                    <>
                      <TextField
                        sx={{
                          "& label.Mui-focused": {
                            color: "#18BBAAFF",
                          },
                          "& .MuiInput-underline:after": {
                            borderColor: "#18BBAAFF",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#18BBAAFF",
                            },
                            "&:hover fieldset": {
                              borderColor: "#18BBAAFF",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#18BBAAFF",
                            },
                          },
                        }}
                        label="Badge Number"
                        fullWidth
                        error={!!errors["employeeNo"]}
                        {...register("employeeNo")}
                      />
                      {errors?.employeeNo && (
                        <Typography color="error" sx={{ fontSize: "12px" }}>
                          {errors.employeeNo?.message}
                        </Typography>
                      )}

                      <FormControl
                        fullWidth
                        sx={{
                          mt: 4,
                          "& label.Mui-focused": {
                            color: "#18BBAAFF",
                          },
                          "& .MuiInput-underline:after": {
                            borderColor: "#18BBAAFF",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#18BBAAFF",
                            },
                            "&:hover fieldset": {
                              borderColor: "#18BBAAFF",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#18BBAAFF",
                            },
                          },
                        }}
                      >
                        <InputLabel
                          htmlFor="account-settings-confirm-new-password"
                          className={errors.password ? "Mui-error" : ""}
                        >
                          Password
                        </InputLabel>
                        <OutlinedInput
                          onFocus={() => {
                            focusedInputRef.current = "password";
                          }}
                          label="Password"
                          id="account-settings-confirm-new-password"
                          error={!!errors["password"]}
                          {...register("password")}
                          type={showPassword ? "text" : "password"}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <EyeOutline />
                                ) : (
                                  <EyeOffOutline />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          style={{ borderColor: "#18BBAAFF" }}
                        />
                        {errors?.password && (
                          <Typography color="error" sx={{ fontSize: "12px" }}>
                            {errors.password?.message}
                          </Typography>
                        )}
                      </FormControl>
                    </>
                  ) : (
                    <>
                      <TextField
                        sx={{
                          "& label.Mui-focused": {
                            color: "#18BBAAFF",
                          },
                          "& .MuiInput-underline:after": {
                            borderColor: "#18BBAAFF",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#18BBAAFF",
                            },
                            "&:hover fieldset": {
                              borderColor: "#18BBAAFF",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#18BBAAFF",
                            },
                          },
                        }}
                        label="Report Number"
                        fullWidth
                        error={!!errors["reportNumber"]}
                        {...register("reportNumber")}
                      />
                      {errors?.reportNumber && (
                        <Typography color="error" sx={{ fontSize: "12px" }}>
                          {errors.reportNumber?.message}
                        </Typography>
                      )}
                    </>
                  )}

                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    type="submit"
                    // disabled={loginLoading}
                    sx={{
                      background: "#3f9693",
                      my: 4,
                      "&:hover": { background: "#0DB5AC" },
                    }}
                  >
                    Login
                    {/* {loginLoading && <CircularProgress sx={{ color: '#fff', mr: 1 }} size={15} />} Login */}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LoginPage;
LoginPage.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
