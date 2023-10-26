import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export function useLevelsPerPageAndPageSize(page: number, pageSize: number) {
  async function getLevelsPerPageAndPageSize() {
    try {
      const { data } = await api.get(
        `/levels?page=${page}&pageSize=${pageSize}`,
      )

      return data
    } catch (error: any) {
      console.log(error.response.data.message)
    }
  }

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['levels'],
    queryFn: getLevelsPerPageAndPageSize,
  })

  return {
    isLoading,
    data,
    refetch,
  }
}
