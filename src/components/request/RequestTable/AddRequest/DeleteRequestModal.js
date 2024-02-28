import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Box, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  BootstrapDialog,
  BootstrapDialogTitle,
} from "@/components/common/DialogTitle/DialogTitle";
import { useMutation, useQueryClient } from "react-query";
import { deleteBasicDetailOfPatient } from "@/api/requestApi/reqest";
import { setRequests } from "@/store/request/requestSlice";

const DeleteRequestModal = ({ handleClose, open, requestById, refetch }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => deleteBasicDetailOfPatient(data),
    onSuccess: (res) => {
      toast.success(res.message);
      handleClose();
      refetch();
    },
  });

  const deleteHandler = () => {
    mutate(requestById?.id);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography sx={{ fontWeight: 600, marginBottom: 1.5 }}>
            Patient Basic Detail Remove
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box sx={{ minWidth: 500 }}>
            <Typography>
              Are you sure to delete this patient basic delete?
            </Typography>
            <Typography>
              <b>Name:</b>
              {requestById?.firstName} {requestById?.lastName}
              <br />
              <b>ID:</b>
              {requestById?.id}
              <br />
              <b>Test:</b>
              {requestById?.test}
              <br />
              <b>Gender:</b>
              {requestById?.gender}
              <br />
              <b>Email:</b>
              {requestById?.email}
              <br />
              <b>Phone Number:</b>
              {requestById?.phoneNumber}
            </Typography>

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
                onClick={deleteHandler}
                loading={isLoading}
              >
                Confirm
              </LoadingButton>
            </Box>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default DeleteRequestModal;
