'use client'
import { renderIcon } from '@/utils/renderIcon'
import * as SelectPrimitive from '@radix-ui/react-select'
import { ReactNode } from 'react'

export interface SelectProps {
  children: ReactNode
  placeholder: string
}

export function Select({ children, placeholder }: SelectProps) {
  return (
    <SelectPrimitive.Root>
      <SelectPrimitive.Trigger className="flex items-center justify-between gap-2 px-3 py-2.5 outline-none">
        <SelectPrimitive.Value
          className="text-black"
          placeholder={placeholder}
        />
        <SelectPrimitive.Icon>
          {renderIcon('chevron-down')}
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          side="bottom"
          position="popper"
          sideOffset={8}
          className="bg-white rounded-md shadow-md outline-none"
        >
          <SelectPrimitive.Viewport className="outline-none">
            {children}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
