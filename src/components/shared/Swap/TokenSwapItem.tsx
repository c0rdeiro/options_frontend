import Input from '../Form/Input'

type TokenSwapItemProps = {
  label: string
  value: number | undefined
  onValueChange: (qt: number) => void
  tokenSelect: React.ReactNode
  secondaryText?: string
  isInputDisabled?: boolean
  placeholder?: string
}

const TokenSwapItem: React.FC<TokenSwapItemProps> = ({
  label,
  value,
  onValueChange,
  tokenSelect,
  secondaryText,
  isInputDisabled = false,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-2 rounded bg-gray-500 p-3 ">
      <div className="flex justify-between text-xs font-normal text-gray-300">
        <div>{label}</div>
        <div>{secondaryText}</div>
      </div>
      <div className="flex items-center justify-between rounded bg-gray-600 pr-1">
        <Input
          value={value?.toString()}
          onChange={(e) => onValueChange(+e)}
          type="number"
          styleType="discrete"
          isDisabled={isInputDisabled}
          placeholder={placeholder}
        />
        {tokenSelect}
      </div>
    </div>
  )
}
export default TokenSwapItem
