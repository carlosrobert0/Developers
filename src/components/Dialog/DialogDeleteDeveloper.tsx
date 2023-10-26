import { api } from '@/services/api'
import { renderIcon } from '@/utils/renderIcon'
import * as Dialog from '@radix-ui/react-dialog'
import { toast } from 'react-toastify'
import { Button } from '../Button'

interface Developer {
  id: string
  name: string
}

interface DialogDeleteDeveloperProps {
  dataDeveloper: Developer
  refetchData: () => void
}

const toastErrorRegister = (message: string) => toast.error(message)
const toastSuccessRegister = (message: string) => toast.success(message)

export function DialogDeleteDeveloper({
  dataDeveloper,
  refetchData,
}: DialogDeleteDeveloperProps) {
  async function handleDeleteDeveloper(id: string) {
    try {
      await api.delete(`/developers/${id}`)
      refetchData()
      toastSuccessRegister('Desenvolvedor deletado com sucesso!')
    } catch (error: any) {
      toastErrorRegister(error.response.data.message)
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>{renderIcon('delete')}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray_900/40" />
        <Dialog.Content className="w-1/3 h-fit bg-white rounded-md p-10 flex flex-col fixed ml-auto top-20 left-1/3 gap-8">
          <Dialog.Description>
            {' '}
            Tem certeza que deseja deletar o desenvolvedor {dataDeveloper?.name}
            ?{' '}
          </Dialog.Description>
          <div className="flex gap-2 justify-end">
            <Dialog.Close>
              <Button
                title="Cancelar"
                type="button"
                className="bg-white text-blue_300 border-gray_100"
              />
            </Dialog.Close>
            <Dialog.Close>
              <Button
                type="button"
                onClick={() => handleDeleteDeveloper(dataDeveloper.id)}
                title="Deletar"
                className="bg-blue_300 text-white border-blue_300"
              />
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
