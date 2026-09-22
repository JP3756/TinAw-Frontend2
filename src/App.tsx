/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { STATIONS } from './data/stations';
import { ActiveTab, WaterStation } from './types';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { DetailScreen } from './components/DetailScreen';
import { HowItWorksScreen } from './components/HowItWorksScreen';
import { AboutScreen } from './components/AboutScreen';
import { BottomNav } from './components/BottomNav';
import { LocationModal } from './components/LocationModal';
import { OperatorPortalModal } from './components/OperatorPortalModal';
import { UserModal } from './components/UserModal';

export default function App() {
  const [currentView, setCurrentView] = useState<'explore' | 'detail' | 'how-it-works' | 'about'>('explore');
  const [selectedStationId, setSelectedStationId] = useState<string>('kalunasan');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [isPortalModalOpen, setIsPortalModalOpen] = useState<boolean>(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);

  const selectedStation: WaterStation =
    STATIONS.find((s) => s.id === selectedStationId) || STATIONS[0];

  const handleNavigateHome = () => {
    setCurrentView('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewStation = (stationId: string) => {
    setSelectedStationId(stationId);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tab: ActiveTab) => {
    setCurrentView(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] font-sans antialiased flex flex-col">
      {/* Top Application Header */}
      <Header
        currentView={currentView}
        onNavigateHome={handleNavigateHome}
        onOpenPortal={() => setIsPortalModalOpen(true)}
        onOpenUserModal={() => setIsUserModalOpen(true)}
        detailTitle="Water Source Detail"
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'explore' && (
          <HomeScreen
            stations={STATIONS}
            selectedStationId={selectedStationId}
            onSelectStation={(id) => setSelectedStationId(id)}
            onViewStation={handleViewStation}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
            onOpenPortal={() => setIsPortalModalOpen(true)}
          />
        )}

        {currentView === 'detail' && (
          <DetailScreen
            station={selectedStation}
            onBack={handleNavigateHome}
            onSelectAnotherLocation={() => setIsLocationModalOpen(true)}
            onOpenPortal={() => setIsPortalModalOpen(true)}
          />
        )}

        {currentView === 'how-it-works' && (
          <HowItWorksScreen onBack={handleNavigateHome} />
        )}

        {currentView === 'about' && (
          <AboutScreen onBack={handleNavigateHome} />
        )}
      </main>

      {/* Floating Bottom Navigation Bar */}
      <BottomNav
        activeTab={currentView === 'detail' ? 'explore' : currentView}
        onChangeTab={handleSelectTab}
      />

      {/* Location Selector Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        stations={STATIONS}
        selectedStationId={selectedStationId}
        onSelectStation={(id) => setSelectedStationId(id)}
        onViewStation={handleViewStation}
      />

      {/* Operator Portal Preview Modal */}
      <OperatorPortalModal
        isOpen={isPortalModalOpen}
        onClose={() => setIsPortalModalOpen(false)}
        stationName={selectedStation.name}
      />

      {/* User Civic Profile Modal */}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
      />
    </div>
  );
}
