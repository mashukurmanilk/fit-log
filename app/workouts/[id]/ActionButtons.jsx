"use client";

import React from 'react';
import { useWorkoutContext } from '@/app/context/WorkoutContext';

export default function ActionButtons({ workout }) {
  const { addToPlan, saveForLater } = useWorkoutContext();

  return (
    <div className="flex flex-wrap gap-4 mt-auto">
      <button 
        onClick={() => addToPlan(workout)}
        className="bg-[#d7ff00] hover:bg-[#c6eb00] text-black font-semibold py-3 px-5 rounded-lg flex items-center transition-colors text-[14px]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><line x1="9" x2="15" y1="15" y2="15"/><line x1="12" x2="12" y1="12" y2="18"/></svg>
        Add to today's plan
      </button>
      
      <button 
        onClick={() => saveForLater(workout)}
        className="bg-transparent border border-gray-700 hover:bg-[#1a1c21] text-gray-200 font-semibold py-3 px-5 rounded-lg flex items-center transition-colors text-[14px]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
        Save for later
      </button>
    </div>
  );
}