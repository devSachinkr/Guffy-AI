import { onGetAllAccDomain } from '@/actions/settings'
import InfoBar from '@/components/dashboard/infobar';
import { Separator } from '@/components/ui/separator';
import React from 'react'

type Props = {}

const page = async(props: Props) => {
  const domain=await onGetAllAccDomain(); 
  return (
    <div className='w-full h-full flex'>
      {/* <ConversationMenu domains={domain?.domains}/> */}
      <Separator orientation="vertical" />
      <div className="w-full flex flex-col">
        <div className="px-5">
           <InfoBar/>
        </div> 
      </div>
    </div>
  )
}

export default page