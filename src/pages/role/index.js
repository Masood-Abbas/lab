import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import RoleTable from "@/components/Role/RoleTable/index";
import RoleActions from "@/components/Role/RoleActions";
import {
  setRoleModal,
  setDeleteRoleModal,
  setRoleById,
  setRoles,
  setPermissions,
} from "@/store/role/roleSlice";
import { useQuery } from "react-query";
import Loader from "@/components/common/Loader/Loader";
import { getPermissions, getRoles } from "@/api/roleApi";
import { useEffect } from "react";
import  { checkPermissions } from "@/utils/utils";
import { useRouter } from "next/router";

const Role = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    roles,
    roleById,
    roleModal,
    deleteRoleModal,
    permissions,
    searchRoleName,
  } = useSelector((state) => state.role);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkPermission = checkPermissions(7, user?.roles[0]?.permissions);

    if (!checkPermission) {
      router.push("/404");
    }
  }, [router, user]);

  useQuery({
    queryKey: ["getPermissions"],
    queryFn: getPermissions,
    onSuccess: (res) => {
      dispatch(setPermissions(res));
    },
  });

  const { isLoading } = useQuery({
    queryKey: ["getRoles"],
    queryFn: getRoles,
    onSuccess: (res) => {
      dispatch(setRoles(res));
    },
    retry: false,
  });

  const openRoleModal = () => {
    dispatch(setRoleById({}));
    dispatch(setRoleModal(true));
  };

  const handleCloseDeleteRoleModal = () => {
    dispatch(setDeleteRoleModal(false));
  };

  return (
    <Box component="main" className="main-content">
      <>
        {isLoading && <Loader />}
        <RoleActions
          dispatch={dispatch}
          openRoleModal={openRoleModal}
          searchRoleName={searchRoleName}
        />
        {!isLoading && (
          <RoleTable
            row={roles}
            dispatch={dispatch}
            roleModal={roleModal}
            deleteRoleModal={deleteRoleModal}
            handleCloseDeleteRoleModal={handleCloseDeleteRoleModal}
            roleById={roleById}
            openRoleModal={openRoleModal}
            permissions={permissions}
          />
        )}
      </>
    </Box>
  );
};

export default Role;
