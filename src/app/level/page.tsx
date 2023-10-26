'use client'
import { DialogCreateLevel } from '@/components/Dialog/DialogCreateLevel'
import { DialogDeleteLevel } from '@/components/Dialog/DialogDeleteLevel'
import { DialogUpdateLevel } from '@/components/Dialog/DialogUpdateLevel'
import { Input } from '@/components/Input'
import { Pagination } from '@/components/Pagination'
import { ScrollAreaView } from '@/components/ScrollAreaView'
import { useLevelsPerPageAndPageSize } from '@/hooks/useLevelsPerPageAndPageSize'
import { renderIcon } from '@/utils/renderIcon'
import { useEffect, useState } from 'react'

export default function Level() {
  const [isOpenDialogCreateLevel, setIsOpenDialogCreateLevel] = useState(false)
  const [filterLevelForName, setFilterLevelForName] = useState('' as string)
  const [page, setPage] = useState(1)

  function handleOpenDialogCreateLevel() {
    setIsOpenDialogCreateLevel(true)
  }

  function handleCloseDialogCreateLevel() {
    setIsOpenDialogCreateLevel(false)
  }

  const { data, isLoading, refetch } = useLevelsPerPageAndPageSize(page, 5)
  console.log(data)
  const dataFiltered = data?.data?.filter(
    (level: any) =>
      filterLevelForName === '' ||
      level.name.toUpperCase().includes(filterLevelForName.toUpperCase()),
  )

  useEffect(() => {
    refetch()
  }, [page, refetch])

  return (
    <>
      <main className="w-full h-full bg-gray_100 px-24 flex flex-col items-center justify-start gap-4">
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-2xl text-gray_900 font-medium text-center">
            Níveis
          </h1>
          <div className="flex justify-between gap-4 w-full">
            <button
              className="bg-blue_300 rounded-md text-white w-fit p-2"
              onClick={handleOpenDialogCreateLevel}
            >
              {renderIcon('add')}
            </button>
            <Input
              type="text"
              placeholder="Buscar nível"
              value={filterLevelForName}
              onChange={(e) => setFilterLevelForName(e.currentTarget.value)}
            />
          </div>
        </div>
        <table className="w-[920px] border-separate bg-white rounded-lg border-spacing-4">
          <thead>
            <tr className="text-blue_300">
              <th>Nível</th>
              <th>Desenvolvedores</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {isLoading ? (
              <tr>
                <td></td>
                <td>Carregando ...</td>
                <td></td>
              </tr>
            ) : (
              dataFiltered?.map((level: any) => (
                <tr key={level.id}>
                  <td>{level.name}</td>
                  <td>
                    {level?.developers?.length > 0 ? (
                      <ScrollAreaView data={level?.developers} />
                    ) : (
                      ''
                    )}
                  </td>
                  {/* <td>{level.developers?.[0]?.name}</td> */}
                  <td className="flex gap-2 justify-center">
                    <DialogUpdateLevel
                      dataLevel={level}
                      refetchData={refetch}
                    />
                    <DialogDeleteLevel
                      dataLevel={level}
                      refetchData={refetch}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
          {dataFiltered?.length > 0 && (
            <Pagination
              onPageChange={setPage}
              page={Number(data?.page)}
              pageSize={Number(data?.pageSize)}
              total={data?.totalLevels}
            />
          )}
        </table>
      </main>
      <DialogCreateLevel
        isOpen={isOpenDialogCreateLevel}
        onCloseDialog={handleCloseDialogCreateLevel}
        refetchData={refetch}
      />
    </>
  )
}
