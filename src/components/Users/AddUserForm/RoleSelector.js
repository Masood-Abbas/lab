import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useMemo, useState } from "react";

import { setDeletedAssignRole } from "@/store/user/userSlice";
import { setAllPermissionsOfRole } from "@/store/role/roleSlice";

const RoleSelector = ({
  setValue,
  error,
  roles,
  clearErrors,
  userById,
  dispatch,
  userRole,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (event, newValue) => {
    const selectedIds = newValue.map((option) => option.id);
    setSelectedOptions(newValue);
    selectedIds, "0";
    setValue("roles", selectedIds);
  };

  return (
    <Autocomplete
      multiple
      id="multiple-options"
      options={userRole}
      value={selectedOptions}
      onChange={handleChange}
      getOptionLabel={(option) => option?.name}
      renderInput={(params) => (
        <TextField
          focused={userRole?.length}
          error={!userRole?.length && !!error}
          helperText={userRole?.length > 0 ? "" : error}
          {...params}
          label="Assign Roles"
          placeholder="Select Roles"
        />
      )}
    />
  );
};

export default RoleSelector;
