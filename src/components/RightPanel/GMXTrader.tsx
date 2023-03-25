import 'rc-slider/assets/index.css'

import { TabType } from '@/types/next'
import formatNumber from '@/utils/formatNumber'
import { useContext, useState } from 'react'
import { IoTrendingDownSharp, IoTrendingUpSharp } from 'react-icons/io5'

import Button from '../shared/Button'
import Select from '../shared/Form/Select'
import LeverageSlider from '../shared/LeverageSlider'
import TokenSwapItem from '../shared/Swap/TokenSwapItem'
import Tabs from '../shared/Tabs'

const GMXTrader = () => {
  const [isLong, setIsLong] = useState<boolean>(true)
  const [leverageOption, setLeverageOption] = useState<number | number[]>(1.1)
  const [exchangeType, setExchangeType] = useState<number>(0)
  const tabsLongShort: TabType[] = [
    {
      key: 0,
      label: 'Long',

      icon: <IoTrendingUpSharp size="1.125rem" />,
      action: () => {
        setIsLong(true)
      },
    },
    {
      key: 1,
      label: 'Short',
      icon: <IoTrendingDownSharp size="1.125rem" />,
      action: () => {
        setIsLong(false)
      },
    },
  ]

  const tabsExchangeType: TabType[] = [
    {
      key: 0,
      label: 'Market',
      action: () => setExchangeType(0),
    },
    {
      key: 1,
      label: 'Limit',
      action: () => setExchangeType(1),
    },
    {
      key: 2,
      label: 'Trigger',
      action: () => setExchangeType(2),
    },
  ]

  const infoItems: { label: string; value: string | number }[] = [
    //TODO: change values to real data
    { label: 'Collateral in', value: 'USD' },
    { label: 'Leverage', value: `${leverageOption}x` },
    {
      label: 'Entry Price',
      value: formatNumber(123, { symbol: '$', decimalCases: 2 }),
    },
    {
      label: 'Liq. Price',
      value: formatNumber(-1685, { symbol: '$', decimalCases: 2 }),
    },
    {
      label: 'Fees',
      value: formatNumber(15.12, { symbol: '$', decimalCases: 2 }),
    },
  ]
  const [limitPrice, setLimitPrice] = useState<number>(0)
  const tokens = [
    { label: 'USDC', value: 'USDC' },
    { label: 'USDT', value: 'USDT' },
    { label: 'ETH', value: 'ETH' },
    { label: 'BTC', value: 'BTC' },
  ]
  const [token, setToken] = useState<{
    label: string
    value: string
    quantity: number
  }>({ quantity: 0, ...tokens[0]! })

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Tabs tabList={tabsLongShort} style="monochromatic" />
        <div className="flex w-min">
          <Tabs
            tabList={tabsExchangeType}
            style="no-style"
            size="sm"
            controllingTab={{
              currentTab: exchangeType,
              setCurrentTab: setExchangeType,
            }}
          />
        </div>
      </div>
      {!(exchangeType === 2) && (
        <>
          <TokenSwapItem
            label={'Pay'}
            value={token.quantity}
            onValueChange={(qt) =>
              setToken((prev) => ({ ...prev, quantity: qt }))
            }
            tokenSelect={
              <Select
                items={tokens}
                selectedItem={token}
                setSelectedItem={(token: { label: string; value: string }) =>
                  setToken({
                    label: token.label,
                    value: token.value,
                    quantity: 0,
                  })
                }
                style="no-style"
              />
            }
            secondaryText={`Balance 0.000`}
          />

          {exchangeType === 1 && (
            <TokenSwapItem
              label={'Price'}
              value={limitPrice}
              onValueChange={setLimitPrice}
              secondaryText={'Mark: 1,564.21'}
              tokenSelect={<span>USD</span>}
            />
          )}

          <div className="mb-4 flex flex-col gap-2 pb-8 text-sm">
            <div>Leverage slider</div>
            <LeverageSlider
              leverageOption={leverageOption}
              setLeverageOption={setLeverageOption}
            />
          </div>
          <div className="flex flex-col gap-2">
            {infoItems.map((item, key) => (
              <div key={key} className="flex justify-between">
                <div>{item.label}</div>
                <div>{item.value}</div>
              </div>
            ))}
          </div>

          <Button
            label={
              token.quantity <= 0
                ? 'Enter an amount'
                : exchangeType === 0
                ? 'Enable Leverage'
                : 'Enable Orders'
            }
            size="lg"
          />
        </>
      )}
      {exchangeType === 2 && (
        <Button
          label={'Open Position'}
          size="lg"
          onClick={() => setExchangeType(0)}
        />
      )}
    </div>
  )
}

export default GMXTrader