import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ActionButtons from './ActionButtons';

export default async function WorkoutDetail({ params }) {
  const workouts = await params;
  const res = await fetch(`https://api.api-store.workers.dev/api/fitlog/${workouts.id}`);
  
  if (!res.ok) {
    return (
      <div className="min-h-screen bg-[#0f1014] text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Workout not found</h1>
        <Link href="/" className="text-[#cbfb45] hover:underline">Go back home</Link>
      </div>
    );
  }
  
  const workout = await res.json();

  return (
    <div className="min-h-screen bg-[#111214] text-white p-6 md:p-12">
      <div className="max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-10 md:justify-between lg:gap-10">
          
          
          <div className="w-full lg:w-[45%] flex-shrink-0">
            <Image 
              width={800}
              height={1000}
              src={workout.image} 
              alt={workout.name} 
              className="w-full h-auto object-cover rounded-[20px]"
              priority
            />
          </div>

          <div className="w-full lg:w-[55%] flex flex-col pt-2 pb-8">
            
            <h1 className="text-5xl lg:text-[56px] font-black text-white uppercase font-['Bebas_Neue'] tracking-wide leading-none mb-4">
              {workout.name}
            </h1>
            
            <p className="text-gray-400 text-[17px] leading-relaxed mb-6">
              {workout.description}
            </p>


            <div className="flex flex-wrap gap-3 mb-8">
              {workout.muscleGroups?.map((group, idx) => (
                <span key={idx} className="text-[13px] font-bold text-black bg-[#d7ff00] px-4 py-1.5 rounded-full">
                  {group}
                </span>
              ))}
            </div>

            <div className="bg-[#16181d] border border-[#22242a] rounded-xl flex flex-col mb-10 text-[14px]">
              <div className="flex justify-between items-center py-4 px-6 border-b border-[#22242a]">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">Equipment</span>
                <span className="text-gray-200">{workout.equipment}</span>
              </div>
              <div className="flex justify-between items-center py-4 px-6 border-b border-[#22242a]">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">Difficulty</span>
                <span className="text-gray-200">{workout.difficulty}</span>
              </div>
              <div className="flex justify-between items-center py-4 px-6 border-b border-[#22242a]">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">Sets</span>
                <span className="text-gray-200">{workout.sets}</span>
              </div>
              <div className="flex justify-between items-center py-4 px-6 border-b border-[#22242a]">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">Reps</span>
                <span className="text-gray-200">{workout.reps}</span>
              </div>
              <div className="flex justify-between items-center py-4 px-6 border-b border-[#22242a]">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">Duration</span>
                <span className="text-gray-200">{workout.duration} min</span>
              </div>
              <div className="flex justify-between items-center py-4 px-6 border-b border-[#22242a]">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">Calories</span>
                <span className="text-gray-200">{workout.caloriesBurned} kcal</span>
              </div>
              <div className="flex justify-between items-center py-4 px-6">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">Rating</span>
                <span className="text-gray-200">{workout.rating}</span>
              </div>
            </div>

          
            <div className="mb-10">
              <h3 className="text-[17px] font-bold text-white uppercase tracking-wider mb-5">Instructions</h3>
              <ol className="list-decimal pl-4 space-y-4 text-gray-300 text-[15px]">
                {workout.instructions?.map((step, idx) => (
                  <li key={idx} className="pl-2 leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </div>

         
            <ActionButtons workout={workout} />

          </div>
        </div>
      </div>
    </div>
  )
}

