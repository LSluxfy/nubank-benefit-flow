import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, User, Calendar, Users } from 'lucide-react';
import { UserData } from '../BenefitFlow';

interface StepFiveProps {
  userData: UserData;
  onNext: () => void;
}

export const StepFive = ({ userData, onNext }: StepFiveProps) => {
  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatDate = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-500" 
              style={{ width: '90%' }}
            />
          </div>
        </div>

        {/* Video Section */}
        <div className="mb-8">
          <Card className="border-2 border-primary/20 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white text-center py-4">
              <h2 className="text-xl font-bold">Nubank. ∞ Possibilidades</h2>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative">
                <div style={{position:"relative", paddingTop:"56.25%"}}>
                  <iframe 
                    id="panda-478843d4-723b-45da-95e8-5970f142e17a" 
                    src="https://player-vz-a5f41599-9ad.tv.pandavideo.com.br/embed/?v=478843d4-723b-45da-95e8-5970f142e17a&playOpensFullscreenNative=true" 
                    style={{border:"none", position:"absolute", top:0, left:0}} 
                    allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" 
                    allowFullScreen={true}
                    width="100%" 
                    height="100%"
                  />
                </div>
                <script 
                  dangerouslySetInnerHTML={{
                    __html: `
                      if(!document.querySelector('script[src="https://player.pandavideo.com.br/api.v2.js"]')){
                        let s=document.createElement('script');
                        s.src='https://player.pandavideo.com.br/api.v2.js'; 
                        s.async=true; 
                        document.head.appendChild(s);
                      } 
                      window.pandascripttag = window.pandascripttag || [];
                      window.pandascripttag.push(function (){
                        const panda_id_player = 'panda-478843d4-723b-45da-95e8-5970f142e17a';
                        const p=new PandaPlayer(panda_id_player,{
                          onReady(){
                            p.loadWindowScreen({panda_id_player});
                          }
                        });
                      });
                    `
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Info Section */}
        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 space-y-6">
              {/* CPF */}
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CPF</p>
                  <p className="text-lg font-semibold">{formatCPF(userData.cpf)}</p>
                </div>
              </div>

              {/* Nome */}
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nome Completo</p>
                  <p className="text-lg font-semibold">{userData.name}</p>
                </div>
              </div>

              {/* Data de Nascimento */}
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data de Nascimento</p>
                  <p className="text-lg font-semibold">{formatDate(userData.birthDate)}</p>
                </div>
              </div>

              {/* Nome da Mãe */}
              <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nome da Mãe</p>
                  <p className="text-lg font-semibold">{userData.motherName}</p>
                </div>
              </div>

              {/* Status */}
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg border border-primary/30">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <p className="text-primary font-medium">Sua consulta está em andamento...</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Continue Button */}
          <Button 
            onClick={onNext}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Continuar para Próxima Etapa
          </Button>
        </div>
      </div>
    </div>
  );
};