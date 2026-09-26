"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const [planWorkouts, setPlanWorkouts] = useState([]);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [toast, setToast] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false); 
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem('fitlog_plan');
      const storedSaved = localStorage.getItem('fitlog_saved');
      if (storedPlan) setPlanWorkouts(JSON.parse(storedPlan));
      if (storedSaved) setSavedWorkouts(JSON.parse(storedSaved));
    } catch (e) {
      console.error("Could not load from localStorage", e);
    }
    setIsLoaded(true); 
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('fitlog_plan', JSON.stringify(planWorkouts));
      localStorage.setItem('fitlog_saved', JSON.stringify(savedWorkouts));
    }
  }, [planWorkouts, savedWorkouts, isLoaded]);

  const showToast = (message) => {
    setToast({ message });
    setTimeout(() => setToast(null), 3000);
  };

  const addToPlan = (workout) => {
    if (!planWorkouts.find(w => w.id === workout.id)) {
      setPlanWorkouts(prev => [...prev, workout]);
      showToast("Added to today's plan!");
    } else {
      showToast("Already in today's plan.");
    }
  };

  const saveForLater = (workout) => {
    if (!savedWorkouts.find(w => w.id === workout.id)) {
      setSavedWorkouts(prev => [...prev, workout]);
      showToast('Saved for later!');
    } else {
      showToast('Already saved for later.');
    }
  };

  const removeFromPlan = (id) => {
    setPlanWorkouts(prev => prev.filter(w => w.id !== id));
    showToast("Removed from plan.");
  };

  const removeFromSaved = (id) => {
    setSavedWorkouts(prev => prev.filter(w => w.id !== id));
    showToast("Removed from saved.");
  };

  return (
    <WorkoutContext.Provider value={{ 
      planWorkouts, 
      savedWorkouts, 
      addToPlan, 
      saveForLater,
      removeFromPlan,
      removeFromSaved,
      isLoaded 
    }}>
      {children}
      {toast && (
        <div className="toast toast-bottom toast-center z-50">
          <div className="alert bg-[#cbfb45] text-black font-bold shadow-xl border-none">
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </WorkoutContext.Provider>
  );
}

export function useWorkoutContext() {
  return useContext(WorkoutContext);
}