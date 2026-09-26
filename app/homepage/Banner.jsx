import React from 'react'
import Image from 'next/image'
import bannerLogo from '@/app/assets/banner.png'

export default function Banner() {
  return (
    <section className="mx-4 my-8">
      <div className="bg-[#131417] border border-[#22242a] rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">

        <div className="flex flex-col gap-6 max-w-2xl">
            <div className="text-[13px] font-bold text-[#cbfb45] tracking-widest uppercase">
                Workout Library
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-[70px] font-['Impact'] max-w-2xl font-normal text-white uppercase leading-[0.95] tracking-tight">
                Train with intent. Log<br />every set.
            </h1>
            
            <div className='text-gray-400 text-[17px] leading-relaxed max-w-lg'>
                FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
                into today's plan, and watch the week's work add up.
            </div>

            <button className="mt-2 bg-[#cbfb45] hover:bg-[#bceb3b] text-black text-sm font-bold py-3.5 px-8 rounded-md w-fit uppercase transition-colors">
                Browse Workouts
            </button>
        </div>

        <div className="flex-shrink-0 md:mr-10">
            <Image src={bannerLogo} alt="Banner logo" className="w-72 md:w-80 lg:w-96 object-contain drop-shadow-2xl" priority />
        </div>
        
      </div>
    </section>
  )
}