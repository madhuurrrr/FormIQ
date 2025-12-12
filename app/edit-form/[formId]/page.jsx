"use client"
import { db } from '@/configs/db'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq, and } from 'drizzle-orm'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import FormUI from '../_components/formUI'

const EditForm = ({params}) => {
  const resolvedParams = React.use(params)
  const {user}= useUser();
  const [formFields, setFormFields]=React.useState([]);
  const router=useRouter();

  useEffect(()=>{
    user && GetFormData();
  },[user])

  const GetFormData=async()=>{
    const result=await db.select().from(JsonForms)
    .where(and(eq(JsonForms.id, parseInt(resolvedParams?.formId)), 
    eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)));

    console.log(JSON.parse(result[0].jsonorm));
    setFormFields(JSON.parse(result[0].jsonorm))
  }
  return (
    <div className='p-10 bg-[#DAD7CD] min-h-screen'>
      <h2 className='flex gap-2 items-center my-5 cursor-pointer hover:font-bold' 
      onClick={() => router.back()}>
        <ArrowLeft/> Back
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
        <div className='p-5 border-2 rounded-lg shadow-md border-[#cbc8c0]'>
          Controller
        </div>
        <div className='md:col-span-2 border-2 border-[#cbc8c0] rounded-lg p-5 h-screen flex items-center justify-center bg-[#F5F5F5]'>
          <FormUI jsonorm={formFields}/>
        </div>
      </div>
    </div>
  )
}

export default EditForm