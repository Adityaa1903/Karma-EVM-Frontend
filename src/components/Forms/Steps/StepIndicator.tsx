"use client";

import React from "react";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

const StepIndicator = ({
  currentStep,
  totalSteps,
  stepTitles,
}: StepIndicatorProps) => {
  if (totalSteps <= 1) return null; // Hide the indicator if there's only one step

  return (
    <div className="w-full mb-8">
      {/* Container for the circles and lines */}
      <div className="flex items-center">
        {stepTitles.map((title, index) => {
          const step = index + 1;
          const isCurrentStep = step === currentStep;
          const isCompletedStep = step < currentStep;

          return (
            <React.Fragment key={step}>
              {/* Line before the circle */}
              {index > 0 && (
                <div
                  className={`h-1 mb-8 md:mb-10 flex-1 mx-2 md:mx-4 transition-all ${
                    isCompletedStep ? "bg-emerald-600 dark:bg-emerald-500" : "bg-stone-200 dark:bg-stone-800"
                  }`}
                />
              )}
              {/* Circle container */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompletedStep
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : isCurrentStep
                      ? "bg-amber-600 dark:bg-amber-500 border-amber-600 dark:border-amber-500 text-white dark:text-stone-950 shadow-md shadow-amber-600/20"
                      : "bg-stone-100 dark:bg-stone-800/80 border-stone-300 dark:border-stone-700 text-stone-400 dark:text-stone-500"
                  }`}
                >
                  {isCompletedStep ? (
                    <Check className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <span className="text-xs md:text-sm font-semibold">{step}</span>
                  )}
                </div>
                {/* Title */}
                <div
                  className={`text-xs md:text-sm text-center font-medium mt-2 md:mt-3 whitespace-nowrap transition-all ${
                    isCurrentStep
                      ? "text-amber-700 dark:text-amber-400 font-bold"
                      : isCompletedStep
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-stone-400 dark:text-stone-500"
                  }`}
                >
                  {title}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
