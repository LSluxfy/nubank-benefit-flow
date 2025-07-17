import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Fingerprint, CheckCircle } from 'lucide-react';
import { UserData } from '../BenefitFlow';

interface StepFourProps {
  userData: UserData;
}

export const StepFour = ({ userData }: StepFourProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPressed && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 2;
          if (newProgress >= 100) {
            setIsComplete(true);
            return 100;
          }
          return newProgress;
        });
      }, 50);
    } else if (!isPressed && progress > 0 && progress < 100) {
      // Only reset if not complete
      const resetTimeout = setTimeout(() => {
        setProgress(0);
      }, 100);
      return () => clearTimeout(resetTimeout);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPressed, progress]);

  const handleStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isComplete) {
      e.preventDefault();
      setIsPressed(true);
    }
  }, [isComplete]);

  const handleEnd = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isComplete) {
      e.preventDefault();
      setIsPressed(false);
    }
  }, [isComplete]);

  if (isComplete) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-12 pb-8">
            <div className="text-center space-y-8">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-green-600">Verificação concluída!</h2>
                <p className="text-muted-foreground">
                  Sua identidade foi verificada com sucesso. O benefício será processado em breve.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-700">
                  <strong>Próximos passos:</strong><br />
                  Você receberá uma notificação quando o benefício estiver disponível.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card className="border-0 shadow-lg">
        <CardHeader className="text-center pb-4">
          <h1 className="text-2xl font-bold">Verificação de identidade</h1>
          <p className="text-muted-foreground">
            Pressione e segure o ícone abaixo para verificar sua identidade
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="text-center">
            {/* Biometric Circle */}
            <div className="relative mx-auto w-48 h-48">
              {/* Progress Ring */}
              <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 192 192">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
                  className="text-primary transition-all duration-75"
                  strokeLinecap="round"
                />
              </svg>

              {/* Center Button */}
              <div
                className={`absolute inset-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 select-none ${
                  isPressed 
                    ? 'bg-primary scale-95 shadow-lg' 
                    : 'bg-primary/10 hover:bg-primary/20 hover:scale-105'
                }`}
                onMouseDown={handleStart}
                onMouseUp={handleEnd}
                onTouchStart={handleStart}
                onTouchEnd={handleEnd}
                onTouchCancel={handleEnd}
                style={{ 
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  WebkitTouchCallout: 'none',
                  pointerEvents: 'auto'
                }}
              >
                <Fingerprint 
                  className={`w-16 h-16 transition-colors duration-200 ${
                    isPressed ? 'text-white' : 'text-primary'
                  }`} 
                />
              </div>

              {/* Progress Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-medium text-center mt-20">
                  {progress}%
                </span>
              </div>
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-lg font-medium">
              {isPressed ? 'Verificando...' : 'Toque e segure'}
            </p>
            <p className="text-sm text-muted-foreground">
              Mantenha pressionado até a verificação ser concluída
            </p>
          </div>

          {/* Security Badge */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <Fingerprint className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-800">Verificação Biométrica</p>
                <p className="text-xs text-blue-600">
                  Seus dados biométricos não são armazenados
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};