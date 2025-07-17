import { useState } from 'react';
import { StepOne } from './benefit-flow/StepOne';
import { StepTwo } from './benefit-flow/StepTwo';
import { StepThree } from './benefit-flow/StepThree';
import { StepFour } from './benefit-flow/StepFour';
import { StepFive } from './benefit-flow/StepFive';
import { StepSix } from './benefit-flow/StepSix';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';

export interface UserData {
  cpf: string;
  birthDate: string;
  name: string;
  motherName: string;
  gender: string;
  income: string;
}

export const BenefitFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    cpf: '',
    birthDate: '',
    name: '',
    motherName: '',
    gender: '',
    income: ''
  });

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {currentStep === 1 && (
          <StepOne 
            onNext={nextStep} 
            userData={userData}
            updateUserData={updateUserData}
          />
        )}
        {currentStep === 2 && (
          <StepTwo 
            onNext={nextStep}
            userData={userData}
            updateUserData={updateUserData}
          />
        )}
        {currentStep === 3 && (
          <StepThree 
            onNext={nextStep}
            onBack={prevStep}
            userData={userData}
          />
        )}
        {currentStep === 4 && (
          <StepFour 
            userData={userData} 
            onNext={nextStep}
          />
        )}
        {currentStep === 5 && (
          <StepFive 
            userData={userData}
            onNext={nextStep}
          />
        )}
        {currentStep === 6 && (
          <StepSix 
            userData={userData}
            onNext={nextStep}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};