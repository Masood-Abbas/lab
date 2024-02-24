import moment from "moment";
import Button from "@mui/material/Button";
import {
  setTitleRowSelected,
  setDeleteTitleModal,
} from "@/store/title/titleSlice";
import { BiEditAlt } from "react-icons/bi";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";

export const columns = ({
  dispatch,
  openTitleModal,
  updateTitlePermission,
  deleteTitlePermission,
}) => {
  const handleSelectRow = ({ row }) => {
    openTitleModal();
    dispatch(setTitleRowSelected(row));
  };

  const handleDeleteTitleModal = (row) => {
    dispatch(setTitleRowSelected(row));
    dispatch(setDeleteTitleModal(true));
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
          return <>{row?.name}</>;
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
            <IconButton
              disabled={!deleteTitlePermission}
              onClick={() => handleDeleteTitleModal(row)}
            >
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
            <IconButton
              disabled={!updateTitlePermission}
              onClick={() => handleSelectRow(row)}
            >
              <BiEditAlt sx={{ color: "primary" }} />
            </IconButton>
          </>
        );
      },
    },
  ];
};
