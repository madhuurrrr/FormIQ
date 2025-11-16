"use client"
import React from 'react'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'
import SideNav from './_components/sideNav'

const DashboardLayout = ({ children }) => {
  return (
    <SignedIn>
        <div>
            
            <div className="md:w-64 float-left">
                <SideNav/>
            </div>
            <div className='md:ml-64'>
                {children}
            </div>

        </div>
    </SignedIn>
  )
}

export default DashboardLayout