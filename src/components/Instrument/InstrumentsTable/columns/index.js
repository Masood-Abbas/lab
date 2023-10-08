import moment from "moment";
import { BiEditAlt } from "react-icons/bi";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  setRequestById,
  setDeleteRequestModal,
} from "@/store/request/requestSlice";

export const columns = ({ dispatch, openRequestModal }) => {
  const handleSelectRow = ({ row }) => {
    openRequestModal(true);
    dispatch(setRequestById(row));
  };
  const handleDeleteInstrumentModal = (row) => {
    dispatch(setRequestById(row));
    dispatch(setDeleteRequestModal(true));
  };
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
              {row?.firstName} {row?.lastName}{" "}
            </>
          );
        }
      },
    },
    {
      key: "3",
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
      key: "6",
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
      key: "8",
      field: "CNIC",
      headerName: "CNIC",
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        {
          return <> {row?.CNIC} </>;
        }
      },
    },{
      key: "9",
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
      key: "4",
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
    {
      key: "5",
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      sortable: false,
      minWidth: 150,
      flex: 1,
      disableClickEventBubbling: true,
      align: "center",
      renderCell: ({ row }) => {
        return (
          <>
            <DeleteIcon
              size={20}
              sx={{ color: "red" }}
              onClick={() => handleDeleteInstrumentModal(row)}
            />
            {/* <BiEditAlt
              size={20}
              sx={{ color: "primary" }}
              onClick={() => handleSelectRow({ row })}
            /> */}
          </>
        );
      },
    },
  ];
};
