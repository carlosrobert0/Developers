'use client'
import { DialogCreateDeveloper } from '@/components/Dialog/DialogCreateDeveloper'
import { DialogDeleteDeveloper } from '@/components/Dialog/DialogDeleteDeveloper'
import { DialogUpdateDeveloper } from '@/components/Dialog/DialogUpdateDeveloper'
import { Input } from '@/components/Input'
import { Pagination } from '@/components/Pagination'
import { useDevelopersPerPageAndPageSize } from '@/hooks/useDevelopersPerPageAndPageSize'
import { useLevelsPerPageAndPageSize } from '@/hooks/useLevelsPerPageAndPageSize'
import { renderIcon } from '@/utils/renderIcon'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function Home() {
  const [isOpenDialogCreateDeveloper, setIsOpenDialogCreateDeveloper] =
    useState(false)
  const [filterDeveloperForName, setFilterDeveloperForName] = useState(
    '' as string,
  )
  const [page, setPage] = useState(1)

  function handleOpenDialogCreateDeveloper() {
    setIsOpenDialogCreateDeveloper(true)
  }

  function handleCloseDialogCreateDeveloper() {
    setIsOpenDialogCreateDeveloper(false)
  }

  const { data: dataLevel } = useLevelsPerPageAndPageSize(1, 100)

  const { data, isLoading, refetch } = useDevelopersPerPageAndPageSize(page, 5)

  const dataFiltered = data?.data?.filter(
    (developer: any) =>
      filterDeveloperForName === '' ||
      developer.name
        .toUpperCase()
        .includes(filterDeveloperForName.toUpperCase()),
  )

  const toastErrorRegister = (message: string) => toast.error(message)

  useEffect(() => {
    refetch()
  }, [page, refetch])

  return (
    <>
      <main className="w-full h-full bg-gray_100 px-24 flex flex-col items-center justify-start gap-4">
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-2xl text-gray_900 font-medium text-center">
            Devs
          </h1>
          <div className="flex justify-between gap-4 w-full">
            <button
              onClick={
                dataLevel?.data?.length > 0
                  ? () => handleOpenDialogCreateDeveloper()
                  : () =>
                      toastErrorRegister(
                        'É necessário ter pelo menos um nível cadastrado',
                      )
              }
              className="bg-blue_300 rounded-md text-white w-fit p-2"
            >
              {renderIcon('add')}
            </button>
            <Input
              type="text"
              placeholder="Buscar desenvolvedor"
              value={filterDeveloperForName}
              onChange={(e) => setFilterDeveloperForName(e.currentTarget.value)}
            />
          </div>
        </div>
        <table className="w-[920px] border-separate bg-white rounded-lg border-spacing-4">
          <thead>
            <tr className="text-blue_300">
              <th>Nome</th>
              <th>Sexo</th>
              <th>Data de Nascimento</th>
              <th>Idade</th>
              <th>Hobby</th>
              <th>Nivel</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {isLoading ? (
              <tr>
                <td width="10%"></td>
                <td width="10%"></td>
                <td width="10%"></td>
                <td width="30%">Carregando ...</td>
                <td width="10%"></td>
                <td width="10%"></td>
                <td width="10%"></td>
              </tr>
            ) : (
              dataFiltered?.map((developer: any) => {
                const dateOfBirthFormatted = new Date(
                  developer.dateOfBirth,
                ).toLocaleDateString()
                return (
                  <tr key={developer.id}>
                    <td>{developer.name}</td>
                    <td>{developer.gender}</td>
                    <td>{`${dateOfBirthFormatted}`}</td>
                    <td>{developer.age}</td>
                    <td>{developer.hobby}</td>
                    <td>{developer.level.name}</td>
                    <td className="flex gap-2 justify-center">
                      <DialogUpdateDeveloper
                        dataDeveloper={developer}
                        refetchData={refetch}
                      />
                      <DialogDeleteDeveloper
                        dataDeveloper={developer}
                        refetchData={refetch}
                      />
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
          {dataFiltered?.length > 0 && (
            <Pagination
              onPageChange={setPage}
              page={Number(data?.page)}
              pageSize={Number(data?.pageSize)}
              total={data?.totalDevelopers}
            />
          )}
        </table>
      </main>
      <DialogCreateDeveloper
        isOpen={isOpenDialogCreateDeveloper}
        onCloseDialog={handleCloseDialogCreateDeveloper}
        refetchData={refetch}
      />
    </>
  )
}
