import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import RoleTable from "@/components/Role/RoleTable/index"
import RoleActions from "@/components/Role/RoleActions";
import {
  setRoleModal,
  setDeleteRoleModal,
  setRoleById,
  setRoles,
  setPermissions
} from "@/store/role/roleSlice";
import {  useQuery } from "react-query";
import Loader from "@/components/common/Loader/Loader";
import { getPermissions, getRoles, searchRoles } from "@/api/roleApi";
// import { useDebounce } from 'ahooks'
import { useEffect,useMemo } from "react";

const Role = () => {
  const dispatch = useDispatch();

  const { roles, roleById, roleModal, deleteRoleModal,permissions,searchRoleName } =
    useSelector((state) => state.role);

  //   const debounce = useDebounce(searchRoleName, { wait: 500 })



  // const searchParam = useMemo(() => {
  //   return { 
  //     name: debounce,
  //   }
  // }, [debounce])

  // console.log(searchParam)

//  const {mutate}= useMutation({ 
//     mutationKey: ["searchRoles"],
//     mutationFn: (data)=>searchRoles(data),
//     onSuccess: (res) => {
//       console.log(res)
//       dispatch(setRoles(res?.roles))
//     },
//   });

//   useEffect(()=>{
//     mutate(searchParam)
//   },[searchParam,mutate])

  

  useQuery({ 
    queryKey: ["getPermissions"],
    queryFn: getPermissions,
    onSuccess: (res) => {
      console.log(res)
      dispatch(setPermissions(res))
    },
  });

  const { isLoading } = useQuery({ 
    queryKey: ["getRoles"],
    queryFn  : getRoles,
    onSuccess: (res) => {
      console.log(res)
      dispatch(setRoles(res))
    },
    //  enabled: searchParam?.name!=='' 
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
