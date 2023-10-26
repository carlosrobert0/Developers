import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export function useDevelopersPerPageAndPageSize(
  page: number,
  pageSize: number,
) {
  async function getDevelopersPerPageAndPageSize() {
    try {
      const { data } = await api.get(
        `/developers?page=${page}&pageSize=${pageSize}`,
      )

      return data
    } catch (error: any) {
      console.log(error.response.data.message)
    }
  }

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['developers'],
    queryFn: getDevelopersPerPageAndPageSize,
  })

  return {
    isLoading,
    data,
    refetch,
  }
}
