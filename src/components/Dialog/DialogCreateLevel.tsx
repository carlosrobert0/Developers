import { api } from '@/services/api'
import { renderIcon } from '@/utils/renderIcon'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Button } from '../Button'
import { Input } from '../Input'

interface DialogCreateLevelProps {
  isOpen: boolean
  onCloseDialog: () => void
  refetchData: () => void
}

const createLevelFormSchema = z.object({
  name: z.string({
    required_error: 'O nome é obrigatório',
  }),
})

type CreateLevelFormData = z.infer<typeof createLevelFormSchema>

const toastErrorRegister = (message: string) => toast.error(message)
const toastSuccessRegister = (message: string) => toast.success(message)

export function DialogCreateLevel({
  isOpen,
  onCloseDialog,
  refetchData,
}: DialogCreateLevelProps) {
  const { register, handleSubmit, reset } = useForm<CreateLevelFormData>({
    resolver: zodResolver(createLevelFormSchema),
  })

  async function handleCreateLevel({ name }: CreateLevelFormData) {
    try {
      await api.post('/levels', { name })
      reset()
      refetchData()
      onCloseDialog()
      toastSuccessRegister('Nível criado com sucesso!')
    } catch (error: any) {
      toastErrorRegister(error.response.data.message)
    }
  }

  function handleCloseDialogAndResetForm() {
    reset()
    onCloseDialog()
  }

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray_900/40" />
        <Dialog.Content className="w-1/3 h-fit bg-white rounded-md p-10 flex flex-col fixed ml-auto top-20 left-1/3 gap-8">
          <Dialog.Title className="flex">
            Criar nível
            <button
              onClick={handleCloseDialogAndResetForm}
              className="ml-auto text-blue_300"
            >
              {renderIcon('close')}
            </button>
          </Dialog.Title>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleCreateLevel)}
          >
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center text-base justify-between">
                <label htmlFor="name">Nível:</label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Pleno"
                  {...register('name')}
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                onClick={handleCloseDialogAndResetForm}
                title="Cancelar"
                type="button"
                className="bg-white text-blue_300 border-gray_100"
              />
              <Button
                type="submit"
                title="Salvar"
                className="bg-blue_300 text-white border-blue_300"
              />
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
