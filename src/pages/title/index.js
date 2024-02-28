import { useDispatch, useSelector } from "react-redux";
import {
  setTitleModal,
  setTitles,
  setDeleteTitleModal,
} from "@/store/title/titleSlice";
import Table from "@/components/Title/TitleTable/index";
import Box from "@mui/material/Box";
import TitleActions from "@/components/Title/TitleActions/index";
import { useQuery } from "react-query";
import { getTitle } from "@/api/titleApi/index";
import Loader from "@/components/common/Loader/Loader";
import { checkPermissions } from "@/utils/utils";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Titles = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { titles, titleModal, deleteTitleModal, titleRowSelected } =
    useSelector((state) => state.title);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const checkPermission = checkPermissions(10, user?.roles[0]?.permissions);

    if (!checkPermission) {
      router.push("/404");
    }
  }, [router, user]);

  const { isLoading,refetch } = useQuery({
    queryKey: ["getTitles"],
    queryFn: getTitle,
    onSuccess: (res) => {
      dispatch(setTitles(res));
    },
  });

  const openTitleModal = () => {
    dispatch(setTitleModal(true));
  };

  const handleCloseDeleteTitleModal = () => {
    dispatch(setDeleteTitleModal(false));
  };

  return (
    <Box component="main" className="main-content">
      <>
        {isLoading && <Loader />}
        <TitleActions dispatch={dispatch} openTitleModal={openTitleModal} />
        {!isLoading && (
          <Table
            row={titles}
            dispatch={dispatch}
            titleModal={titleModal}
            deleteTitleModal={deleteTitleModal}
            handleCloseDeleteTitleModal={handleCloseDeleteTitleModal}
            titleRowSelected={titleRowSelected}
            openTitleModal={openTitleModal}
            refetch={refetch}
          />
        )}
      </>
    </Box>
  );
};

export default Titles;
