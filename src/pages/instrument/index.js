import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import InstrumentTable from "@/components/Instrument/InstrumentsTable/index";
import InstrumentAction from "@/components/Instrument/InstrumentsAction";
import { getInstruments } from "@/api/instrumentApi/index";
import Loader from "@/components/common/Loader/Loader";
import { useQuery } from "react-query";

import {
  setInstrumentModal,
  setInstruments,
  setDeleteInstrumentModal,
  setInstrumentRowSelected,
} from "@/store/instruments/instrumentsSlice";
import { checkPermissions } from "@/utils/utils";
import { useRouter } from "next/router";

const Instruments = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkPermission = checkPermissions(14, user?.roles[0]?.permissions);

    if (!checkPermission) {
      router.push("/404");
    }
  }, [router, user]);

  const dispatch = useDispatch();

  const {
    instruments,
    instrumentModal,
    deleteInstrumentModal,
    instrumentRowSelected,
  } = useSelector((state) => state.instrument);
  const { isLoading } = useQuery({
    queryKey: ["getInstruments"],
    queryFn: getInstruments,
    onSuccess: (res) => {
      dispatch(setInstruments(res));
    },
  });

  const openInstrumentModal = () => {
    dispatch(setInstrumentRowSelected({}));
    dispatch(setInstrumentModal(true));
  };

  const handleCloseDeleteInstrumentModal = () => {
    dispatch(setDeleteInstrumentModal(false));
  };
  return (
    <Box component="main" className="main-content">
      <>
        {isLoading && <Loader />}
        <InstrumentAction
          dispatch={dispatch}
          openInstrumentModal={openInstrumentModal}
        />
        {!isLoading && (
          <InstrumentTable
            row={instruments}
            dispatch={dispatch}
            instrumentModal={instrumentModal}
            deleteInstrumentModal={deleteInstrumentModal}
            handleCloseDeleteInstrumentModal={handleCloseDeleteInstrumentModal}
            instrumentRowSelected={instrumentRowSelected}
            openInstrumentModal={openInstrumentModal}
          />
        )}
      </>
    </Box>
  );
};

export default Instruments;
