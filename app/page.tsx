import React from 'react'
import Banner from '@/app/homepage/Banner'
import Library from '@/app/homepage/workout'


export default function HomePage() {
  return (
    <div className='bg-black mx-3'>
      <div>
        <Banner/>
        <Library/>
      </div>
    </div>
  )
}
