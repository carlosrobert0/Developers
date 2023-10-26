import {
  BiCheck,
  BiChevronDown,
  BiEdit,
  BiPlus,
  BiTrash,
  // eslint-disable-next-line prettier/prettier
  BiX
} from 'react-icons/bi'
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
    case 'close':
      return <BiX size={20} />
    case 'check':
      return <BiCheck size={20} />
    case 'chevron-down':
      return <BiChevronDown size={20} />
  }
}
