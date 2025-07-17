import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { UserData } from '../BenefitFlow';
import { EnhancedLogo } from '@/components/ui/enhanced-logo';
import nubankLogo from '@/assets/nubank-logo.png';

interface StepOneProps {
  onNext: () => void;
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
}

export const StepOne = ({ onNext, userData, updateUserData }: StepOneProps) => {
  const [cpf, setCpf] = useState(userData.cpf);
  const [birthDate, setBirthDate] = useState(userData.birthDate);

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
    updateUserData({ cpf: formatted });
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value);
    updateUserData({ birthDate: e.target.value });
  };

  const handleSubmit = () => {
    if (cpf.length === 14 && birthDate) {
      onNext();
    }
  };

  const isValid = cpf.length === 14 && birthDate;

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="text-sm text-muted-foreground">
          Benefício <ChevronRight className="w-4 h-4 inline mx-1" />
          Indenização <ChevronRight className="w-4 h-4 inline mx-1" />
          Análise
        </div>
      </div>

      {/* Main Card */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <EnhancedLogo 
              src={nubankLogo} 
              alt="Nubank" 
              size="lg"
              removeBackground={true}
            />
          </div>
          <h1 className="text-2xl font-bold">Consulta de benefício</h1>
          <p className="text-muted-foreground">
            Digite suas informações para consultar o benefício disponível
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              value={cpf}
              onChange={handleCPFChange}
              placeholder="000.000.000-00"
              maxLength={14}
              className="h-12 text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">Data de nascimento</Label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={handleBirthDateChange}
              className="h-12 text-lg"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90"
          >
            Consultar benefício
          </Button>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Seus dados estão protegidos e seguros conosco
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};