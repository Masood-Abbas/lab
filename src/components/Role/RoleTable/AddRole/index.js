import { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Box,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import {
  BootstrapDialog,
  BootstrapDialogTitle,
} from "@/components/common/DialogTitle/DialogTitle";
import { roleSchema } from "@/schema/roleSchema";
import { getAuthorityType } from "@/utils/utils";
import Grid from "@mui/material/Grid";
import { useMutation } from "react-query";
import { createRole, updateRole } from "@/api/roleApi";
import { useQueryClient } from "react-query";

const AddRole = ({
  handleClose,
  open,
  dispatch,
  permissions,
  roleById,
  refetch,
}) => {
  const queryClient = useQueryClient();
  const [checkboxValues, setCheckboxValues] = useState({});
  const [selectedCheckboxIds, setSelectedCheckboxIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const { mutate, isLoading: createLoading } = useMutation({
    mutationFn: (data) => createRole(data),
    onSuccess: (res) => {
      handleClose();
      toast.success(res.message);
      refetch();
    },
  });

  const { mutate: updateRoleData, isLoading: updateLoading } = useMutation({
    mutationFn: (data) => updateRole(data),
    onSuccess: (res) => {
      handleClose();
      toast.success(res.message);
      refetch();
    },
  });

  const {
    watch,
    setValue,
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: {
      name: null,
      locationType: "",
    },
    resolver: yupResolver(roleSchema),
  });
  const name = watch("name");

  useEffect(() => {
    if (roleById?.id) {
      const userPermissionsIds = roleById?.permissions?.map((item) => item?.id);
      setValue("name", roleById?.name);
      setCheckboxValues((prevCheckboxValues) => {
        const updatedCheckboxValues = { ...prevCheckboxValues };
        userPermissionsIds?.forEach((id) => {
          updatedCheckboxValues[id] = true;
        });

        return updatedCheckboxValues;
      });
      setSelectedCheckboxIds(userPermissionsIds || []);
      if (permissions?.length === userPermissionsIds?.length) {
        setSelectAll(true);
      }
    }
  }, [
    setValue,
    permissions?.length,
    roleById?.id,
    roleById?.name,
    roleById?.permissions,
  ]);

  useEffect(() => {
    if (permissions?.length === selectedCheckboxIds?.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedCheckboxIds?.length, permissions?.length]);

  const onSubmit = (item) => {
    const data = {
      name: item?.name,
      permissions: selectedCheckboxIds,
    };
    if (roleById?.id) {
      data.id = roleById?.id;
      updateRoleData(data);
    } else {
      mutate(data);
    }
  };

  const handleCheckboxChange = useCallback(
    (event, id) => {
      const isChecked = event.target.checked;

      setCheckboxValues({
        ...checkboxValues,
        [id]: isChecked,
      });

      if (isChecked) {
        setSelectedCheckboxIds([...selectedCheckboxIds, id]);
      } else {
        setSelectedCheckboxIds(
          selectedCheckboxIds.filter((selectedId) => selectedId !== id)
        );
      }
    },
    [checkboxValues, selectedCheckboxIds]
  );

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    const updatedCheckboxValues = { ...checkboxValues };
    const updatedSelectedCheckboxIds = [];
    permissions?.forEach((permission) => {
      updatedCheckboxValues[permission?.id] = isChecked;
      if (isChecked) {
        updatedSelectedCheckboxIds?.push(permission?.id);
      }
    });
    setCheckboxValues(updatedCheckboxValues);
    setSelectedCheckboxIds(updatedSelectedCheckboxIds);
    setSelectAll(isChecked);
  };

  const checkboxes = permissions?.map((permission) => (
    <FormControlLabel
      key={permission.id}
      control={
        <Checkbox
          checked={checkboxValues[permission.id] || false}
          onChange={(event) => handleCheckboxChange(event, permission.id)}
        />
      }
      label={getAuthorityType(permission.name)}
    />
  ));

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
            {roleById?.id ? "Update Role" : "Create  Role"}
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid item xs={12} sm={6} lg={6}>
                <TextField
                  label="Name"
                  fullWidth
                  focused={name}
                  error={!!errors["name"]}
                  helperText={errors["name"] ? errors["name"].message : ""}
                  {...register("name")}
                />
              </Grid>

              <>
                <Typography sx={{ fontWeight: 600, marginBottom: 1.5, mt: 2 }}>
                  Select Your Desire Permissions
                </Typography>

                <FormControlLabel
                  control={
                    <Checkbox checked={selectAll} onChange={handleSelectAll} />
                  }
                  label={
                    <span className="select-all-checkbox">Select All</span>
                  }
                />
                <FormGroup row>{checkboxes}</FormGroup>
              </>

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
                  sx={{
                    py: "0.55rem",
                    px: "1.5rem",
                    mt: "1rem",
                    color: "#fff",
                  }}
                  loading={updateLoading || createLoading}
                >
                  Save
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default AddRole;
