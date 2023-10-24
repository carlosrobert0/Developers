import { renderIcon } from '@/utils/renderIcon'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '../Button'
import { Input } from '../Input'
import { Select } from '../Select'
import { SelectItem } from '../Select/SelectItem'

interface DialogCreateDeveloperProps {
  isOpen: boolean
  onCloseDialog: () => void
}

export function DialogCreateDeveloper({
  isOpen,
  onCloseDialog,
}: DialogCreateDeveloperProps) {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray_900/40" />
        <Dialog.Content className="w-1/3 h-fit bg-white rounded-md p-10 flex flex-col fixed ml-auto top-20 left-1/3 gap-8">
          <Dialog.Title className="flex">
            Criar desenvolvedor
            <button onClick={onCloseDialog} className="ml-auto text-blue_300">
              {renderIcon('close')}
            </button>
          </Dialog.Title>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center text-base justify-between">
                <label htmlFor="name">Nome:</label>
                <Input type="text" id="name" placeholder="Nome" />
              </div>
              <div className="flex gap-2 items-center text-base justify-between">
                <label htmlFor="gender">Sexo:</label>
                <Select placeholder="Selecione o sexo...">
                  <SelectItem value="m" text="Masculino" />
                  <SelectItem value="f" text="Feminino" />
                </Select>
              </div>
              <div className="flex gap-2 items-center text-base justify-between">
                <label htmlFor="birthDate" className="flex-1">
                  Data de nascimento:
                </label>
                <Input
                  type="date"
                  id="birthDate"
                  placeholder="Data de Nascimento"
                />
              </div>
              <div className="flex gap-2 items-center text-base justify-between">
                <label htmlFor="hobby">Hobby:</label>
                <Input type="text" id="hobby" placeholder="Hobby" />
              </div>
              <div className="flex gap-2 items-center text-base justify-between">
                <label htmlFor="level">Nivel:</label>
                <Select placeholder="Selecione o nível...">
                  <SelectItem value="junior" text="Júnior" />
                  <SelectItem value="pleno" text="Pleno" />
                  <SelectItem value="senior" text="Sênior" />
                </Select>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                onClick={onCloseDialog}
                title="Cancelar"
                className="bg-white text-blue_300 border-gray_100"
              />
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
