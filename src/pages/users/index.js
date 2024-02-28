import { useEffect } from "react";
import { Box } from "mdi-material-ui";
import { useDispatch, useSelector } from "react-redux";
import { setFilterUser, setUsers } from "@/store/user/userSlice";
import Table from "@/components/Users/UserTable/index";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { setRoles } from "@/store/role/roleSlice";
import { getRoles } from "@/api/roleApi";
import { setTitles } from "@/store/title/titleSlice";
import { getTitle } from "@/api/titleApi/index";
import { getUser } from "@/api/userApi/index";
import useUserDataFetch, { checkPermissions } from "@/utils/utils";
import { useRouter } from "next/router";
import Loader from "@/components/common/Loader/Loader";

const Users = () => {
  const query = useQueryClient();
  const router = useRouter();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { roles } = useSelector((state) => state.role);
  const { titles } = useSelector((state) => state.title);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkPermission = checkPermissions(4, user?.roles[0]?.permissions);

    if (!checkPermission) {
      router.push("/404");
    }
  }, [router, user]);

  const { isLoading,refetch } = useQuery({
    queryKey: ["getUsers"],
    queryFn: getUser,
    onSuccess: (res) => {
      dispatch(setUsers(res));
    },
  });

  useQuery({
    queryKey: ["getRoles"],
    queryFn: getRoles,
    onSuccess: (res) => {
      dispatch(setRoles(res));
    },
  });

  useQuery({
    queryKey: ["getTitles"],
    queryFn: getTitle,
    onSuccess: (res) => {
      dispatch(setTitles(res));
    },
  });

  return (
    <div
      component="main"
      className="main-content"
      style={{ fontSize: 30, paddingTop: "30px" }}
    >
      {isLoading && <Loader />}
      <Table row={users} roles={roles} titles={titles} refetch={refetch}/>
    </div>
  );
};

export default Users;
