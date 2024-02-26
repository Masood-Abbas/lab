import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { useForm } from "react-hook-form";
import { Box, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import {
  BootstrapDialog,
  BootstrapDialogTitle,
} from "@/components/common/DialogTitle/DialogTitle";
import Rating from "@mui/material/Rating";
import { addUserSchema, updateUserSchema } from "@/schema/userSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import emailjs from "emailjs-com";
import { Grid, FormControl, InputLabel, Divider } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { checkPermissions } from "@/utils/utils";
const AddUserModal = ({
  open,
  handleClose,
  userById,
  userTitles,
  userRoles,
}) => {
  const focusedInputRef = useRef(null);
  const dispatch = useDispatch();
  

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: null,
      email: null,
      phoneNumber: null,
      profile_img: null,
      employeeNo: null,
      employeeType: null,
      lastName: null,
      category: null,
      roles: [],
      titles: [],
    },
    resolver: yupResolver(userById?.id ? updateUserSchema : addUserSchema),
  });

  const lastName = watch("lastName");
  const employeeNo = watch("employeeNo");
  const phoneNumber = watch("phoneNumber");
  const email = watch("email");
  const category = watch("category");
  const employeeType = watch("employeeType");
  const roles = watch("roles");
  const titles = watch("titles");

  const personnelHandleOnChange = (event) => {
    clearErrors("employeeType");
    setValue("employeeType", event?.target?.value);
  };

  const roleHandleOnChange = (event) => {
    clearErrors("roles");
    setValue("roles", event?.target?.value);
  };

  const titleHandleOnChange = (event) => {
    clearErrors("titles");
    setValue("titles", event?.target?.value);
  };

  const categoryHandleOnChange = (event) => {
    clearErrors("category");
    setValue("category", event?.target?.value);
  };

  useEffect(() => {
    if (userById?.id) {
      setValue("firstName", userById?.firstName);
      setValue("lastName", userById?.lastName);
      setValue("email", userById?.email);
      setValue("phoneNumber", userById?.phoneNumber);
      setValue("employeeType", userById?.employeeType);
      setValue("category", userById?.category);
      setValue("roles", userById?.roles[0]?.id);
      setValue("titles", userById?.titles[0]?.id);
      setValue("employeeNo", userById?.employeeNo);
    }
  }, [userById, setValue]);

  const onSubmit = (values) => {
    const userData = {
      employeeNo: values?.employeeNo,
      password: values?.password,
      firstName: values?.firstName,
      lastName: values?.lastName,
      email: values?.email,
      employeeType: values?.employeeType,
      category: values?.category,
      roles: values?.roles,
      phoneNumber: values?.phoneNumber,
      titles: values?.titles,
    };

    if (userById?.id) {
      axios
        .patch(`http://localhost:5000/user`, userData)
        .then((response) => {
          toast.success(response?.data?.message);
          handleClose();
          fetchUserData();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
          handleClose();
        });
    } else {
      axios
        .post("http://localhost:5000/user", userData)
        .then((response) => {
          toast.success(response?.data?.message);
          handleClose();
          fetchUserData();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
          handleClose();
        });
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth="sm"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography sx={{ fontWeight: 600, marginBottom: 1.5 }}>
            {userById?.id ? "Update User" : "Add User"}
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ mb: 1 }}
                  label="First Name"
                  fullWidth
                  inputProps={{
                    autoComplete: "none",
                  }}
                  error={!!errors["firstName"]}
                  helperText={
                    errors["firstName"] ? errors["firstName"].message : ""
                  }
                  {...register("firstName")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ mb: 1 }}
                  label="Last Name"
                  focused={lastName}
                  onFocus={() => {
                    focusedInputRef.current = "lastName";
                  }}
                  inputProps={{
                    autoComplete: "none",
                  }}
                  fullWidth
                  error={!!errors["lastName"]}
                  helperText={
                    errors["lastName"] ? errors["lastName"].message : ""
                  }
                  {...register("lastName")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ mb: 1 }}
                  focused={employeeNo}
                  onFocus={() => {
                    focusedInputRef.current = "employeeNo";
                  }}
                  label="Employee No"
                  fullWidth
                  error={!!errors["employeeNo"]}
                  disabled={userById?.id ? true : false}
                  helperText={
                    errors["employeeNo"] ? errors["employeeNo"].message : ""
                  }
                  {...register("employeeNo")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ mb: 1 }}
                  label="Email"
                  fullWidth
                  focused={email}
                  onFocus={() => {
                    focusedInputRef.current = "email";
                  }}
                  error={!!errors["email"]}
                  helperText={errors["email"] ? errors["email"].message : ""}
                  {...register("email")}
                />
              </Grid>

              <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Employee Type
                  </InputLabel>
                  <Select
                    error={!!errors["employeeType"]}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={employeeType}
                    focused={employeeType}
                    label="Employee Type"
                    onChange={personnelHandleOnChange}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">InActive</MenuItem>
                  </Select>
                </FormControl>
                {errors?.employeeType && (
                  <Typography color="error" sx={{ fontSize: "12px" }}>
                    {errors.employeeType?.message}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    error={!!errors["category"]}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    defaultValue={category}
                    label="Category"
                    onChange={categoryHandleOnChange}
                  >
                    <MenuItem value="medical">Medical</MenuItem>
                    <MenuItem value="nonMedical">Non Medical</MenuItem>
                  </Select>
                </FormControl>
                {errors?.category && (
                  <Typography color="error" sx={{ fontSize: "12px" }}>
                    {errors.category?.message}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ mb: 1 }}
                  label="Password"
                  focused={lastName}
                  onFocus={() => {
                    focusedInputRef.current = "password";
                  }}
                  inputProps={{
                    autoComplete: "none",
                  }}
                  fullWidth
                  error={!!errors["password"]}
                  helperText={
                    errors["password"] ? errors["password"].message : ""
                  }
                  {...register("password")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ mb: 1 }}
                  label="phoneNumber"
                  fullWidth
                  focused={phoneNumber}
                  onFocus={() => {
                    focusedInputRef.current = "phoneNumber";
                  }}
                  error={!!errors["phoneNumber"]}
                  helperText={
                    errors["phoneNumber"] ? errors["phoneNumber"].message : ""
                  }
                  {...register("phoneNumber")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    error={!!errors["roles"]}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={roles}
                    label="Role"
                    onChange={roleHandleOnChange}
                  >
                    {userRoles?.map((role) => {
                      return (
                        <MenuItem key={role?.id} value={role?.id}>
                          {role?.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                {errors?.roles && (
                  <Typography color="error" sx={{ fontSize: "12px" }}>
                    {errors.roles?.message}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Title</InputLabel>
                  <Select
                    error={!!errors["roles"]}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={titles}
                    label="Title"
                    onChange={titleHandleOnChange}
                  >
                    {userTitles?.map((title) => {
                      return (
                        <MenuItem key={title?.id} value={title?.id}>
                          {title?.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>

              {/* <Grid item xs={12} sm={4} sx={{ mb: 1 }}>
              {initial && (
                <div className='images-box'>
                  <div>
                    <img src={s3BaseURL(initial)} alt='initial' style={{ width: '100%' }} />
                  </div>
                </div>
              )}

              <div style={{ marginTop: '20px' }}>
                <Button variant='contained' sx={{ color: 'white' }} onClick={() => handleOpenModal('initial')}>
                  {userById?.id ? 'Update Initial' : 'Add Initial'}
                </Button>
              </div>
              {errors?.initial && (
                <Typography color='error' sx={{ fontSize: '12px' }}>
                  {errors.initial?.message}
                </Typography>
              )}
            </Grid> */}
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button
                onClick={handleClose}
                variant="outlined"
                color="error"
                sx={{ py: "0.5rem", px: "1rem", mt: "1rem", mx: "0.5rem" }}
              >
                Cancel
              </Button>

              <LoadingButton
                variant="contained"
                type="submit"
                className="btn-primary"
                sx={{ py: "0.55rem", px: "1.5rem", mt: "1rem", color: "#fff" }}
              >
                Save
              </LoadingButton>
            </Box>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default AddUserModal;
