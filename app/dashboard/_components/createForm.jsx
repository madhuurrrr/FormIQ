"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const CreateForm = () => {
    const { user } = useUser()
    const router = useRouter()
    const [openDialog, setOpenDialog] = React.useState(false)
    const [userInput, setUserInput] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [generatedFields, setGeneratedFields] = React.useState(null)
    const [isGenerating, setIsGenerating] = React.useState(false)

    const onCreateForm = async () => {
        if (!userInput.trim()) {
            alert('Please enter a form description')
            return
        }

        // Prevent multiple clicks
        if (loading || isGenerating) {
            return
        }

        setLoading(true)
        setIsGenerating(true)
        try {
            const response = await fetch('/api/generate-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    prompt: userInput,
                    userId: user?.id,
                    userEmail: user?.primaryEmailAddress?.emailAddress
                })
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || 'Failed to generate form')
            }

            const data = await response.json()
            console.log(data.formData)
            console.log('New Form ID 🎉', data.insertedId)
            
            setGeneratedFields(data.formData)
            
            // Redirect to edit form page
            if (data.insertedId) {
                router.push('/edit-form/' + data.insertedId)
            }
        } catch (error) {
            alert('Error generating form: ' + error.message)
            console.error('Error:', error)
        } finally {
            setLoading(false)
            setIsGenerating(false)
        }
    }

  return (
    <div>
        <Button onClick={() => setOpenDialog(true)} disabled={isGenerating}> + Create Form</Button>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Form</DialogTitle>
                </DialogHeader>
                <div className='space-y-4'>
                  <Textarea 
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder='E.g., Customer feedback form, Event registration, Product survey...' 
                    className='min-h-24'
                    disabled={loading || isGenerating}
                  />

                  <div className='flex gap-2 justify-end'>
                    <Button 
                      variant='outline' 
                      onClick={() => {
                        setOpenDialog(false)
                        setUserInput('')
                        setGeneratedFields(null)
                      }}
                      disabled={loading || isGenerating}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={onCreateForm}
                      disabled={loading || isGenerating}
                    >
                      {loading || isGenerating ? 'Generating...' : 'Generate with AI'}
                    </Button>
                  </div>
                </div>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default CreateForm