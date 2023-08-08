import { useQuery } from 'react-query'
import api from '@/utils/axios'

// ** API to get all permissions

const getPermission = () => api.get('/permission')

export const useGetPermission = ({ onSuccess, onError }) => {
  return useQuery('getPermission', getPermission, {
    onSuccess,
    onError,
    select: data => data.data,
    retry: false,
    refetchOnWindowFocus: false
  })
}
