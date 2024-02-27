import { DataGrid } from "@mui/x-data-grid";
import { columns } from "@/components/approvedRequests/table/columns";
import TableEmpty from "@/components/common/TableEmpty";

import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";
import { getReport } from "@/api/workflowInboxApi";
const ApprovedRequestTable = ({ row }) => {
  const router = useRouter();

  const { mutate: downloadReport } = useMutation({
    mutationFn: (data) => getReport(data),
    
  });

  const [sortModel, setSortModel] = useState([
    {
      field: "name",
      sort: "asc",
    },
  ]);

  const handleApproveOnRow = (params) => {
    const data={
      name:params?.pdfName
    }
    downloadReport(data)
  };

  return (
    <>
      <div style={{ height: "70vh", width: "100%" }}>
        <DataGrid
          components={{
            NoRowsOverlay: TableEmpty,
          }}
          rows={row}
          sx={{ cursor: "pointer" }}
          columns={columns({handleApproveOnRow})}
          rowLength={100}
          rowsPerPageOptions={[15]}
          sortModel={sortModel}
          onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
          pageSize={15}
          rowCount={row?.length}
          pagination={false}
          className="hide-pagination"
          
        />
      </div>
    </>
  );
};

export default ApprovedRequestTable;
