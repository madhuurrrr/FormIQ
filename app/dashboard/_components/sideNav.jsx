import React, { use } from 'react'
import { LibraryBig, MessageSquareQuote, ChartSpline, ShieldPlus } from 'lucide-react'
import { usePathname} from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress"

const SideNav = () => {
        const menuLs = [
            { id: 1, name: 'My Forms', icon: LibraryBig, path: '/dashboard' },
            { id: 2, name: 'Responses', icon: MessageSquareQuote, path: '/dashboard/responses' },
            { id: 3, name: 'Analytics', icon: ChartSpline, path: '/dashboard/analytics' },
            { id: 4, name: 'Upgrade', icon: ShieldPlus, path: '/dashboard/upgrade' },
        ]

        const path=usePathname();
        useEffect(() => {
            console.log("Current path:", path);
        }, [path]);

  return (
        <div className='h-screen w-64 shadow-md border bg-[#DAD7CD]'>
            <div className='p-5'>
                {menuLs.map((menu, index) => (
                    <h2 key={index}
                        className={`flex items-center text-[#3A5A40] gap-3 p-4 mb-3 rounded-md 
                        hover:text-[#DAD7CD] hover:bg-primary  cursor-pointer
                        ${path===menu.path ? 'bg-primary text-[#DAD7CD]' : 'text-[#3A5A40]'}
                        `}
                    >
                        <menu.icon /> 
                        {menu.name}
                    </h2>
                ))}
            </div>
            <div className='fixed bottom-20 p-6 w-64 '>
                <Button className='w-full'> + Create Form</Button>
                <div className='my-5'>
                    <Progress value={33} />
                                    
                </div>
            </div>
        </div>
  )
}

export default SideNav