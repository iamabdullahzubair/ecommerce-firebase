import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='min-h-screen flex  items-center justify-center'>
        <div className='flex flex-col items-center -mt-20 gap-4 pb-20'>
            <p className='text-3xl font-extrabold'>404 Not Found</p>
            <p>Your visited page not found. You may go home page.</p>
            <Link to={"/"} className='px-5 py-2 rounded shadow-sm bg-secondary text-white'>Back to Home Page</Link>
        </div>
    </div>
  )
}

export default NotFoundPage