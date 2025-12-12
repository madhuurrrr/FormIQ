import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'



const formUI = ({jsonorm}) => {
  if (!jsonorm) return <div>No form data</div>
  
  const fields = jsonorm?.formFields || jsonorm || []
  
  const renderField = (field, index) => {
    const fieldType = field?.fieldType?.toLowerCase()
    
    switch(fieldType) {
      case 'text':
      case 'email':
      case 'number':
      case 'tel':
        return (
          <Input 
            key={index}
            type={field?.fieldType}
            placeholder={field?.fieldPlaceholder}
            name={field?.fieldName}
            required={field?.required}
          />
        )
      
      case 'textarea':
        return (
          <textarea
            key={index}
            placeholder={field?.fieldPlaceholder}
            name={field?.fieldName}
            required={field?.required}
            className='w-full p-2 border rounded-md'
            rows="4"
          />
        )
      
      case 'checkbox':
        return (
          <div key={index} className='flex items-center gap-3'>
            <Checkbox 
              id={field?.fieldName}
              name={field?.fieldName}
              required={field?.required}
            />
            <Label htmlFor={field?.fieldName}>{field?.fieldLabel}</Label>
          </div>
        )
      
      case 'radio':
        return (
          <RadioGroup key={index} name={field?.fieldName}>
            {field?.options && Array.isArray(field.options) && field.options.map((option, optIndex) => (
              <div key={optIndex} className='flex items-center gap-3'>
                <RadioGroupItem value={option?.value || option} id={`${field?.fieldName}_${optIndex}`} />
                <Label htmlFor={`${field?.fieldName}_${optIndex}`}>{option?.label || option}</Label>
              </div>
            ))}
          </RadioGroup>
        )
      
      case 'select':
        return (
          <Select name={field?.fieldName} required={field?.required}>
            <SelectTrigger key={index} className="w-full">
              <SelectValue placeholder={field?.fieldPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {field?.options && Array.isArray(field.options) && field.options.map((option, optIndex) => (
                <SelectItem key={optIndex} value={option?.value || option}>{option?.label || option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      
      default:
        return (
          <Input
            key={index}
            type="text"
            placeholder={field?.fieldPlaceholder}
            name={field?.fieldName}
            required={field?.required}
          />
        )
    }
  }
  
  return (
    <div className='border p-5 rounded-lg shadow-md bg-white w-full md:w-[600px]'>
        <h2 className='font-bold text-center text-2xl'>{jsonorm?.formTitle}</h2>
        <h2 className='text-sm text-gray-400 text-center mb-6'>{jsonorm?.formSubheading}</h2>

        <form className='space-y-4'>
          {fields && Array.isArray(fields) && fields.map((field, index)=>(
            <div key={index} className='mb-4'>
              {field?.fieldType?.toLowerCase() !== 'checkbox' && (
                <label className='text-sm font-medium block mb-2'>{field?.fieldLabel}</label>
              )}
              {renderField(field, index)}
            </div>
          ))}
        </form>
    </div>
  )
}

export default formUI