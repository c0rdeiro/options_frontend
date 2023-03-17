import Tabs from '@/components/shared/Tabs'
import { TabType } from '@/types/next'
import PositionsCompactTable from './PositionsCompactTable'
import TokenClosedPositionsPanel from './TokenClosedPositionsPanel'

const TokenPositionsPanel = () => {
  const tableTabs: TabType[] = [
    {
      label: 'Open (0)',
      action: () => {},
    },
    {
      label: 'Closed (0)',
      action: () => {},
    },
  ]

  return (
    <div className="flex w-full items-start gap-8 overflow-y-auto pb-14">
      <div className="flex w-full flex-col items-start rounded-lg  py-8 px-6 ">
        <div className="flex w-64 items-center px-6 pb-4 ">
          <Tabs tabList={tableTabs} size="md" style="monochromatic" />
        </div>
        <PositionsCompactTable data={[]} />
      </div>
    </div>
  )
}

export default TokenPositionsPanel
