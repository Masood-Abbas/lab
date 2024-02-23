import TableEmpty from "@/components/common/TableEmpty"
import RequestTable from "@/components/request/RequestTable/index";
import RequestAction from "@/components/request/RequestAction";
import {
    setRequestModal,
    setDeleteRequestModal,
    setRequestById,
    setRequests,
  } from "@/store/request/requestSlice";
  import { useQuery } from "react-query";
  import { getBasicDetailOfPatient } from "@/api/requestApi/reqest";
  import Loader from "@/components/common/Loader/Loader";
  import { useDispatch, useSelector } from "react-redux";
  import Box from "@mui/material/Box";

const DashboardTable = () =>{
   const dispatch = useDispatch();

  const { requests, requestModal, deleteRequestModal, requestById } =
    useSelector((state) => state.request);  

  const { isLoading } = useQuery({
    queryKey: ["getBasicDetailOfPatients"],
    queryFn: getBasicDetailOfPatient,
    onSuccess: (res) => {
      dispatch(setRequests(res));
    },
  });

  const openRequestModal = () => {
    dispatch(setRequestById({}));
    dispatch(setRequestModal(true));
  };

  const handleCloseDeleteRequestModal = () => {
    dispatch(setDeleteRequestModal(false));
  };
    return (
        <Box component="main" className="main-content">
      <>
        {isLoading && <Loader />}
        <RequestAction
          dispatch={dispatch}
          openRequestModal={openRequestModal}
        />
        {!isLoading && (
          <RequestTable
            row={requests}
            dispatch={dispatch}
            requestModal={requestModal}
            deleteInstrumentModal={deleteRequestModal}
            handleCloseDeleteInstrumentModal={handleCloseDeleteRequestModal}
            requestById={requestById}
            openRequestModal={openRequestModal}
          />
        )}
      </>
    </Box>
    )
}

export default DashboardTable