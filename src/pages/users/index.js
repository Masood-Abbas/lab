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

const Users = () => {
  const query=useQueryClient()
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { roles } = useSelector((state) => state.role);
  const { titles } = useSelector((state) => state.title);

  useQuery({
    queryKey: ["getRoles"],
    queryFn: getUser,
    onSuccess: (res) => {
      dispatch(setUsers(res));
    },
  });

useEffect(()=>{
query.invalidateQueries('getRoles')
},[query])

  // useQuery({
  //   queryKey: ["getRoles"],
  //   queryFn: getRoles,
  //   onSuccess: (res) => {
  //     dispatch(setRoles(res));
  //   },
  // });

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
      <Table row={users} roles={roles} titles={titles} />
    </div>
  );
};

export default Users;
