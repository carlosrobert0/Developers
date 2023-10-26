import { PaginationItem } from './PaginationItem'

interface PaginationProps {
  total: number
  pageSize: number
  page: number
  onPageChange: (page: number) => void
}

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter((page) => page > 0)
}

export function Pagination({
  total,
  pageSize,
  page,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.ceil(total / pageSize)

  const previousPage =
    page > 1 ? generatePagesArray(page - 1 - siblingsCount, page - 1) : []

  const nextPages =
    page < lastPage
      ? generatePagesArray(page, Math.min(page + siblingsCount, lastPage))
      : []

  const startItem = (page - 1) * pageSize + 1
  const endItem = Math.min(startItem + 5 - 1, total)

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex gap-2">
        <strong>{startItem}</strong> <p className="text-gray_900">até</p>{' '}
        <strong>{endItem}</strong> <p className="text-gray_900">de</p>{' '}
        <strong>{total}</strong>
      </div>
      <div className="flex gap-2">
        {page > 1 + siblingsCount && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {page > 2 + siblingsCount && (
              <p className="text-gray-300 text-center">...</p>
            )}
          </>
        )}

        {previousPage.length > 0 &&
          previousPage.map((prevPage) => {
            return (
              <PaginationItem
                onPageChange={onPageChange}
                key={prevPage}
                number={prevPage}
              />
            )
          })}

        <PaginationItem onPageChange={onPageChange} number={page} isCurrent />

        {nextPages.length > 0 &&
          nextPages.map((nextPage) => {
            return (
              <PaginationItem
                onPageChange={onPageChange}
                key={nextPage}
                number={nextPage}
              />
            )
          })}

        {page + siblingsCount < lastPage && (
          <>
            {page + 1 + siblingsCount < lastPage && (
              <p className="text-gray-300 text-center">...</p>
            )}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </div>
    </div>
  )
}
