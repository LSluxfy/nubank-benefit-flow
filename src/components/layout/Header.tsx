import { Menu, Search, User, MoreVertical, User2, Grid3X3, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import nubankLogo from '@/assets/nubank-logo.png';

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      {/* Top Navigation */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img src={nubankLogo} alt="Nubank" className="h-12" />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-primary">
            <MoreVertical className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary">
            <Palette className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary">
            <Grid3X3 className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white bg-primary rounded-full px-6">
            <User2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Menu className="w-5 h-5 text-primary" />
          <span className="text-gray-600">Benefício &gt; Indenização &gt; Análise</span>
        </div>
        <Search className="w-5 h-5 text-primary" />
      </div>
    </header>
  );
};