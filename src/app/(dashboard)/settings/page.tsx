import InfoBar from '@/components/dashboard/infobar'
import ChangePassword from '@/components/dashboard/settings/change-password'
import BillingSetting from '@/components/settings/billing-setting'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <>
    <InfoBar/>
    <div className="overflow-y-auto w-full chat-window flex-1 flex flex-col gap-10">
       <BillingSetting/>
       <ChangePassword/>
    </div>
    </>
  )
}

export default page