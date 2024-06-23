'use client'
import useSideBar from '@/hooks/sidebar/sidebar-hook'
import { cn } from '@/lib/utils'
import React from 'react'
import MaxMenu from './max-menu'
import { MinMenu } from './min-menu'

type Props = {
  domains:
    | {
        id: string
        name: string
        icon: string
      }[]
    | null
    | undefined
}

const SideBar = ({ domains }: Props) => {
  const { expands, onExpand, currentPage, onSignOut } = useSideBar()
    
  return (
    <div
      className={cn(
        'bg-stone-800 rounded-r-md dark:bg-neutral-950 h-full  fill-mode-forwards fixed md:relative  ',
        expands == undefined && 'w-[60px]',
        expands == true
          ? 'animate-open-sidebar max-w-[200px]'
          : expands == false && 'animate-close-sidebar w-[60px]'
      )}
    >
      {expands ? (
        <MaxMenu
          domains={domains}
          current={currentPage!}
          onExpand={onExpand}
          onSignOut={onSignOut}
        />
      ) : (
        <MinMenu
          domains={domains}
          onShrink={onExpand}
          current={currentPage!}
          onSignOut={onSignOut}
        />
      )}
    </div>
  )
}

export default SideBar