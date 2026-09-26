"use client"
import React from 'react'
import logo from '@/app/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useWorkoutContext } from '@/app/context/WorkoutContext'

export default function Navbar() {
  const { planWorkouts, savedWorkouts } = useWorkoutContext();
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isMyPlan = pathname === '/my-plan';

  return (
        <div className="navbar bg-[#0f1014] shadow-sm border-b border-[#22242a] py-2">
            
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
                    <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex={-1}
                    className="menu menu-sm dropdown-content bg-[#131417] text-white rounded-box z-[1] mt-3 w-52 p-2 shadow border border-[#22242a]">
                    <li><Link href="/" className={isHome ? "text-[#cbfb45]" : ""}>Workouts</Link></li>
                    <li><Link href="/my-plan" className={isMyPlan ? "text-[#cbfb45]" : ""}>My Plan</Link></li>
                </ul>
                </div>
                
                <Link href="/" className='btn btn-ghost text-xl rounded-full flex items-center hover:bg-[#131417]'>
                    <Image src={logo} alt='Logo' height={20} className="w-auto"/>
                    <span className="font-['Bebas_Neue'] font-black tracking-widest uppercase mt-1 text-white text-xl">FITLOG</span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-4 text-[13px] font-bold tracking-wide uppercase text-gray-500">
                    <li>
                        <Link 
                            href="/" 
                            className={`rounded-full px-5 py-2.5 transition-all duration-300 ${
                                isHome 
                                ? 'bg-[#1a1c21] text-[#cbfb45] shadow-[0_0_15px_rgba(203,251,69,0.15)]' 
                                : 'hover:text-gray-300 hover:bg-[#131417]'
                            }`}
                        >
                            Workouts
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/my-plan" 
                            className={`rounded-full px-5 py-2.5 transition-all duration-300 ${
                                isMyPlan 
                                ? 'bg-[#1a1c21] text-[#cbfb45] shadow-[0_0_15px_rgba(203,251,69,0.15)]' 
                                : 'hover:text-gray-300 hover:bg-[#131417]'
                            }`}
                        >
                            My Plan
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="navbar-end mr-3 flex items-center gap-6">
                <Link href="/my-plan" className='flex items-center gap-3 cursor-pointer group'>
                    <span className="text-[13px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">Plan</span>
                    <div className='flex items-center justify-center w-[24px] h-[24px] bg-[#cbfb45] text-black rounded-full font-bold text-[12px]'>
                        {planWorkouts?.length || 0}
                    </div>
                </Link>
                 <Link href="/my-plan" className="flex items-center gap-3 cursor-pointer group">
                    <span className="text-[13px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">Saved</span>
                    <div className="flex items-center justify-center w-[24px] h-[24px] border border-[#22242a] bg-[#131417] text-gray-400 rounded-full font-bold text-[12px]">
                        {savedWorkouts?.length || 0}
                    </div>
                </Link>
            </div>

        </div>
    )
}