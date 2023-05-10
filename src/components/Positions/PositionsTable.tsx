import { PositionType } from '@/types/next'
import formatDateTime from '@/utils/formatDateTime'
import formatNumber from '@/utils/formatNumber'
import getIconFancyIcon from '@/utils/getIconFancyIcon'
import { createColumnHelper, SortingState } from '@tanstack/react-table'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { HiShare } from 'react-icons/hi2'
import {
  IoClose,
  IoTrendingDownSharp,
  IoTrendingUpSharp,
} from 'react-icons/io5'

import DataTable from '../shared/DataTable'
import { DataTableContentItem } from '../shared/DataTableContentItem'

type PositionsTableProps = {
  data: PositionType[]
  isOpen: boolean
}
const PositionsTable: React.FC<PositionsTableProps> = ({ data, isOpen }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [isCloseModalOpen, setisCloseModalOpen] = useState(false)
  const [currentPosition, setCurrentPosition] = useState<
    PositionType | undefined
  >()

  const closePosition = (position: PositionType) => {
    setisCloseModalOpen(true)
    setCurrentPosition(position)
  }

  const columnHelper = createColumnHelper<PositionType>()
  const columns = [
    columnHelper.accessor('token', {
      id: 'indexToken',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          <div className="flex items-center gap-1 text-sm">
            {getIconFancyIcon(info.getValue())}
            <span
              className={clsx(
                'flex items-center justify-center gap-2 rounded px-2 py-1',
                {
                  'bg-[#0dac8626]': info.row.original.strategy === 'Long',
                  'bg-[#e3575926]': info.row.original.strategy === 'Short',
                }
              )}
            >
              <span
                className={clsx({
                  'text-green-400': info.row.original.strategy === 'Long',
                  'text-red-400': info.row.original.strategy === 'Short',
                })}
              >
                {info.row.original.strategy === 'Long' ? (
                  <IoTrendingUpSharp size={16} />
                ) : (
                  <IoTrendingDownSharp size={16} />
                )}
              </span>
              {info.row.original.strategy}
            </span>
            <span
              className={clsx(
                'flex items-center justify-center gap-2 rounded px-2 py-1',
                {
                  'bg-[#0dac8626]': info.row.original.strategy === 'Long',
                  'bg-[#e3575926]': info.row.original.strategy === 'Short',
                }
              )}
            >
              {info.row.original.operation}
            </span>
          </div>
        </DataTableContentItem>
      ),
      header: () => <span className="text-sm text-gray-300">Position</span>,
      enableSorting: false,
    }),
    columnHelper.accessor('size', {
      id: 'size',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2 })}
        </DataTableContentItem>
      ),
      header: () => <span className="text-sm text-gray-300">Size ($)</span>,
      enableSorting: false,
      sortingFn: 'basic',
    }),
    columnHelper.accessor('collateral', {
      id: 'collateral',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2 })}
        </DataTableContentItem>
      ),
      header: () => (
        <span className="text-sm text-gray-300">Collateral ($)</span>
      ),
      enableSorting: false,
    }),
    columnHelper.accessor('entryPrice', {
      id: 'entryPrice',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2 })}
        </DataTableContentItem>
      ),
      header: () => <span className="text-sm text-gray-300">Entry Price</span>,
      enableSorting: false,
    }),
    columnHelper.accessor('markPrice', {
      id: 'markPrice',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2 })}
        </DataTableContentItem>
      ),
      header: () => <span className="text-sm text-gray-300">Mark Price</span>,
      enableSorting: false,
    }),
    columnHelper.accessor('liqPrice', {
      id: 'liqPrice',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          {formatNumber(info.getValue(), { decimalCases: 2 })}
        </DataTableContentItem>
      ),
      header: () => <span className="text-sm text-gray-300">Liq. Price</span>,
      enableSorting: false,
    }),
    columnHelper.accessor('closePrice', {
      id: 'closePrice',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          {info.getValue()
            ? formatNumber(info.getValue()!, { decimalCases: 2 })
            : '-'}
        </DataTableContentItem>
      ),
      header: () => <span className="text-sm text-gray-300">Close Price</span>,
      enableSorting: false,
    }),
    columnHelper.accessor('unrealisedPnl', {
      id: 'unrealisedPnl',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          <span
            className={clsx({
              'text-green-400': info.getValue() > 0,
              'text-red-400': info.getValue() < 0,
            })}
          >
            {formatNumber(info.getValue(), {
              decimalCases: 2,
              displayPositive: true,
            })}
            {'  ('}
            {formatNumber(0.25, {
              //TODO pnl percentage
              decimalCases: 2,
              symbol: '%',
              isSymbolEnd: true,
              displayPositive: true,
            })}
            )
          </span>
        </DataTableContentItem>
      ),
      header: () => (
        <span className="text-sm text-gray-300">Unrealised P&L</span>
      ),
      enableSorting: false,
    }),
    columnHelper.accessor('pnl', {
      id: 'pnl',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          <span
            className={clsx({
              'text-green-400': info.getValue() > 0,
              'text-red-400': info.getValue() < 0,
            })}
          >
            {formatNumber(info.getValue(), {
              decimalCases: 2,
              displayPositive: true,
            })}
            {'  ('}
            {formatNumber(0.25, {
              //TODO pnl percentage
              decimalCases: 2,
              symbol: '%',
              isSymbolEnd: true,
              displayPositive: true,
            })}
            )
          </span>
        </DataTableContentItem>
      ),
      header: () => <span className="text-sm text-gray-300">Realised P&L</span>,
      enableSorting: false,
    }),
    columnHelper.accessor('expiryTime', {
      id: 'expiry',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          {info.getValue()}
        </DataTableContentItem>
      ),
      header: () => <span className="text-sm text-gray-300">Expiry</span>,
      enableSorting: false,
    }),
    columnHelper.accessor('closeDate', {
      id: 'closeDate',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          {info.getValue() ? formatDateTime(info.getValue()!) : '-'}
        </DataTableContentItem>
      ),
      header: () => <span className="text-sm text-gray-300">Closed Date</span>,
      enableSorting: false,
      enableHiding: true,
    }),
    columnHelper.accessor('id', {
      id: 'close',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          <button
            className="flex cursor-pointer items-center gap-1 rounded bg-gray-500 p-2 text-sm font-normal text-white transition duration-200 hover:bg-red-400"
            onClick={() => closePosition(info.row.original)}
          >
            <IoClose size={16} />
            Close
          </button>
        </DataTableContentItem>
      ),
      header: () => <span></span>,
      enableSorting: false,
    }),
    columnHelper.accessor('id', {
      id: 'share',
      cell: (info) => (
        <DataTableContentItem clickType="no-action" row={info.row}>
          <span className="cursor-pointer text-gray-400 transition duration-200 hover:text-white">
            <HiShare size={16} />
          </span>
        </DataTableContentItem>
      ),
      header: () => <span></span>,
      enableSorting: false,
    }),
  ]

  const [columnVisibility, setColumnVisibility] = useState({
    collateral: isOpen,
    markPrice: isOpen,
    liqPrice: isOpen,
    unrealisedPnl: isOpen,
    expiry: isOpen,
    closeDate: !isOpen,
  })
  useEffect(() => {
    setColumnVisibility({
      collateral: isOpen,
      markPrice: isOpen,
      liqPrice: isOpen,
      unrealisedPnl: isOpen,
      expiry: isOpen,
      closeDate: !isOpen,
    })
  }, [isOpen])

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        sorting={sorting}
        setSorting={setSorting}
        columnVisibility={columnVisibility}
      />
      {/* {currentPosition && (
        <GMXClosePositionModal
          position={currentPosition}
          isOpen={isCloseModalOpen}
          setIsOpen={setisCloseModalOpen}
        />
      )}*/}
    </>
  )
}
export default PositionsTable
