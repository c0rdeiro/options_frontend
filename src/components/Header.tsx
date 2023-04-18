import Image from 'next/image'

import CustomConnectButton from './CustomConnectButton'

const Header: React.FC = () => {
  return (
    <div className="z-50 flex h-16 w-full flex-none items-center justify-between gap-2.5 bg-gray-700 pr-8 pl-10  ">
      <div className="flex pt-3">
        <Image
          alt="logo"
          src="/IVX_Gradient.svg"
          width={84.7}
          height={18}
          quality={100}
        />
      </div>
      <div className="flex gap-8">{/* <CustomConnectButton /> */}</div>
    </div>
  )
}

export default Header
