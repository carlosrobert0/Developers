interface PaginationItemProps {
  number: number
  isCurrent?: boolean
  onPageChange: (page: number) => void
}

export function PaginationItem({
  isCurrent = false,
  onPageChange,
  number,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <button className="text-sm rounded-md text-white px-2 cursor-default bg-blue_300">
        {number}
      </button>
    )
  }

  return (
    <button
      className="text-sm rounded-md text-blue_300 px-2 hover:gray_900 bg-gray_100"
      onClick={() => onPageChange(number)}
    >
      {number}
    </button>
  )
}
