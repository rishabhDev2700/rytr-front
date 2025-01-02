import React from 'react'

export default function AssistantPage() {
    return (
        <div className='w-full h-screen grid items-center justify-center text-center'>
            <div className="">

            <svg className='mx-auto' xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" /><path d="M14 6a6 6 0 0 1 6 6v3" /><path d="M4 15v-3a6 6 0 0 1 6-6" /><rect x="2" y="15" width="20" height="4" rx="1" /></svg>
                <h1 className='text-5xl uppercase font-light z-50 mr-2 flex items-center'> Under development</h1>
            </div>

            <p className='animate-pulse underline text-xl z-50'>
                Usage and your feedbacks are your support!.
            </p>


        </div>
    )
}
