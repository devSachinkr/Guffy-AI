import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import ToolTip from '../global/Tooltip'

type Props = {
  size: 'max' | 'min'
  label: string
  icon: JSX.Element
  link?: string
  current?: string
  onSignOut?(): void
}

const MenuItem = ({ size, link, icon, label, current, onSignOut }: Props) => {
  switch (size) {
    case 'max':
      return (
        <Link
          onClick={onSignOut}
          className={cn(
            'flex items-center gap-2 px-1 py-2 rounded-lg my-1',
            !current
              ? 'text-gray-500'
              : current == link
              ? 'bg-white font-bold text-black'
              : 'text-gray-500'
          )}
          href={link ? `${link}` : '#'}
        >
          {icon} {label}
        </Link>
      )
    case 'min':
      return (
        <Link
          onClick={onSignOut}
          className={cn(
            !current
              ? 'text-gray-500'
              : current == link
              ? 'bg-white font-bold text-black'
              : 'text-gray-500',
            'rounded-lg py-2 my-1'
          )}
          href={link ? `${link}` : '#'}
        >
         <ToolTip desc={label}> {icon}</ToolTip> 
        </Link>
      )
    default:
      return null
  }
}

export default MenuItem