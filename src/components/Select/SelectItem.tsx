'use client'

import { renderIcon } from '@/utils/renderIcon'
import * as Select from '@radix-ui/react-select'

export interface SelectItemProps extends Select.SelectItemProps {
  text: string
}

export function SelectItem({ text, ...props }: SelectItemProps) {
  return (
    <Select.Item
      className="flex items-center justify-between gap-2 px-3 py-2.5 outline-none data-[highlighted]:bg-zinc-50"
      {...props}
    >
      <Select.ItemText className="text-black">{text}</Select.ItemText>
      <Select.ItemIndicator>{renderIcon('check')}</Select.ItemIndicator>
    </Select.Item>
  )
}
