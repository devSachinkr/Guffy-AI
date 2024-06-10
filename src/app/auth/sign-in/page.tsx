"use client"
import LoginForm from '@/components/forms/sign-in/login-form'
import SignInForm from '@/components/forms/sign-in/signIn-form'
import { Button } from '@/components/ui/button'
import { useSignInHook } from '@/hooks/sign-in/use-sign-in'
import Link from 'next/link'
import React from 'react'

const SignInPage = () => {
   const {handleSubmit}=useSignInHook();
  return (
    <div className="flex-1 py-36 md:px-16 w-full">
      <div className="flex flex-col h-full gap-3">
        <SignInForm>
          <div className="flex flex-col gap-3">
            <LoginForm />
            <div className="w-full flex flex-col gap-3 items-center">
              <Button
                type="submit"
                className="w-full"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <p>
                Don’t have an account?{' '}
                <Link
                  href="/auth/sign-up"
                  className="font-bold text-limeGreen"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </SignInForm>
      </div>
    </div>
  )
}

export default SignInPage