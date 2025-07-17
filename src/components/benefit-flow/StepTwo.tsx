import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, Check } from 'lucide-react';
import { UserData } from '../BenefitFlow';

interface StepTwoProps {
  onNext: () => void;
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

export const StepTwo = ({ onNext, userData, updateUserData }: StepTwoProps) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('Consultando dados oficiais do Governo Federal');

  const texts = [
    'Consultando dados oficiais do Governo Federal',
    'Verificando informações pessoais',
    'Processando dados de benefício',
    'Concluindo verificação'
  ];

  useEffect(() => {
    // Simulate loading progress
    const timer = setTimeout(() => {
      setProgress(25);
    }, 500);

    const timer2 = setTimeout(() => {
      setProgress(48);
      setCurrentText(texts[1]);
    }, 1500);

    const timer3 = setTimeout(() => {
      setProgress(75);
      setCurrentText(texts[2]);
    }, 2500);

    const timer4 = setTimeout(() => {
      setProgress(100);
      setCurrentText(texts[3]);
      
      // Mock data retrieval
      updateUserData({
        name: 'João Silva Santos',
        motherName: 'Maria Santos Silva',
        gender: 'Masculino',
        income: 'R$ 2.500,00'
      });
    }, 3500);

    const timer5 = setTimeout(() => {
      onNext();
    }, 4500);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onNext, updateUserData]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card className="border-0 shadow-lg">
        <CardContent className="pt-12 pb-8">
          <div className="text-center space-y-8">
            {/* Animated Shield Icon */}
            <div className="relative">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Shield className="w-12 h-12 text-primary" />
              </div>
              {progress === 100 && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-scale-in">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Verificando informações...</h2>
              <p className="text-muted-foreground text-sm">{currentText}</p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground">{progress}% concluído</p>
            </div>

            {/* Security Badge */}
            <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700 font-medium">Verificação Segura</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};