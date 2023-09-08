import Loader from '@/components/common/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import Table from '@/components/Role/RoleTable/index'
import Box from '@mui/material/Box'
import RoleActions from '@/components/Role/RoleActions'
import { useEffect, useMemo,useState } from 'react'
import { useGetRoles } from '@/api/roleApi'
import { setSearchRole, setRoleModal, setRoles, setRoleRowSelected ,setRolePage} from '@/store/role/roleSlice'
import { useDebounce } from 'ahooks'
import { useRouter } from 'next/router'
import { FileOperationsEnum } from '@/utils/constants'
import { checkUserAssignPermissions } from '@/utils/utils'

const Roles = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [skip,setSkip]=useState(0)
  const [totalRows, setTotalRows] = useState(0)
  const { userPermissions } = useSelector(state => state.auth)
  const { roles, searchRoleName } = useSelector(state => state.role)
  const debounce = useDebounce(searchRoleName, { wait: 500 })

  const searchParam = useMemo(() => {
    return { 
      name: debounce,
      skip
    }
  }, [debounce,skip])

  const { isLoading: getLoading, refetch } = useGetRoles({
    params: searchParam,
    onSuccess: response => {
      setTotalRows(response?.count)
      dispatch(setRoles(response?.records))
    }
  })

  useEffect(() => {
    return () => {
      dispatch(setSearchRole(''))
    }
  }, [dispatch])

  const handleRoleModalOpen = () => {
    dispatch(setRoleModal(true))
    dispatch(setRoleRowSelected(''))
  }

  useEffect(() => {
    return () => {     
      dispatch(setRolePage(1))
    };
  }, [dispatch]);


  useEffect(() => {
    let view_role = checkUserAssignPermissions(FileOperationsEnum?.VIEW_ROLES, userPermissions)

    if (!view_role) {
      router.push('/404')
    }
  }, [router, userPermissions])

  return (
    <Box component='main' className='main-content'>
      {getLoading && <Loader />}
      {!getLoading && (
        <>
          <RoleActions 
          searchRoleName={searchRoleName}
          dispatch={dispatch} 
          handleRoleModalOpen={handleRoleModalOpen}
          setSkip={setSkip}
          />
          <Table 
          handleRoleModalOpen={handleRoleModalOpen}
          dispatch={dispatch} 
          row={roles}
          refetch={refetch} 
          setSkip={setSkip}
          totalRows={totalRows}
            />
        </>
      )}
    </Box>
  )
}

export default Roles
