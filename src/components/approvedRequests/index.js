import { DataGrid } from "@mui/x-data-grid";
import { columns } from "@/components/approvedRequests/table/columns";
import TableEmpty from "@/components/common/TableEmpty";

import { useRouter } from "next/router";
import { useState } from "react";
const ApprovedRequestTable = ({ row }) => {
  const router = useRouter();

  const [sortModel, setSortModel] = useState([
    {
      field: "name",
      sort: "asc",
    },
  ]);

  return (
    <>
      <div style={{ height: "70vh", width: "100%" }}>
        <DataGrid
          components={{
            NoRowsOverlay: TableEmpty,
          }}
          rows={row}
          sx={{ cursor: "pointer" }}
          columns={columns()}
          rowLength={100}
          rowsPerPageOptions={[15]}
          sortModel={sortModel}
          onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
          pageSize={15}
          rowCount={row?.length}
          pagination={false}
          className="hide-pagination"
          onRowClick={(params) => {
            router.push(`/request/patientDetail/${params.row.id}`);
          }}
        />
      </div>
    </>
  );
};

export default ApprovedRequestTable;
