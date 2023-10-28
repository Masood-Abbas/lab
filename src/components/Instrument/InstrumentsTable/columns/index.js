import moment from "moment";
import { BiEditAlt } from "react-icons/bi";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  setInstrumentRowSelected,
  setDeleteInstrumentModal,
} from "@/store/instruments/instrumentsSlice";

export const columns = ({ dispatch, openInstrumentModal }) => {
  const handleSelectRow = ({ row }) => {
    openInstrumentModal();
    dispatch(setInstrumentRowSelected(row));
  };
  const handleDeleteInstrumentModal = (row) => {
    dispatch(setInstrumentRowSelected(row)); 
    dispatch(setDeleteInstrumentModal(true));
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
              {row?.name}
            </>
          );
        }
      },
    },
    {
      key: "3",
      field: "quantity",
      headerName: "Quantity",
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => {
        {
          return (
            <>
              {" "}
              {row?.quantity}
            </>
          );
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
            <BiEditAlt
              size={20}
              sx={{ color: "primary" }}
              onClick={() => handleSelectRow({ row })}
            />
          </>
        );
      },
    },
  ];
};
