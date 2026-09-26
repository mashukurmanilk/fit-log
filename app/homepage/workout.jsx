import React from 'react'
import WorkoutCard from '@/app/components/WorkoutCard'

const getWorkouts=async ()=>{
    const res=await fetch('https://api.api-store.workers.dev/api/fitlog')
    if (!res.ok) {
        console.error("API error:", res.status);
        return [];
    }
    return res.json()
}

export default async function workout() {
    const workouts=await getWorkouts()

  return (
    <div className='py-12 flex flex-col mx-4 md:mx-10'>
        <div className="mb-8">
            <h1 className="font-['Impact'] font-normal text-4xl lg:text-5xl text-white tracking-tight uppercase">
                THE LIBRARY
            </h1>
            <div className="text-gray-400 mt-2 text-[17px]">
                Twelve lifts covering every major muscle group.
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map(workoutData => (
                <WorkoutCard key={workoutData.id} workout={workoutData} />
            ))}
        </div>
    </div>
  )
}
