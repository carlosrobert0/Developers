import * as ScrollArea from '@radix-ui/react-scroll-area'

interface Developer {
  id: string
  name: string
}

interface ScrollAreaViewProps {
  data: Developer[]
}

export function ScrollAreaView({ data }: ScrollAreaViewProps) {
  return (
    <ScrollArea.Root className="w-48 h-11 rounded-md overflow-hidden bg-blue_100 ml-auto mr-auto">
      <ScrollArea.Viewport className="w-full h-full">
        <div className="px-4">
          <div className="text-sm leading-4 font-semibold text-blue_300">
            Visualize os devs
          </div>
          {data?.map((developer) => (
            <div
              className="text-sm mt-2 border-t border-gray_900 pt-2"
              key={developer.id}
            >
              {developer.name}
            </div>
          ))}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical" />
      <ScrollArea.Corner className="bg-black" />
    </ScrollArea.Root>
  )
}
