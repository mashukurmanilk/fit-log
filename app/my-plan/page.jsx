"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWorkoutContext } from '@/app/context/WorkoutContext';

export default function MyPlanPage() {
  const { planWorkouts, savedWorkouts } = useWorkoutContext();
  const [activeTab, setActiveTab] = useState('plan'); // 'plan' or 'saved'

  const activeWorkouts = activeTab === 'plan' ? planWorkouts : savedWorkouts;

  return (
    <div className="min-h-screen bg-[#111214] text-white p-6 md:p-12">
      <div className="max-w-[1200px] mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-[#22242a] pb-4">
          <div>
            <h1 className="text-5xl md:text-[64px] font-black uppercase font-['Bebas_Neue'] tracking-wide">
              My Plan
            </h1>
            <p className="text-gray-400 mt-2">Manage your daily schedule and saved routines.</p>
          </div>

          <div className="flex gap-4 mt-6 md:mt-0">
            <button 
              onClick={() => setActiveTab('plan')}
              className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide transition-colors ${
                activeTab === 'plan' 
                  ? 'bg-[#d7ff00] text-black' 
                  : 'bg-[#1a1c21] text-gray-400 hover:text-white'
              }`}
            >
              Today's Plan ({planWorkouts?.length || 0})
            </button>
            <button 
              onClick={() => setActiveTab('saved')}
              className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide transition-colors ${
                activeTab === 'saved' 
                  ? 'bg-[#d7ff00] text-black' 
                  : 'bg-[#1a1c21] text-gray-400 hover:text-white'
              }`}
            >
              Saved ({savedWorkouts?.length || 0})
            </button>
          </div>
        </div>

        {activeWorkouts?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-[#16181d] border border-[#22242a] rounded-[24px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 mb-4"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <h3 className="text-xl font-bold mb-2">No workouts found</h3>
            <p className="text-gray-500 max-w-md">
              You haven't added any workouts to your {activeTab === 'plan' ? "plan" : "saved list"} yet. 
              Browse the library to find something that fits your goals.
            </p>
            <Link href="/" className="mt-6 bg-[#1a1c21] hover:bg-[#22242a] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Browse Library
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeWorkouts.map((workout) => (
              <div key={workout.id} className="bg-[#16181d] border border-[#22242a] rounded-[20px] overflow-hidden flex flex-col hover:border-gray-600 transition-colors">
                <div className="h-48 w-full relative">
                  <Image 
                    src={workout.image} 
                    alt={workout.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {workout.muscleGroups?.map((group, idx) => (
                      <span key={idx} className="text-[10px] font-bold text-black bg-[#d7ff00] px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {group}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase font-['Bebas_Neue'] tracking-wide mb-2">
                    {workout.name}
                  </h3>
                  <div className="flex items-center text-gray-400 text-sm gap-4 mb-6">
                    <span className="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> {workout.duration} min</span>
                    <span className="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg> {workout.caloriesBurned} kcal</span>
                  </div>
                  
                  <Link href={`/workouts/${workout.id}`} className="mt-auto w-full bg-[#1a1c21] hover:bg-[#22242a] text-white text-center py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}