import { renderIcon } from '@/utils/renderIcon'
import { ButtonHTMLAttributes } from 'react'

interface CardNavigationProps extends ButtonHTMLAttributes<any> {
  title: string
  icon: string
  active?: boolean
}

export function CardNavigation({
  title,
  icon,
  active = false,
  ...rest
}: CardNavigationProps) {
  return (
    <button
      {...rest}
      className={`${
        active
          ? 'bg-blue_300 border border-none text-white'
          : 'bg-blue_100 text-blue_300'
      } font-bold text-[15px] leading-[18px]
      gap-2 flex flex-col justify-center items-center w-[130px] h-[85px] rounded-[10px] border border-gray_100`}
    >
      {renderIcon(icon)}
      <h3>{title}</h3>
    </button>
  )
}
