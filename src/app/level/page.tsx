'use client'
import { DialogCreateLevel } from '@/components/Dialog/DialogCreateLevel'
import { Input } from '@/components/Input'
import { renderIcon } from '@/utils/renderIcon'
import { useState } from 'react'

export default function Level() {
  const [isOpenDialogCreateLevel, setIsOpenDialogCreateLevel] = useState(false)

  function handleOpenDialogCreateLevel() {
    setIsOpenDialogCreateLevel(true)
  }

  function handleCloseDialogCreateLevel() {
    setIsOpenDialogCreateLevel(false)
  }

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
            <Input type="text" placeholder="Buscar nível" />
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
            <tr>
              <td>Pleno</td>
              <td>Carlos</td>
              <td className="flex gap-2 justify-center">
                {renderIcon('edit')}
                {renderIcon('delete')}
              </td>
            </tr>
          </tbody>
        </table>
      </main>
      <DialogCreateLevel
        isOpen={isOpenDialogCreateLevel}
        onCloseDialog={handleCloseDialogCreateLevel}
      />
    </>
  )
}
