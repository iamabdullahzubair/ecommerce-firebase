import React from 'react'

const AuthInput = ({type="text", placeholder='Enter input here',inputValue, setInputValue}) => {
  return (
    <div className='border-b border-gray-500 text-gray-500 py-1 mb-3'>
        <input 
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        className='focus:outline-none py-1 w-full dark:bg-gray-900 dark:text-slate-200' type={type} placeholder={placeholder}/>
    </div>
  )
}

export default AuthInput