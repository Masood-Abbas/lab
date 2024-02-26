import moment from "moment";
import { BiEditAlt } from "react-icons/bi";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  setRequestById,
  setDeleteRequestModal,
} from "@/store/request/requestSlice";
import { Chip } from "@mui/material";

export const columns = () => {
  
  return [
    {
      key: "1",
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      width: 50,
    },
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
                label="In Progress"
                sx={{
                  backgroundColor: "purple",
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
      field: "Pdf Name",
      headerName: "Pdf Name",
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        {
          return <>{row?.pdfName ? row?.pdfName : "-"}</>;
        }
      },
    },
    {
      key: "3",
      field: "createdAt",
      headerName: "Created At",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        return <>{moment(row?.createdAt).format("MM-DD-YYYY HH:mm:ss")}</>;
      },
    },
   
  ];
};
