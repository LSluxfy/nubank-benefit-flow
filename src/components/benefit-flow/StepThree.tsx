import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, User } from 'lucide-react';
import { UserData } from '../BenefitFlow';

interface StepThreeProps {
  onNext: () => void;
  onBack: () => void;
  userData: UserData;
}

export const StepThree = ({ onNext, onBack, userData }: StepThreeProps) => {
  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.***.***-$4');
  };

  const formatDate = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card className="border-0 shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Confirme seus dados</h1>
          <p className="text-muted-foreground">
            Verifique se as informações estão corretas
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* User Data */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Nome completo</span>
              <span className="text-sm font-medium">{userData.name}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">CPF</span>
              <span className="text-sm font-medium">{formatCPF(userData.cpf)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Data de nascimento</span>
              <span className="text-sm font-medium">{formatDate(userData.birthDate)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Nome da mãe</span>
              <span className="text-sm font-medium">{userData.motherName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Sexo</span>
              <span className="text-sm font-medium">{userData.gender}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Renda declarada</span>
              <span className="text-sm font-medium">{userData.income}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onNext}
              className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90"
            >
              Sim, sou eu
            </Button>

            <Button
              variant="outline"
              onClick={onBack}
              className="w-full h-12 text-lg font-semibold"
            >
              Não sou eu, corrigir dados
            </Button>
          </div>

          {/* Security Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">Seus dados estão seguros</p>
                <p className="text-xs text-blue-600 mt-1">
                  Utilizamos criptografia de ponta a ponta para proteger suas informações pessoais.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};