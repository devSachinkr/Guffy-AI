import React from 'react'
import SignUpform from '@/components/forms/signup/sign-up-form'
import RegestrationForm from '@/components/forms/signup/regestration-form'
import SubmitButton from '@/components/forms/signup/submit-button'
import StepTracker from '@/components/forms/signup/step-tracker'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='flex-1 py-36 md:px-16 w-full'>
      <div className="flex flex-col h-full gap-3">
        <SignUpform>
          <div className='flex flex-col gap-3'>
            <RegestrationForm/>
            <SubmitButton/>
          </div>
          <StepTracker/>
        </SignUpform>
      </div>
    </div>
  )
}

export default page