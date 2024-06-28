import { onGetAllAccDomain } from '@/actions/settings'
import ConversationMenu from '@/components/conversations';
import Chats from '@/components/conversations/chats';
import InfoBar from '@/components/dashboard/infobar';
import { Separator } from '@/components/ui/separator';
import React from 'react'

type Props = {}

const page = async(props: Props) => {
  const domain=await onGetAllAccDomain(); 
  return (
    <div className='w-full h-screen flex'>
      <ConversationMenu domains={domain?.domains}/>
      <Separator orientation="vertical" className='h-full' />
      <div className="w-full flex flex-col">
        <div className="px-5">
           <InfoBar/>
        </div> 
        <Chats/>
      </div>
    </div>
  )
}

export default page