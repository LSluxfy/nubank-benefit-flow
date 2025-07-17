import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Fingerprint, CheckCircle } from 'lucide-react';
import { UserData } from '../BenefitFlow';

interface StepFourProps {
  userData: UserData;
  onNext: () => void;
}

export const StepFour = ({ userData, onNext }: StepFourProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPressed && progress < 100 && !isComplete) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1.5; // Slower progress for longer hold
          if (newProgress >= 100) {
            setIsProcessing(true);
            // Start processing animation for 2 seconds, then complete
            setTimeout(() => {
              setIsProcessing(false);
              setIsComplete(true);
            }, 2000);
            return 100;
          }
          return newProgress;
        });
      }, 60); // Slower interval for ~4 seconds total
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPressed, progress, isComplete]);

  // Reset progress when user releases before completion
  useEffect(() => {
    if (!isPressed && progress > 0 && progress < 100) {
      const resetTimeout = setTimeout(() => {
        setProgress(0);
      }, 200);
      return () => clearTimeout(resetTimeout);
    }
  }, [isPressed, progress]);

  const handleStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isComplete) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Biometric verification started');
      setIsPressed(true);
    }
  }, [isComplete]);

  const handleEnd = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isComplete) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Biometric verification ended, progress:', progress);
      setIsPressed(false);
    }
  }, [isComplete, progress]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Button clicked');
  }, []);

  if (isProcessing) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-12 pb-8">
            <div className="text-center space-y-8">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto relative">
                <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <Fingerprint className="w-8 h-8 text-blue-600 absolute" />
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-blue-600">Processando dados...</h2>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground animate-pulse">
                    ✓ Verificando identidade biométrica
                  </div>
                  <div className="text-sm text-muted-foreground animate-pulse delay-300">
                    ✓ Validando informações pessoais
                  </div>
                  <div className="text-sm text-muted-foreground animate-pulse delay-500">
                    ✓ Confirmando dados bancários
                  </div>
                  <div className="text-sm text-muted-foreground animate-pulse delay-700">
                    ✓ Finalizando verificação
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">
                  Aguarde enquanto processamos suas informações de forma segura...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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

              <button
                onClick={onNext}
                className="w-full mt-6 bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Continuar
              </button>
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
              <button
                type="button"
                className={`absolute inset-8 rounded-full flex items-center justify-center transition-all duration-200 select-none touch-manipulation active:scale-95 ${
                  isPressed 
                    ? 'bg-primary scale-95 shadow-lg' 
                    : 'bg-primary/10 hover:bg-primary/20 hover:scale-105 cursor-pointer'
                } ${isComplete ? 'cursor-default' : 'cursor-pointer'}`}
                onMouseDown={handleStart}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onTouchStart={handleStart}
                onTouchEnd={handleEnd}
                onTouchCancel={handleEnd}
                onClick={handleClick}
                disabled={isComplete}
                style={{ 
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  WebkitTouchCallout: 'none',
                  pointerEvents: 'auto',
                  outline: 'none',
                  border: 'none',
                  background: isPressed ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.1)'
                }}
              >
                <Fingerprint 
                  className={`w-16 h-16 transition-colors duration-200 pointer-events-none ${
                    isPressed ? 'text-white' : 'text-primary'
                  }`} 
                />
              </button>

              {/* Progress Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-sm font-medium text-center mt-20 pointer-events-none">
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
              {progress > 0 && progress < 100 
                ? `Mantenha pressionado... ${Math.round(progress)}%`
                : 'Mantenha pressionado por 4 segundos para verificar'
              }
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