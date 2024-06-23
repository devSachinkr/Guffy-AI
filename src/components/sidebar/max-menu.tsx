import { LogOut, Menu, MonitorSmartphone, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import DomainMenu from './domain-menu'
import MenuItem from './menu-item'
import { SIDEBAR_MENU } from '@/constants/menu-items'
import logo from "../../../public/fuffyLogo.png"
type Props = {
  onExpand(): void
  current: string
  onSignOut(): void
  domains:
  | {
      id: string;
      name: string;
      icon: string;
    }[]
  | null
  | undefined;
}

const MaxMenu = ({ current, domains, onExpand, onSignOut }: Props) => {
  return (
    <div className="py-3 px-4 flex flex-col h-full">
      <div className="flex justify-between items-center">
        <Image
          src={logo}
          alt="LOGO"
          sizes="100vw"
          className="animate-fade-in  delay-300 fill-mode-forwards"
          style={{
            width: '50%',
            height: 'auto',
          }}
          width={0}
          height={0}
        />
        <X
          className="cursor-pointer animate-fade-in opacity- delay-300 fill-mode-forwards text-black"
          onClick={onExpand}
        />
      </div>
      <div className="animate-fade-in opacity- delay-300 fill-mode-forwards flex flex-col justify-between h-full pt-10">
        <div className="flex flex-col">
          <p className="text-xs text-gray-500 mb-3">MENU</p>
          {SIDEBAR_MENU.map((menu, key) => (
            <MenuItem
              size="max"
              {...menu}
              key={key}
              current={current}
            />
          ))}
          <DomainMenu domains={domains} />
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-gray-500 mb-3">OPTIONS</p>
          <MenuItem
            size="max"
            label="Sign out"
            icon={<LogOut className='text-white' />}
            onSignOut={onSignOut}
          />
          <MenuItem
            size="max"
            label="Mobile App"
            icon={<MonitorSmartphone className='text-white' />}
          />
        </div>
      </div>
    </div>
  )
}

export default MaxMenu