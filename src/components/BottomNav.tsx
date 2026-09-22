import React from 'react';
import { Compass, Droplets, ShieldCheck } from 'lucide-react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#f7f9fb]/95 backdrop-blur-md border-t border-[#e2e8f0] py-2 px-6 safe-area-inset-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around">
        <button
          onClick={() => onChangeTab('explore')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-all ${
            activeTab === 'explore'
              ? 'text-[#006194] font-semibold'
              : 'text-[#707881] hover:text-[#191c1e]'
          }`}
        >
          <Compass className={`w-5 h-5 ${activeTab === 'explore' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] tracking-wide">Explore</span>
        </button>

        <button
          onClick={() => onChangeTab('how-it-works')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-all ${
            activeTab === 'how-it-works'
              ? 'text-[#006194] font-semibold'
              : 'text-[#707881] hover:text-[#191c1e]'
          }`}
        >
          <Droplets className={`w-5 h-5 ${activeTab === 'how-it-works' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] tracking-wide">How It Works</span>
        </button>

        <button
          onClick={() => onChangeTab('about')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-all ${
            activeTab === 'about'
              ? 'text-[#006194] font-semibold'
              : 'text-[#707881] hover:text-[#191c1e]'
          }`}
        >
          <ShieldCheck className={`w-5 h-5 ${activeTab === 'about' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[11px] tracking-wide">About</span>
        </button>
      </div>
    </nav>
  );
};
