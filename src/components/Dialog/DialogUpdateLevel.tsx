import { api } from '@/services/api'
import { renderIcon } from '@/utils/renderIcon'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Button } from '../Button'
import { Input } from '../Input'

interface Level {
  id: string
  name: string
  createdAt: Date
  developers: any[]
}
interface DialogUpdateLevelProps {
  dataLevel: Level
  refetchData: () => void
}

export function DialogUpdateLevel({
  dataLevel,
  refetchData,
}: DialogUpdateLevelProps) {
  const updateLevelFormSchema = z.object({
    name: z.string({
      required_error: 'O nome é obrigatório',
    }),
  })

  type UpdateLevelFormData = z.infer<typeof updateLevelFormSchema>

  const toastErrorRegister = (message: string) => toast.error(message)
  const toastSuccessRegister = (message: string) => toast.success(message)

  async function handleUpdateLevel({ name }: UpdateLevelFormData) {
    try {
      await api.put(`/levels/${dataLevel.id}`, { name })
      reset()
      refetchData()
      toastSuccessRegister('Nível atualizado com sucesso!')
    } catch (error: any) {
      toastErrorRegister(error.response.data.message)
    }
  }

  const { register, handleSubmit, reset, setValue } =
    useForm<UpdateLevelFormData>({
      resolver: zodResolver(updateLevelFormSchema),
    })

  useEffect(() => {
    setValue('name', dataLevel?.name ?? '')
  }, [dataLevel, setValue])

  return (
    <Dialog.Root>
      <Dialog.Trigger>{renderIcon('edit')}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray_900/40" />
        <Dialog.Content className="w-1/3 h-fit bg-white rounded-md p-10 flex flex-col fixed ml-auto top-20 left-1/3 gap-8">
          <Dialog.Title className="flex">
            Atualizar nível
            <Dialog.Close className="ml-auto text-blue_300">
              {renderIcon('close')}
            </Dialog.Close>
          </Dialog.Title>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleUpdateLevel)}
          >
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center text-base justify-between">
                <label htmlFor="name">Nível:</label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Nome"
                  {...register('name')}
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Dialog.Close>
                <Button
                  title="Cancelar"
                  className="bg-white text-blue_300 border-gray_100"
                />
              </Dialog.Close>
              <Button
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
