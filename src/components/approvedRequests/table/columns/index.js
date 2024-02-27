import moment from "moment";
import { BiEditAlt } from "react-icons/bi";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  setRequestById,
  setDeleteRequestModal,
} from "@/store/request/requestSlice";
import { Chip, IconButton } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

export const columns = ({ handleApproveOnRow }) => {
  return [
    {
      key: "2",
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        {
          return (
            <>
              {" "}
              {row?.firstName} {row?.lastName}
            </>
          );
        }
      },
    },
    {
      key: "6",
      field: "phoneNumber",
      headerName: "Phone Number",
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        {
          return <> {row?.phoneNumber} </>;
        }
      },
    },
    {
      key: "4",
      field: "CNIC",
      headerName: "CNIC",
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        {
          return <> {row?.CNIC} </>;
        }
      },
    },
    {
      key: "4",
      field: "gender",
      headerName: "Gender",
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        {
          return <> {row?.gender} </>;
        }
      },
    },
    {
      key: "7",
      field: "test",
      headerName: "Test",
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        {
          return <> {row?.test} </>;
        }
      },
    },
    {
      key: "8",
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        {
          return <> {row?.email} </>;
        }
      },
    },
    {
      key: "30",
      field: "age",
      headerName: "Age",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        return <>{row?.age}</>;
      },
    },
    {
      key: "9",
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        {
          return (
            <>
              <Chip
                label="Done"
                sx={{
                  backgroundColor: "green",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            </>
          );
        }
      },
    },
    {
      key: "19",
      field: "Download Requests",
      headerName: "Download Requests",
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <>
            <IconButton onClick={() => handleApproveOnRow(row)}>
              <CloudDownloadIcon sx={{ color: "blue", fontSize: "2.5rem" }} />
            </IconButton>
          </>
        );
      },
    },
  ];
};
