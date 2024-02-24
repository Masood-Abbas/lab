import moment from "moment";
import Button from "@mui/material/Button";
import { BiEditAlt } from "react-icons/bi";
import Tooltip from "@mui/material/Tooltip";
import { setRoleById, setDeleteRoleModal } from "@/store/role/roleSlice";
import { Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const columns = ({ dispatch, openRoleModal, permissions }) => {
  const handleSelectRow = ({ row }) => {
    openRoleModal();
    dispatch(setRoleById(row));
  };

  function filterPermissionsByIds(permissionObjects, ids) {
    return permissionObjects.filter((permission) =>
      ids.includes(permission.id)
    );
  }

  const handleDeleteRoleModal = (row) => {
    dispatch(setRoleById(row));
    dispatch(setDeleteRoleModal(true));
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
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 1,
      renderCell: ({ row }) => <Tooltip title={row?.name}>{row?.name}</Tooltip>,
    },
    // {
    //   key: '4',
    //   field: 'permissions',
    //   headerName: 'Permissions',
    //   minWidth: 150,
    //   flex: 1,
    //   renderCell: ({ row }) => {

    //    const aa= permissions.filter(permission => row?.permission?.includes(permission.id))
    //    (aa)
    //    return <div>{aa?.name}</div>

    // row?.permissions?.map((permission,index)=>{
    //   (permission)
    //   const aa= permissions?.find(permission)
    //   (aa)
    //  <Tooltip key={permission?.name} title={permission?.name}>
    //   <Chip>
    //   {permission?.name}
    //   </Chip>

    //   </Tooltip>
    // })

    // }
    // },
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
      key: "7",
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
              onClick={() => handleDeleteRoleModal(row)}
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
