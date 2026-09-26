"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWorkoutContext } from '@/app/context/WorkoutContext';

export default function MyPlanPage() {
  const { planWorkouts, savedWorkouts, removeFromPlan, removeFromSaved, isLoaded } = useWorkoutContext();
  const [activeTab, setActiveTab] = useState('plan'); // 'plan' or 'saved'

  // Loading State requirement
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0f1014] text-white flex items-center justify-center">
        <h2 className="text-2xl font-bold font-['Bebas_Neue'] tracking-widest text-[#cbfb45] animate-pulse">
          Loading workouts...
        </h2>
      </div>
    );
  }

  const activeWorkouts = activeTab === 'plan' ? planWorkouts : savedWorkouts;

  // Sort by duration as required by the UI dropdown
  const sortedWorkouts = [...activeWorkouts].sort((a, b) => a.duration - b.duration);

  // Calculate Metrics live based on active tab
  const totalExercises = activeWorkouts.length;
  const totalMinutes = activeWorkouts.reduce((acc, w) => acc + (w.duration || 0), 0);
  const totalCalories = activeWorkouts.reduce((acc, w) => acc + (w.caloriesBurned || 0), 0);

  return (
    <div className="min-h-screen bg-[#0f1014] text-white p-6 md:p-10">
      <div className="max-w-[1100px] mx-auto">
        
        {/* Title and Subtitle */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-[64px] font-black uppercase font-['Bebas_Neue'] tracking-wide leading-none">
            MY PLAN
          </h1>
          <p className="text-gray-400 mt-2 text-[15px]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics Summary Row (Single Container) */}
        <div className="bg-[#131417] border border-[#22242a] rounded-2xl p-6 grid grid-cols-3 divide-x divide-[#22242a] mb-8">
          <div className="flex flex-col pl-4 justify-center">
            <span className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-1">Exercises</span>
            <span className="text-4xl lg:text-[40px] font-black text-[#cbfb45] font-['Bebas_Neue'] leading-none">
              {totalExercises}
            </span>
          </div>
          <div className="flex flex-col pl-10 justify-center">
            <span className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-1">Minutes</span>
            <span className="text-4xl lg:text-[40px] font-black text-white font-['Bebas_Neue'] leading-none">
              {totalMinutes}
            </span>
          </div>
          <div className="flex flex-col pl-10 justify-center">
            <span className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-1">Calories</span>
            <span className="text-4xl lg:text-[40px] font-black text-white font-['Bebas_Neue'] leading-none">
              {totalCalories}
            </span>
          </div>
        </div>

        {/* Tabs and Sort Row */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex bg-[#131417] border border-[#22242a] rounded-full p-1">
            <button 
              onClick={() => setActiveTab('plan')}
              className={`px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-colors ${
                activeTab === 'plan' 
                  ? 'bg-[#22242a] text-white' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Today's Plan
            </button>
            <button 
              onClick={() => setActiveTab('saved')}
              className={`px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-colors ${
                activeTab === 'saved' 
                  ? 'bg-[#22242a] text-white' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Saved
            </button>
          </div>
          
          <div className="flex items-center gap-3 text-xs text-gray-500 font-bold uppercase tracking-wide">
            Sort By
            <div className="border border-[#22242a] bg-[#131417] text-gray-300 rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer hover:border-gray-500 transition-colors">
              Duration
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>

        {/* Empty State vs List */}
        {sortedWorkouts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center bg-[#131417] border border-[#22242a] rounded-[24px]">
            <h3 className="text-3xl font-black text-gray-300 uppercase font-['Bebas_Neue'] tracking-widest mb-3">NOTHING HERE YET</h3>
            <p className="text-gray-500 text-[15px] mb-8">
              Browse the library and add a lift to get today moving.
            </p>
            <Link href="/" className="bg-[#cbfb45] hover:bg-[#bceb3b] text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors">
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {sortedWorkouts.map((workout) => (
              <div key={workout.id} className="bg-[#131417] border border-[#22242a] hover:border-gray-700 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
                
                {/* Left side: Thumbnail and Info */}
                <div className="flex items-center gap-5 w-full md:w-auto">
                  
                  {/* Thumbnail */}
                  <div className="w-[120px] h-[72px] flex-shrink-0 relative rounded-lg overflow-hidden bg-black">
                    <Image 
                      src={workout.image} 
                      alt={workout.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Info */}
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-black text-white uppercase font-['Bebas_Neue'] tracking-wide leading-none mb-1">
                      {workout.name}
                    </h3>
                    <p className="text-gray-400 text-[13px] mb-2 font-medium">{workout.equipment}</p>
                    
                    {/* Stats Row */}
                    <div className="flex items-center text-gray-500 text-[11px] font-bold uppercase tracking-widest gap-4">
                      <span className="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> {workout.duration} min</span>
                      <span className="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg> {workout.caloriesBurned} kcal</span>
                      <span className="flex items-center gap-1.5 text-[#cbfb45]"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> {workout.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Right side: Actions */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <Link href={`/workouts/${workout.id}`} className="border border-[#22242a] hover:border-gray-500 text-gray-300 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors">
                    View Details
                  </Link>
                  
                  {activeTab === 'plan' && (
                    <button 
                      onClick={() => removeFromPlan(workout.id)}
                      className="bg-[#cbfb45] hover:bg-[#bceb3b] text-black px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      Mark as Done
                    </button>
                  )}
                  
                  <button 
                    onClick={() => activeTab === 'plan' ? removeFromPlan(workout.id) : removeFromSaved(workout.id)}
                    className="text-gray-600 hover:text-white p-2 transition-colors ml-1"
                    title="Remove"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}