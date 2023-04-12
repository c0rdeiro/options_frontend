import Modal from '../shared/Modal'
import { RxCross2 } from 'react-icons/rx'
import Tabs from '../shared/Tabs'
import { TabType } from '@/types/next'
import { useState } from 'react'
import TokenSwapItem from '../shared/Swap/TokenSwapItem'
import formatNumber from '@/utils/formatNumber'
import Button from '../shared/Button'
import Input from '../shared/Form/Input'

type GMXClosePositionModalProps = {
  position: GMXPosition
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}
const GMXClosePositionModal: React.FC<GMXClosePositionModalProps> = ({
  position,
  isOpen,
  setIsOpen,
}) => {
  const [exchangeType, setExchangeType] = useState<number>(0) //these are numbers to manual control tabs; 0- market 1- trigger

  const tabsExchangeType: TabType[] = [
    {
      key: 0,
      label: 'Market',
      action: () => setExchangeType(0),
    },
    {
      key: 1,
      label: 'Trigger',
      action: () => setExchangeType(2),
    },
  ]

  const [quantity, setQuantity] = useState(0)
  const [keepLeverage, setkeepLeverage] = useState(true)
  const [allowSlippage, setallowSlippage] = useState(false)
  const [fees, setfees] = useState(0.16)

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex w-96 flex-col items-center justify-center gap-4 self-center bg-sectionsBGDark font-medium text-white">
        <div className="flex w-full items-center justify-between px-4 pt-4">
          <span>{`Close ${position.isLong ? 'Long' : 'Short'} ${
            position.indexToken.symbol
          }`}</span>
          <RxCross2
            onClick={() => setIsOpen(false)}
            className="hover:cursor-pointer"
          />
        </div>
        <div className="h-[1px] w-full bg-white" />
        <div className="flex w-full flex-col gap-3 px-4 pb-4">
          <Tabs
            tabList={tabsExchangeType}
            style="monochromatic"
            roundStyle="straight"
          />
          <TokenSwapItem
            label={'Close'}
            value={quantity}
            onValueChange={setQuantity}
            tokenSelect={<div className="text-2xl">USD</div>}
            secondaryText={`Max: 0.00`}
          />
          <div className="flex flex-col">
            <div className="flex w-full justify-between text-sm text-text-purple">
              <span>{`Keep leverage at ${position.leverageStr}`}</span>
              <Input
                type="checkbox"
                value={''}
                size="checkbox"
                checked={keepLeverage}
                onChange={() => setkeepLeverage(!keepLeverage)}
              />
            </div>
            <div className="flex w-full justify-between text-sm text-text-purple">
              <span>{`Allow up to 1% slippage`}</span>
              <Input
                type="checkbox"
                value={''}
                size="checkbox"
                checked={allowSlippage}
                onChange={() => setallowSlippage(!allowSlippage)}
              />
            </div>
            <div className="flex w-full justify-between text-sm text-text-purple">
              <span>{`Allowed Slippage`}</span>
              <div>
                {formatNumber(0.0003, {
                  decimalCases: 2,
                  isSymbolEnd: true,
                  symbol: '%',
                })}
              </div>
            </div>
          </div>
          <div className="flex h-[0.5px] w-full bg-darkBg" />
          <div className="flex flex-col">
            <div className="flex w-full justify-between text-sm text-text-purple">
              <span>{`Mark Price`}</span>
              <div>
                {formatNumber(position.markPrice, {
                  decimalCases: 2,
                  symbol: '$',
                })}
              </div>
            </div>
            <div className="flex w-full justify-between text-sm text-text-purple">
              <span>{`Entry Price`}</span>
              <div>
                {formatNumber(position.entryPrice, {
                  decimalCases: 2,
                  symbol: '$',
                })}
              </div>
            </div>
            <div className="flex w-full justify-between text-sm text-text-purple">
              <span>{`Allowed Slippage`}</span>
              <div>
                {formatNumber(position.liqPrice, {
                  decimalCases: 2,
                  symbol: '$',
                })}
              </div>
            </div>
          </div>
          <div className="flex h-[0.5px] w-full bg-darkBg" />
          <div className="flex flex-col">
            <div className="flex w-full justify-between text-sm text-text-purple">
              <span>{`Size`}</span>
              <div>
                {formatNumber(position.size, { decimalCases: 2, symbol: '$' })}
              </div>
            </div>
            <div className="flex w-full justify-between text-sm text-text-purple">
              <span>{`Collateral (${position.collateralToken.symbol})`}</span>
              <div>
                {formatNumber(position.collateral, {
                  decimalCases: 2,
                  symbol: '$',
                })}
              </div>
            </div>
            <div className="flex w-full justify-between text-sm text-text-purple">
              <span>{`PnL`}</span>
              <div>
                {position.deltaStr} ({position.deltaPercentageStr})
              </div>
            </div>
            <div className="flex w-full justify-between text-sm text-text-purple">
              <span>{`Fees`}</span>
              <div>{formatNumber(fees, { decimalCases: 2, symbol: '$' })}</div>
            </div>
          </div>
          <div className="flex h-[0.5px] w-full bg-darkBg" />
          <div className="flex w-full justify-between text-sm text-text-purple">
            <span>{`Receive`}</span>
            <div>
              {`${formatNumber(0, { decimalCases: 4 })} ${
                position.indexToken.symbol
              }`}{' '}
              ({formatNumber(0, { decimalCases: 2, symbol: '$' })})
            </div>
          </div>
          <Button
            label={
              quantity <= 0
                ? 'Enter an amount'
                : exchangeType === 0
                ? 'Enable Leverage'
                : 'Enable Orders'
            }
            size="lg"
          />
        </div>
      </div>
    </Modal>
  )
}
export default GMXClosePositionModal
