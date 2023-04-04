import { TokenInfoType } from '@/types/next'
import formatNumber from '@/utils/formatNumber'
import clsx from 'clsx'

type TokenInfoItemProps = {
  tokenInfo: TokenInfoType
}

const TokenInfoItem: React.FC<TokenInfoItemProps> = ({
  tokenInfo,
}: TokenInfoItemProps) => {
  return (
    <div className="ml-1 flex flex-col items-start gap-0.5 2xl:ml-2">
      <div className="text-xs font-medium text-text-purple">
        {tokenInfo.label}
      </div>
      <div
        className={clsx('w-16 font-medium', {
          'text-green-500':
            tokenInfo.colorMode === 'redgreen' && tokenInfo.value > 0,
          'text-red-500':
            tokenInfo.colorMode === 'redgreen' && tokenInfo.value < 0,
          'text-primary': tokenInfo.colorMode === 'blue',
          'text-text-gray': tokenInfo.colorMode === 'gray',
        })}
      >
        {formatNumber(tokenInfo.value, {
          decimalCases: 2,
          symbol: tokenInfo.type,
          isSymbolEnd: tokenInfo.type === '%',
          displayPositive: tokenInfo.type === '%',
        })}
      </div>
    </div>
  )
}

export default TokenInfoItem
