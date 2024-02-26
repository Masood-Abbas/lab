import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import { Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import {
  BootstrapDialog,
  BootstrapDialogTitle,
} from "@/components/common/DialogTitle/DialogTitle";
import { useMutation, useQueryClient } from "react-query";
import { deleteUser } from "@/api/userApi";

const DeleteUserModal = ({ handleClose, open, userById }) => {
  const { mutate } = useMutation({
    mutationFn: (data) => deleteUser(data),
    onSuccess: (res) => {
      handleClose();
      toast.success(res.message);
    },
  });


  const deleteHandler = () => {
    mutate(userById?.employeeNo);
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
          <Typography sx={{ fontWeight: 600, marginBottom: 1.5 }}>User</Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box sx={{ minWidth: 500 }}>
            <Typography>Are you sure to delete this user?</Typography>
            <Typography>
              <b>Name:</b>
              {userById?.firstName} {userById?.lastName}
              <br />
              <b>Employee Number:</b>
              {userById?.employeeNo}
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

export default DeleteUserModal;
