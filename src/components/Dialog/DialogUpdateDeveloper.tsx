import { api } from '@/services/api'
import { formatDateToYYYYMMDD } from '@/utils/date'
import { renderIcon } from '@/utils/renderIcon'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Button } from '../Button'
import { Input } from '../Input'
import { Select } from '../Select'
import { SelectItem } from '../Select/SelectItem'

interface Developer {
  id: string
  name: string
  gender: string
  age: string
  dateOfBirth: string
  hobby: string
  levelId: string
  level: any
}

interface DialogUpdateDeveloperProps {
  dataDeveloper: Developer
  refetchData: () => void
}

const updateDeveloperFormSchema = z.object({
  name: z.string({
    required_error: 'O nome é obrigatório',
  }),
  gender: z.string({
    required_error: 'O sexo é obrigatório',
  }),
  age: z.string({
    required_error: 'A idade é obrigatória',
  }),
  dateOfBirth: z.string({
    required_error: 'A data de nascimento é obrigatória',
  }),
  hobby: z.string({
    required_error: 'O hobby é obrigatório',
  }),
  levelId: z.string({
    required_error: 'O nível é obrigatório',
  }),
})

type UpdateDeveloperFormData = z.infer<typeof updateDeveloperFormSchema>

const toastErrorRegister = (message: string) => toast.error(message)
const toastSuccessRegister = (message: string) => toast.success(message)

export function DialogUpdateDeveloper({
  dataDeveloper,
  refetchData,
}: DialogUpdateDeveloperProps) {
  async function handleUpdateDeveloper(data: UpdateDeveloperFormData) {
    const newData = {
      ...data,
      dateOfBirth: new Date(data.dateOfBirth).toISOString(),
      age: Number(data.age),
    }
    try {
      await api.put(`/developers/${dataDeveloper.id}`, newData)
      reset()
      refetchData()
      toastSuccessRegister('Desenvolvedor atualizado com sucesso!')
    } catch (error: any) {
      toastErrorRegister(error.response.data.message)
    }
  }

  const { register, handleSubmit, reset, control } =
    useForm<UpdateDeveloperFormData>({
      resolver: zodResolver(updateDeveloperFormSchema),
      defaultValues: {
        name: dataDeveloper.name,
        gender: dataDeveloper.gender,
        age: dataDeveloper.age,
        dateOfBirth: formatDateToYYYYMMDD(new Date(dataDeveloper.dateOfBirth)),
        hobby: dataDeveloper.hobby,
        levelId: dataDeveloper.levelId,
      },
    })

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>{renderIcon('edit')}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray_900/40" />
        <Dialog.Content className="w-1/3 h-fit bg-white rounded-md p-10 flex flex-col fixed ml-auto top-20 left-1/3 gap-8">
          <Dialog.Title className="flex">
            Atualizar desenvolvedor
            <Dialog.Close className="ml-auto text-blue_300">
              {renderIcon('close')}
            </Dialog.Close>
          </Dialog.Title>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleUpdateDeveloper)}
          >
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center text-base justify-between">
                <label htmlFor="name">Nome:</label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Carlos"
                  {...register('name')}
                />
              </div>
              <div className="flex gap-2 items-center text-base justify-between">
                <label htmlFor="gender">Sexo:</label>
                <Controller
                  render={({ field }) => (
                    <Select
                      placeholder="Selecione o sexo..."
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectItem value="m" text="Masculino" />
                      <SelectItem value="f" text="Feminino" />
                    </Select>
                  )}
                  name="gender"
                  control={control}
                />
              </div>
              <div className="flex gap-2 items-center text-base justify-between">
                <label htmlFor="age" className="flex-1">
                  Idade:
                </label>
                <Input
                  type="number"
                  id="age"
                  placeholder="Digite sua idade"
                  {...register('age')}
                />
              </div>
              <div className="flex gap-2 items-center text-base justify-between">
                <label htmlFor="dateOfBirth" className="flex-1">
                  Data de nascimento:
                </label>
                <Input
                  type="date"
                  id="dateOfBirth"
                  placeholder="Data de Nascimento"
                  {...register('dateOfBirth')}
                />
              </div>
              <div className="flex gap-2 items-center text-base justify-between">
                <label htmlFor="hobby">Hobby:</label>
                <Input
                  type="text"
                  id="hobby"
                  placeholder="Programação"
                  {...register('hobby')}
                />
              </div>
              <div className="flex gap-2 items-center text-base justify-between">
                <label htmlFor="level">Nivel:</label>
                <Controller
                  render={({ field }) => (
                    <Select
                      placeholder="Selecione o nível..."
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectItem
                        key={dataDeveloper.level.id}
                        value={dataDeveloper.level.id}
                        text={dataDeveloper.level.name}
                      />
                    </Select>
                  )}
                  name="levelId"
                  control={control}
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Dialog.Close>
                <Button
                  title="Cancelar"
                  type="button"
                  className="bg-white text-blue_300 border-gray_100"
                />
              </Dialog.Close>
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
