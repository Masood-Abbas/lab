import { setUser } from "@/store/auth/authSlice";
import { FileOperationsEnum, allPermissions } from "@/utils/constants";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

const authoritiesMap = new Map([
  [FileOperationsEnum.ADD_USER, "Add User"],
  [FileOperationsEnum.UPDATE_USER, "Edit Users"],
  [FileOperationsEnum.VIEW_USER, "View Users"],
  [FileOperationsEnum.DELETE_USER, "Delete Users"],
  [FileOperationsEnum.ADD_ROLE, "Add Role"],
  [FileOperationsEnum.UPDATE_ROLE, "Edit Role"],
  [FileOperationsEnum.VIEW_ROLE, "View Role"],
  [FileOperationsEnum.DELETE_ROLE, "Delete Role"],
]);

const defaultAuthority = (value) => value;

export const getAuthorityType = (value) => {
  return authoritiesMap.get(value) ?? defaultAuthority(value);
};

export const saveToLocalStorage = (key, value) => {
  if (typeof window !== undefined) {
    localStorage.setItem(key, value);
  }
};

export const getFromLocalStorage = (key) => {
  if (typeof window !== undefined) {
    return localStorage.getItem(key);
  }

  return null;
};

const useUserDataFetch = () => {
  const dispatch = useDispatch();
  const fetchData = async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/user/${email}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      dispatch(setUser(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const email = getFromLocalStorage("appEmail");

    fetchData(email);
  }, [fetchData]);
};

export default useUserDataFetch;

export const checkPermissions = (permissionId, allPermissions) => {
  return allPermissions?.some(
    (permission) => permission === permissionId
  );
};

