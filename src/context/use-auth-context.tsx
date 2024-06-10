'use client';
import React, { useState } from "react";

interface InitailProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const initialValue: InitailProps = {
  currentStep: 1,
  setCurrentStep: () => {},
};

export const AuthContext = React.createContext(initialValue);
const { Provider } = AuthContext;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(initialValue.currentStep);
  return (
    <Provider value={{ currentStep, setCurrentStep }}>{children}</Provider>
  );
};

export const useAuthContext = () => {
  const state = React.useContext(AuthContext);
  return state;
};
