import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return(
        <div className="min-h-screen flex items-center justify-center p-6 sm:p-8 bg-[#DAD7CD]">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-700 dark:text-zinc-200">FormIQ</h1>
              
            </div>
            <div className="rounded-xl border border-[#3A5A40] bg-[#A3B18A] p-6 shadow-sm dark:border-[#A3B18A] dark:bg-[#344E41]">
              <SignUp
                appearance={{
                  variables: {
                    colorPrimary: '#588157',
                    colorText: '#344E41',
                    colorBackground: '#FFFFFF',
                    colorInputBackground: '#FFFFFF',
                    colorInputText: '#344E41',
                  },
                }}
              />
            </div>
          </div>
        </div>
  ) 
}