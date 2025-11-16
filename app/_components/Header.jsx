"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserButton, useUser, SignInButton } from '@clerk/nextjs'

function Header() {
  const { isSignedIn } = useUser()
  return (
    <div className='p-5 border shadow-sm bg-[#A3B18A]'>
      <div className='flex items-center justify-between'>
        <Image src={'/logo.svg'} width={180} height={50} alt='logo' />
        {isSignedIn ? (
          <div className='flex items-center gap-3'>
            <Link href={"/dashboard"}>
            <Button className='text-[#DAD7CD] bg-primary hover:bg-[#3A5A40]' >Dashboard</Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <SignInButton mode="redirect">
            <Button className='w-30 h-10 text-[#DAD7CD] bg-primary hover:bg-[#3A5A40]'>
              Get Started
            </Button>
          </SignInButton>
        )}
      </div>
    </div>
  )
}

export default Header