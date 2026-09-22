import React, { useState } from 'react';
import {
  MapPin,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  RotateCw,
  ExternalLink,
  ChevronRight,
  Map as MapIcon,
  Radio,
  SlidersHorizontal,
  ArrowUpDown,
  Check,
  Lock,
} from 'lucide-react';
import { WaterStation } from '../types';
import { CebuWaterMap } from './CebuWaterMap';
import { TinAwLogo } from './TinAwLogo';
import buhisanDamImage from '../assets/images/buhisan_dam_1790062748577.jpg';

interface HomeScreenProps {
  stations: WaterStation[];
  selectedStationId: string;
  onSelectStation: (stationId: string) => void;
  onViewStation: (stationId: string) => void;
  onOpenLocationModal: () => void;
  onOpenPortal: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  stations,
  selectedStationId,
  onSelectStation,
  onViewStation,
  onOpenLocationModal,
  onOpenPortal,
}) => {
  const [activeFilterChip, setActiveFilterChip] = useState<'all' | 'cebu' | 'kalunasan'>('all');

  const selectedStation =
    stations.find((s) => s.id === selectedStationId) || stations[0];

  const primaryStation = stations[0]; // Barangay Kalunasan
  const otherStations = stations.slice(1); // Guadalupe, Lahug

  return (
    <div className="min-h-screen bg-[#f7f9fb] pb-24 text-[#191c1e] animate-in fade-in duration-200">
      {/* Civic Reflection Pool Pavilion Hero Banner */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[300px] overflow-hidden bg-slate-900">
        {/* Buhisan Dam Reservoir Hero Banner */}
        <img
          src={buhisanDamImage}
          alt="Buhisan Dam Reservoir, Cebu"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover brightness-[0.92]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#f7f9fb]" />
      </div>

      {/* Main Container */}
      <div className="max-w-xl mx-auto px-4 -mt-16 sm:-mt-20 relative z-20 space-y-5">
        {/* HERO CARD: "Know the water around you." */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#e2e8f0] shadow-md space-y-4">
          {/* Tagline */}
          <div className="flex items-center gap-2 text-[#006194]">
            <TinAwLogo size="sm" showText={false} />
            <span className="text-[11px] font-bold tracking-wider text-[#006194]">
              TinAw PUBLIC NETWORK
            </span>
          </div>

          {/* Heading */}
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#191c1e] tracking-tight leading-tight">
              Know the water around you.
            </h1>
            <p className="text-xs sm:text-sm text-[#707881] mt-1.5 leading-relaxed">
              Explore water-quality information from monitored locations across community points.
            </p>
          </div>

          {/* Location Selector Section */}
          <div className="bg-[#f7f9fb] rounded-2xl p-3 sm:p-4 border border-[#e2e8f0] space-y-3">
            {/* Header row */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#707881] uppercase tracking-wider text-[11px]">
                SELECT A LOCATION
              </span>
              <button
                onClick={onOpenLocationModal}
                className="inline-flex items-center gap-1 font-semibold text-[#006194] hover:text-[#004b73] cursor-pointer"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>Manual selection</span>
              </button>
            </div>

            {/* Dropdown Input Box */}
            <button
              onClick={onOpenLocationModal}
              className="w-full bg-white hover:bg-slate-50 active:scale-99 border border-[#cbd5e1] rounded-xl px-3.5 py-2.5 flex items-center justify-between text-left transition-all shadow-2xs group cursor-pointer"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <MapPin className="w-4 h-4 text-[#006194] shrink-0" />
                <span className="font-display font-semibold text-sm text-[#191c1e] truncate">
                  {selectedStation.name}, Cebu ...
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-[#707881] group-hover:text-[#191c1e] shrink-0" />
            </button>

            {/* Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pt-1 no-scrollbar">
              <button
                onClick={() => {
                  setActiveFilterChip('all');
                  onSelectStation('kalunasan');
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilterChip === 'all'
                    ? 'bg-[#006194] text-white shadow-xs'
                    : 'bg-[#eceef0] text-[#3f4850] hover:bg-[#e0e3e5]'
                }`}
              >
                All Monitored Points
              </button>

              <button
                onClick={() => {
                  setActiveFilterChip('cebu');
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilterChip === 'cebu'
                    ? 'bg-[#006194] text-white shadow-xs'
                    : 'bg-[#eceef0] text-[#3f4850] hover:bg-[#e0e3e5]'
                }`}
              >
                Cebu City
              </button>

              <button
                onClick={() => {
                  setActiveFilterChip('kalunasan');
                  onSelectStation('kalunasan');
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilterChip === 'kalunasan'
                    ? 'bg-[#006194] text-white shadow-xs'
                    : 'bg-[#eceef0] text-[#3f4850] hover:bg-[#e0e3e5]'
                }`}
              >
                Kalunas...
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => onViewStation(selectedStationId)}
              className="w-full mt-2 py-3 px-4 bg-[#006194] hover:bg-[#004b73] active:scale-98 text-white rounded-xl font-display font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <span>Check Water Status</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3-METRIC STAT STRIP */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {/* Active Stations */}
          <div className="bg-white rounded-2xl p-3.5 border border-[#e2e8f0] shadow-xs text-center">
            <span className="text-[11px] font-medium text-[#707881] block">
              Active Stations
            </span>
            <span className="font-display font-bold text-2xl text-[#006194] block my-0.5 tabular-nums">
              3
            </span>
            <span className="text-[11px] font-semibold text-[#16A34A] inline-flex items-center gap-0.5">
              <span>✓</span> Realtime
            </span>
          </div>

          {/* Recirculation */}
          <div className="bg-white rounded-2xl p-3.5 border border-[#e2e8f0] shadow-xs text-center">
            <span className="text-[11px] font-medium text-[#707881] block">
              Recirculation
            </span>
            <span className="font-display font-bold text-xl sm:text-2xl text-[#191c1e] block my-0.5 whitespace-nowrap">
              1 Site
            </span>
            <span className="text-[11px] font-semibold text-[#707881]">
              Auto-cycle
            </span>
          </div>

          {/* Civic Index */}
          <div className="bg-white rounded-2xl p-3.5 border border-[#e2e8f0] shadow-xs text-center">
            <span className="text-[11px] font-medium text-[#707881] block">
              Civic Index
            </span>
            <span className="font-display font-bold text-2xl text-[#191c1e] block my-0.5 tabular-nums">
              94%
            </span>
            <span className="text-[11px] font-semibold text-[#16A34A]">
              Safe Range
            </span>
          </div>
        </div>

        {/* EXPLORE WATER LOCATIONS SECTION */}
        <div className="space-y-3">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-lg text-[#191c1e] tracking-tight">
              Explore Water Locations
            </h2>
            <span className="text-xs font-bold text-[#006194] bg-sky-50 px-2 py-0.5 rounded-full">
              3 Detected
            </span>
          </div>
          <p className="text-xs text-[#707881] -mt-1">
            View the latest TinAw water status for each monitored location.
          </p>

          {/* Card 1: Primary Deployment (Barangay Kalunasan) */}
          <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-xs space-y-4">
            {/* Header with Primary Deployment tag & Good pill */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#006194]">
                <ShieldCheck className="w-4 h-4 text-[#006194]" />
                <span>Primary Deployment</span>
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534]">
                <span>✓</span> Good
              </span>
            </div>

            {/* Station Title */}
            <div>
              <h3 className="font-display font-extrabold text-xl text-[#191c1e] tracking-tight">
                {primaryStation.name}
              </h3>
              <p className="text-xs text-[#707881] mt-0.5">
                {primaryStation.locationSubtitle}
              </p>
            </div>

            {/* Usability Score Box with Sparkline */}
            <div className="bg-[#f7f9fb] rounded-xl p-4 border border-[#eceef0] flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider block">
                  WATER USABILITY SCORE
                </span>
                <div className="font-display font-extrabold text-2xl text-[#191c1e] mt-0.5">
                  XX <span className="text-sm font-semibold text-[#707881]">/ 100</span>
                </div>
                <span className="text-[11px] text-[#707881] block mt-0.5">
                  (Assessment scale in validation)
                </span>
              </div>

              {/* Sparkline Graphic */}
              <div className="flex flex-col items-end">
                <div className="w-24 h-7">
                  <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                    <path
                      d="M0,15 Q25,28 50,15 T100,8"
                      fill="none"
                      stroke="#16A34A"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="100" cy="8" r="3" fill="#16A34A" />
                  </svg>
                </div>
                <span className="text-xs font-bold text-[#16A34A] mt-1">
                  99.2% Clarity
                </span>
              </div>
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between text-xs text-[#707881]">
              <div className="flex items-center gap-1.5 text-emerald-700">
                <RotateCw className="w-3.5 h-3.5 text-emerald-600" />
                <span>Updated 15 mins ago • Recirculation Active</span>
              </div>
              <span className="font-semibold text-slate-500">Station #01</span>
            </div>

            {/* View Water Status Button */}
            <button
              onClick={() => {
                onSelectStation(primaryStation.id);
                onViewStation(primaryStation.id);
              }}
              className="w-full py-3 px-4 bg-[#006194] hover:bg-[#004b73] active:scale-98 text-white rounded-xl font-display font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <span>View Water Status</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Barangay Guadalupe */}
          {otherStations.map((station) => (
            <div
              key={station.id}
              className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-xs space-y-4"
            >
              {/* Top Row: Title + Status Pill */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#191c1e] tracking-tight">
                    {station.name}
                  </h3>
                  <p className="text-xs text-[#707881] mt-0.5">
                    {station.locationSubtitle}
                  </p>
                </div>

                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                    station.status === 'fair'
                      ? 'bg-[#e0f2fe] text-[#0369a1]'
                      : 'bg-[#eceef0] text-[#3f4850]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      station.status === 'fair' ? 'bg-[#0284c7]' : 'bg-[#707881]'
                    }`}
                  />
                  {station.statusLabel}
                </span>
              </div>

              {/* Usability & Cycle Status Grid */}
              <div className="bg-[#f7f9fb] rounded-xl p-3.5 border border-[#eceef0] grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] font-medium text-[#707881] block">
                    Usability Rating
                  </span>
                  <div className="font-display font-bold text-base text-[#191c1e] mt-0.5">
                    XX <span className="text-xs font-medium text-[#707881]">/ 100</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-medium text-[#707881] block">
                    Cycle Status
                  </span>
                  <span className="font-display font-semibold text-xs text-[#191c1e] block mt-0.5">
                    {station.id === 'guadalupe' ? 'Periodic Sweep' : 'Sensor Calibration'}
                  </span>
                </div>
              </div>

              {/* Footer row */}
              <div className="flex items-center justify-between text-xs text-[#707881]">
                <div className="flex items-center gap-1">
                  <span>🕒</span>
                  <span>Updated {station.updatedAgo}</span>
                </div>
                <span className="font-semibold text-slate-500">
                  Station {station.stationNumber}
                </span>
              </div>

              {/* View Water Status Button */}
              <button
                onClick={() => {
                  onSelectStation(station.id);
                  onViewStation(station.id);
                }}
                className="w-full py-2.5 px-4 bg-[#eceef0] hover:bg-[#e0e3e5] active:scale-98 text-[#3f4850] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>View Water Status</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* EXPLORE ON MAP SECTION */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-lg text-[#191c1e] tracking-tight">
              Explore on Map
            </h2>
            <MapIcon className="w-5 h-5 text-[#006194]" />
          </div>
          <p className="text-xs text-[#707881] -mt-1">
            Interactive geographic view of public monitoring stations
          </p>

          <CebuWaterMap
            stations={stations}
            selectedStationId={selectedStationId}
            onSelectStation={onSelectStation}
            onViewStation={onViewStation}
          />
        </div>

        {/* CIVIC TRANSPARENCY COMMITMENT */}
        <div className="bg-[#e0f2fe]/40 rounded-2xl p-5 border border-sky-200 shadow-xs space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#006194] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-display font-bold text-base text-[#0C2340]">
                Civic Transparency Commitment
              </h3>
              <p className="text-xs text-[#3f4850] mt-1.5 leading-relaxed">
                TinAw provides automated sensor monitoring and recirculation data for public awareness and community water management.
              </p>
            </div>
          </div>

          {/* Telemetry Protocol Row */}
          <div className="bg-white/80 rounded-xl p-3 border border-sky-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-[#006194] font-semibold">
              <Radio className="w-3.5 h-3.5" />
              <span>Telemetry Protocol</span>
            </div>
            <span className="font-medium text-[#191c1e]">
              Turbidity, pH, Flow Rate
            </span>
          </div>

          {/* Operator Portal Button */}
          <button
            onClick={onOpenPortal}
            className="w-full py-3 px-4 bg-[#eceef0] hover:bg-[#e0e3e5] active:scale-98 text-[#3f4850] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-[#707881]" />
            <span>Operator Portal — Coming Soon</span>
          </button>
        </div>
      </div>
    </div>
  );
};
