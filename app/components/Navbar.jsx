import React from 'react'
import logo from '@/app/assets/logo.png'
import Image from 'next/image'

export default function Navbar() {
  return (
        <div className="navbar bg-black shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex={-1}
                    className="menu menu-sm dropdown-content bg-black rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><a>Workouts</a></li>
                    <li><a>My Plan</a></li>
                </ul>
                </div>
                <div className='btn btn-ghost text-xl rounded-full flex items-center ml-3'>
                    <Image src={logo} alt='Logo'/>
                    {/* <a className="btn btn-ghost text-xl">FITLOG</a> */}
                    FITLOG
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                <li><a className='rounded-full'>Workouts</a></li>
                
                <li><a className='rounded-full'>My Plan</a></li>
                </ul>
            </div>
            <div className="navbar-end mr-3 flex items-center gap-6">
                <div className='flex items-center gap-3'>
                    <span className="text-base font-medium text-gray-100">Plan</span>
                    <div className='flex items-center justify-center w-6 h-6 bg-[#cbfb45] text-black rounded-full font-bold'>
                        0
                    </div>
                </div>
                 <div className="flex items-center gap-3 cursor-pointer">
                    <span className="text-base font-medium text-gray-300">Saved</span>
                    <div className="flex items-center justify-center w-8 h-8 border-2 border-gray-800 bg-[#0f0f11] text-gray-200 rounded-full font-bold">
                        0
                    </div>
                </div>
            </div>
        </div>
        )
}
