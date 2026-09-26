import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default async function WorkoutDetail({ params }) {
  const workouts = await params;
  const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${workouts.id}`);
  
  if (!res.ok) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Workout not found</h1>
        <Link href="/" className="text-[#cbfb45] hover:underline">Go back home</Link>
      </div>
    );
  }
  
  const workout = await res.json();

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10">
      <div className="max-w-[1400px] mx-auto">
        <Link href="/" className="inline-flex items-center text-[#cbfb45] hover:text-[#bceb3b] mb-10 font-semibold transition-colors uppercase tracking-wide text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6"/></svg>
          Back to Library
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          <div className="w-full lg:w-[45%] flex-shrink-0">
            <div className="rounded-[32px] overflow-hidden bg-[#131417] border border-[#22242a] h-full shadow-2xl">
              <Image 
                width={500}
                height={500}
                src={workout.image} 
                alt={workout.name} 
                className="w-full h-full object-cover min-h-[400px] lg:min-h-[700px]"
              />
            </div>
          </div>

       
          <div className="w-full lg:w-[55%] flex flex-col pt-2 pb-8">
         
            <div className="flex flex-wrap gap-2 mb-6">
              {workout.muscleGroups?.map((group, idx) => (
                <span key={idx} className="text-[13px] font-bold text-[#cbfb45] uppercase tracking-widest bg-[#cbfb45]/10 px-3.5 py-1.5 rounded-sm">
                  {group}
                </span>
              ))}
            </div>

            
            <h1 className="text-6xl lg:text-[80px] font-black text-white uppercase font-['Bebas_Neue'] tracking-tight leading-[0.9] mb-6">
              {workout.name}
            </h1>
            
            <p className="text-gray-400 text-xl leading-relaxed mb-10">
              {workout.description}
            </p>

     
            <div className="bg-[#131417] border border-[#22242a] rounded-[24px] p-8 mb-10 grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-6">
              <div>
                <div className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-2">Equipment</div>
                <div className="text-gray-200 font-semibold text-lg">{workout.equipment}</div>
              </div>
              <div>
                <div className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-2">Difficulty</div>
                <div className="text-gray-200 font-semibold text-lg">{workout.difficulty}</div>
              </div>
              <div>
                <div className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-2">Rating</div>
                <div className="text-[#cbfb45] font-bold text-lg flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  {workout.rating}
                </div>
              </div>
              <div>
                <div className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-2">Sets & Reps</div>
                <div className="text-gray-200 font-semibold text-lg">{workout.sets} <span className="text-gray-500 mx-1">x</span> {workout.reps}</div>
              </div>
              <div>
                <div className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-2">Duration</div>
                <div className="text-gray-200 font-semibold text-lg">{workout.duration} min</div>
              </div>
              <div>
                <div className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-2">Calories</div>
                <div className="text-gray-200 font-semibold text-lg">{workout.caloriesBurned} kcal</div>
              </div>
            </div>

    
            <div className="mb-12 flex-grow">
              <h3 className="text-2xl font-bold text-white uppercase font-['Bebas_Neue'] tracking-wide mb-6">Instructions</h3>
              <ol className="space-y-5">
                {workout.instructions?.map((step, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-[#1e2025] border border-[#2a2d35] text-[#cbfb45] font-bold text-[15px] mr-5 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-gray-300 leading-relaxed text-[17px] pt-1">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

      
            <div className="flex flex-col sm:flex-row gap-5">
              <button className="flex-1 bg-[#cbfb45] hover:bg-[#bceb3b] text-black font-black uppercase tracking-wide py-5 px-6 rounded-xl flex items-center justify-center transition-colors text-[15px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                Add to today's plan
              </button>
              <button className="flex-1 bg-[#131417] border-2 border-[#22242a] hover:bg-[#1a1b20] hover:border-gray-700 text-white font-bold uppercase tracking-wide py-5 px-6 rounded-xl flex items-center justify-center transition-colors text-[15px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                Save for later
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

