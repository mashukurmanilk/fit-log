import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function WorkoutCard({ workout }) {
  if (!workout) return null;

  return (
    <Link href={`/workouts/${workout.id}`} className="card bg-[#131417] border border-[#22242a] hover:border-gray-600 transition-colors cursor-pointer overflow-hidden rounded-[20px] w-full shadow-lg">
      <figure className="relative h-56 w-full bg-[#0a0a0c]">
        <Image
          src={workout.image}
          alt={workout.name}
          className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
        />
      </figure>
      
      <div className="card-body p-6">
        <div className="flex flex-wrap gap-2 mb-2">
          {workout.muscleGroups?.map((group, idx) => (
            <span key={idx} className="text-[11px] font-bold text-[#cbfb45] uppercase tracking-wider bg-[#cbfb45]/10 px-2.5 py-1 rounded-sm">
              {group}
            </span>
          ))}
        </div>
        
        <h2 className="text-2xl font-black text-white uppercase font-['Impact'] tracking-wide leading-none mb-3">
          {workout.name}
        </h2>
        
        <p className="text-gray-400 text-sm mb-6 flex-grow">
          <span className="font-semibold text-gray-300">Equipment:</span> {workout.equipment}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-[#22242a] text-gray-400 text-sm font-medium">
          <div className="flex items-center gap-1.5" title="Duration">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>{workout.duration} min</span>
          </div>
          
          <div className="flex items-center gap-1.5" title="Calories Burned">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
            <span>{workout.caloriesBurned} kcal</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-yellow-500" title="Rating">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span className="text-gray-300">{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
