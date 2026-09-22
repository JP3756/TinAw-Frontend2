import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { TinAwLogo } from './TinAwLogo';

interface HeaderProps {
  currentView: 'explore' | 'detail' | 'how-it-works' | 'about';
  onNavigateHome: () => void;
  onOpenPortal?: () => void;
  onOpenUserModal?: () => void;
  detailTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigateHome,
  detailTitle,
}) => {
  const isDetail = currentView === 'detail';

  return (
    <header className="sticky top-0 z-40 bg-[#f7f9fb]/90 backdrop-blur-md border-b border-[#e2e8f0] px-4 py-3 transition-all">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          {isDetail && (
            <button
              onClick={onNavigateHome}
              className="p-1.5 -ml-1 text-[#191c1e] hover:bg-[#eceef0] rounded-full transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Back to Monitored Places"
            >
              <ChevronLeft className="w-5 h-5 text-[#191c1e]" />
            </button>
          )}

          {/* Logo Mark */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
          >
            <TinAwLogo size="md" />

            {isDetail && (
              <span className="hidden sm:inline font-display font-semibold text-sm text-[#191c1e] border-l border-slate-300 pl-2.5 ml-0.5">
                {detailTitle || 'Water Source Detail'}
              </span>
            )}
          </button>
        </div>

        {/* Center label on small screens when in detail view */}
        {isDetail && (
          <div className="sm:hidden font-display font-semibold text-sm text-[#191c1e] truncate max-w-[170px]">
            {detailTitle || 'Water Source Detail'}
          </div>
        )}
      </div>
    </header>
  );
};
