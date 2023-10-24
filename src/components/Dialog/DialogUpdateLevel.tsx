import { renderIcon } from '@/utils/renderIcon'
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from '../Button'
import { Input } from '../Input'

interface DialogUpdateLevelProps {
  isOpen: boolean
  onCloseDialog: () => void
}

export function DialogUpdateLevel({
  isOpen,
  onCloseDialog,
}: DialogUpdateLevelProps) {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray_900/40" />
        <Dialog.Content className="w-1/3 h-fit bg-white rounded-md p-10 flex flex-col fixed ml-auto top-20 left-1/3 gap-8">
          <Dialog.Title className="flex">
            Atualizar nível
            <button onClick={onCloseDialog} className="ml-auto text-blue_300">
              {renderIcon('close')}
            </button>
          </Dialog.Title>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center text-base justify-between">
                <label htmlFor="name">Nível:</label>
                <Input type="text" id="name" placeholder="Nome" />
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
