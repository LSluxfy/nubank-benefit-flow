import { Instagram, Facebook, Twitter, Linkedin, Youtube, Phone, Mail, MessageCircle, Clock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      {/* Main Footer Content */}
      <div className="px-6 py-12">
        {/* Nu Logo and Description */}
        <div className="text-center mb-12">
          <div className="text-4xl font-bold mb-6">nu</div>
          <p className="text-white/90 text-lg max-w-md mx-auto leading-relaxed">
            Banco digital que simplifica sua vida financeira e oferece as melhores soluções para você.
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center">
            <Instagram className="w-6 h-6" />
          </div>
          <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center">
            <Facebook className="w-6 h-6" />
          </div>
          <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center">
            <Twitter className="w-6 h-6" />
          </div>
          <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center">
            <Linkedin className="w-6 h-6" />
          </div>
          <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center">
            <Youtube className="w-6 h-6" />
          </div>
        </div>

        {/* Help Section */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold mb-6">Ajuda</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Phone className="w-5 h-5" />
              <span className="text-lg">0800 591 2117</span>
            </div>
            
            <div className="flex items-center justify-center gap-3">
              <Mail className="w-5 h-5" />
              <span className="text-lg">ajuda@nubank.com.br</span>
            </div>
            
            <div className="flex items-center justify-center gap-3">
              <MessageCircle className="w-5 h-5" />
              <span className="text-lg">Chat no app</span>
            </div>
            
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-5 h-5" />
              <span className="text-lg">Atendimento 24h</span>
            </div>
          </div>
        </div>

        {/* Security Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm">Dados Protegidos</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm">Transações Seguras</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm">Regulamentado pelo BC</span>
          </div>
        </div>

        {/* Company Info */}
        <div className="text-center text-sm text-white/70 space-y-2">
          <p>Nu Pagamentos S.A. - Instituição de Pagamento autorizada pelo Banco Central do Brasil.</p>
          <p>
            CNPJ: 18.236.120/0001-58 | Rua Capote Valente, 39 - São Paulo, SP -{' '}
            <span className="text-blue-300 underline">05409-000</span>
          </p>
          <p>© 2025 Nu Pagamentos S.A. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};