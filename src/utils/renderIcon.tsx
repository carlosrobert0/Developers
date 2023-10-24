import { BiEdit, BiPlus, BiTrash } from 'react-icons/bi'
import { LiaUser } from 'react-icons/lia'
import { SiLevelsdotfyi } from 'react-icons/si'

export function renderIcon(icon: string) {
  switch (icon) {
    case 'user':
      return <LiaUser size={20} />
    case 'level':
      return <SiLevelsdotfyi size={20} />
    case 'delete':
      return <BiTrash size={20} />
    case 'edit':
      return <BiEdit size={20} />
    case 'add':
      return <BiPlus size={20} />
  }
}
