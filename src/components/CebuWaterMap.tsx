import React, { useState } from 'react';
import { Plus, Minus, Maximize2, Minimize2, Droplet, Compass, Radio } from 'lucide-react';
import { WaterStation } from '../types';

interface CebuWaterMapProps {
  stations: WaterStation[];
  selectedStationId: string;
  onSelectStation: (stationId: string) => void;
  onViewStation: (stationId: string) => void;
}

export const CebuWaterMap: React.FC<CebuWaterMapProps> = ({
  stations,
  selectedStationId,
  onSelectStation,
  onViewStation,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [compassBearing, setCompassBearing] = useState<number>(0);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2.0));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.85));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setCompassBearing(0);
  };

  const handleCompassClick = () => {
    setCompassBearing((prev) => (prev + 90) % 360);
  };

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-[#d8dadc] bg-[#f8fafc] shadow-sm select-none transition-all duration-300 ${
        isExpanded ? 'aspect-[4/3] sm:aspect-[16/9]' : 'aspect-[4/3] sm:aspect-[16/10]'
      }`}
    >
      {/* Map Canvas with SVG Pastel Basemap */}
      <div className="relative w-full h-full overflow-hidden bg-[#eef2f6]">
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out origin-center"
          style={{
            transform: `scale(${zoomLevel}) rotate(${compassBearing}deg)`,
          }}
        >
          {/* Pastel Mapbox / Apple Maps inspired vector basemap */}
          <svg
            viewBox="0 0 640 460"
            className="w-full h-full object-cover"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Soft water gradient (Mactan Channel / Cebu Strait) */}
              <linearGradient id="pastelWater" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#dbeafe" />
                <stop offset="100%" stopColor="#bfdbfe" />
              </linearGradient>

              {/* Highland mint terrain (Central Cebu Protected Landscape) */}
              <linearGradient id="mintHighland" x1="0" y1="0" x2="0.6" y2="1">
                <stop offset="0%" stopColor="#e2eee5" />
                <stop offset="100%" stopColor="#d6e8dc" />
              </linearGradient>

              {/* Soft lavender hillside plateau */}
              <linearGradient id="lavenderSlope" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ede9fe" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#e0e7ff" stopOpacity="0.7" />
              </linearGradient>

              {/* Subtle road grid pattern */}
              <pattern id="streetGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#e2e8f0" strokeWidth="0.75" />
              </pattern>
            </defs>

            {/* Base landmass (Clean modern light grey) */}
            <rect width="640" height="460" fill="#f1f5f9" />
            <rect width="640" height="460" fill="url(#streetGrid)" opacity="0.6" />

            {/* Highland Forest Topography (Busay & Balamban watershed) */}
            <path
              d="M0,0 L360,0 C380,50 340,110 300,130 C220,170 140,140 80,180 C30,210 0,180 0,180 Z"
              fill="url(#mintHighland)"
            />

            {/* Secondary Lavender Ridge (Transcentral / Tops Cebu foothills) */}
            <path
              d="M80,0 L290,0 C270,70 210,110 130,90 C80,80 50,50 80,0 Z"
              fill="url(#lavenderSlope)"
            />

            <path
              d="M190,120 C240,140 280,110 360,150 C410,180 430,220 380,240 C320,260 270,220 220,190 Z"
              fill="#e2eee5"
              opacity="0.8"
            />

            {/* Urban Neighborhood Blocks (Soft Warm Pastel) */}
            <rect x="230" y="270" width="80" height="55" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
            <rect x="330" y="260" width="105" height="60" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
            <rect x="270" y="340" width="110" height="70" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
            <rect x="400" y="335" width="90" height="65" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

            {/* Sea Area: Cebu Strait / Mactan Channel (Southeast corner) */}
            <path
              d="M450,460 Q490,390 550,350 Q590,325 640,315 L640,460 Z"
              fill="url(#pastelWater)"
            />
            <text x="545" y="420" fill="#2563eb" fontSize="10" fontWeight="700" opacity="0.6" letterSpacing="0.08em">
              CEBU STRAIT
            </text>

            {/* River Waterways */}
            {/* Guadalupe River Flow */}
            <path
              d="M175,80 Q225,160 245,220 T230,300 T265,370 T310,430 T360,460"
              fill="none"
              stroke="#93c5fd"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Lahug / Mahiga Creek Flow */}
            <path
              d="M370,90 Q365,165 405,235 T455,320 T480,355"
              fill="none"
              stroke="#93c5fd"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Street Network (Crisp White Corridors with casing) */}
            {/* Transcentral Highway */}
            <path
              d="M0,65 Q135,60 235,105 T395,155 T580,210"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Gorordo / Salinas Ave corridor */}
            <path
              d="M250,180 L410,340"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Escario / V. Rama main arteries */}
            <path
              d="M165,260 L465,245"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M205,320 L510,340"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M330,240 L350,440"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Toponym & Landmark Labels (Clean, minimal typography) */}
            <g className="select-none font-sans" opacity="0.75">
              <text x="140" y="50" fill="#64748b" fontSize="9" fontWeight="700" letterSpacing="0.06em">
                BUSAY HIGHLANDS
              </text>
              <circle cx="280" cy="50" r="2.5" fill="#94a3b8" />
              <text x="290" y="53" fill="#64748b" fontSize="9" fontWeight="600">
                Tops Lookout
              </text>
              <text x="455" y="85" fill="#64748b" fontSize="9" fontWeight="600" letterSpacing="0.04em">
                TALAMBAN
              </text>
              <text x="135" y="275" fill="#94a3b8" fontSize="8" fontWeight="600">
                Monterrazas
              </text>
              <text x="425" y="380" fill="#334155" fontSize="10" fontWeight="700" letterSpacing="0.05em">
                CEBU CITY
              </text>
              <text x="260" y="380" fill="#94a3b8" fontSize="8" fontWeight="600">
                Tisa
              </text>
            </g>
          </svg>

          {/* CUSTOM PIN MARKERS */}

          {/* 1. ACTIVE STATION: BARANGAY KALUNASAN */}
          {/* Highlighted pulse pin with emerald container, droplet icon, and floating pill label */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group"
            style={{ left: '42%', top: '44%' }}
            onClick={() => {
              onSelectStation('kalunasan');
              onViewStation('kalunasan');
            }}
          >
            <div className="flex flex-col items-center">
              {/* Floating Pill Label: 'Kalunasan (Active)' */}
              <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-md border border-emerald-200 text-xs font-bold text-[#0C2340] mb-1.5 whitespace-nowrap flex items-center gap-1.5 group-hover:scale-105 transition-all">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Kalunasan (Active)</span>
              </div>

              {/* Pin: Emerald green container with inner water droplet icon and pulse rings */}
              <div className="relative flex items-center justify-center">
                {/* Dual ripple animation */}
                <span className="absolute w-10 h-10 rounded-full bg-emerald-400/35 animate-ping" />
                <span className="absolute w-7 h-7 rounded-full bg-emerald-500/20 animate-pulse" />

                {/* Circular emerald container */}
                <div className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg border-2 border-white transition-transform active:scale-95">
                  <Droplet className="w-4 h-4 fill-white" />
                </div>
              </div>
            </div>
          </div>

          {/* 2. SECONDARY STATION: BARANGAY GUADALUPE */}
          {/* Subdued slate/grey station pin for adjacent point */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
            style={{ left: '33%', top: '65%' }}
            onClick={() => {
              onSelectStation('guadalupe');
              onViewStation('guadalupe');
            }}
          >
            <div className="flex flex-col items-center">
              {/* Floating Pill Label: 'Guadalupe' */}
              <div className="bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full shadow-xs border border-slate-200 text-[11px] font-semibold text-[#475569] mb-1 whitespace-nowrap group-hover:bg-white group-hover:text-[#0C2340] transition-all">
                Guadalupe
              </div>

              {/* Subdued slate/grey pin */}
              <div className="w-6 h-6 rounded-full bg-[#64748b] hover:bg-[#475569] text-white flex items-center justify-center shadow-md border-2 border-white transition-transform active:scale-95">
                <Radio className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          {/* 3. SECONDARY STATION: BARANGAY LAHUG */}
          {/* Subdued slate/grey station pin for adjacent point */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
            style={{ left: '63%', top: '34%' }}
            onClick={() => {
              onSelectStation('lahug');
              onViewStation('lahug');
            }}
          >
            <div className="flex flex-col items-center">
              {/* Floating Pill Label: 'Lahug' */}
              <div className="bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full shadow-xs border border-slate-200 text-[11px] font-semibold text-[#475569] mb-1 whitespace-nowrap group-hover:bg-white group-hover:text-[#0C2340] transition-all">
                Lahug
              </div>

              {/* Subdued slate/grey pin */}
              <div className="w-6 h-6 rounded-full bg-[#64748b] hover:bg-[#475569] text-white flex items-center justify-center shadow-md border-2 border-white transition-transform active:scale-95">
                <span className="text-[10px] font-bold">#3</span>
              </div>
            </div>
          </div>
        </div>

        {/* TOP-RIGHT MAP CONTROLS: Expand/Compass Icon */}
        <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5">
          {/* Compass Orientation Button */}
          <button
            onClick={handleCompassClick}
            className="w-8 h-8 rounded-xl bg-white/90 hover:bg-white active:scale-95 backdrop-blur-md shadow-sm border border-slate-200 flex items-center justify-center text-slate-700 transition-all cursor-pointer"
            title="Reset or Adjust Compass Orientation"
            aria-label="Compass Orientation"
          >
            <Compass
              className="w-4 h-4 text-[#006194] transition-transform duration-300"
              style={{ transform: `rotate(${-compassBearing}deg)` }}
            />
          </button>

          {/* Expand / Collapse Aspect Toggle */}
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="w-8 h-8 rounded-xl bg-white/90 hover:bg-white active:scale-95 backdrop-blur-md shadow-sm border border-slate-200 flex items-center justify-center text-slate-700 transition-all cursor-pointer"
            title={isExpanded ? 'Standard Aspect' : 'Expand View'}
            aria-label="Toggle Map Expansion"
          >
            {isExpanded ? (
              <Minimize2 className="w-3.5 h-3.5 text-slate-600" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 text-slate-600" />
            )}
          </button>
        </div>

        {/* FLOATING BOTTOM-RIGHT CONTROLS: Minimal + and − zoom controls with soft shadows and rounded corners */}
        <div className="absolute bottom-3 right-3 z-30 flex flex-col gap-1">
          <div className="flex flex-col bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-slate-200 overflow-hidden">
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-slate-100 text-slate-700 transition-colors active:bg-slate-200 cursor-pointer"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <Plus className="w-4 h-4" />
            </button>

            <div className="h-px bg-slate-200" />

            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-slate-100 text-slate-700 transition-colors active:bg-slate-200 cursor-pointer"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>

          {zoomLevel !== 1 && (
            <button
              onClick={handleResetZoom}
              className="px-2 py-1 bg-white/95 backdrop-blur-md hover:bg-white active:scale-95 rounded-lg shadow-sm border border-slate-200 text-[10px] font-bold text-slate-600 transition-all text-center cursor-pointer"
              title="Reset View"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* MAP LEGEND: Bottom status indicator row displaying pill dots */}
      <div className="bg-white px-4 py-3 border-t border-[#e2e8f0] flex flex-wrap items-center justify-between text-xs text-[#3f4850] gap-3">
        <div className="flex items-center gap-4">
          {/* 🟢 Good */}
          <div className="inline-flex items-center gap-1.5 font-medium text-[#191c1e]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs" />
            <span>Good</span>
          </div>

          {/* 🔵 Moderate / Fair */}
          <div className="inline-flex items-center gap-1.5 font-medium text-[#191c1e]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7] shadow-xs" />
            <span>Moderate / Fair</span>
          </div>

          {/* ⚪ Updating / Standby */}
          <div className="inline-flex items-center gap-1.5 font-medium text-[#191c1e]">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400/50 shadow-xs" />
            <span>Updating / Standby</span>
          </div>
        </div>

        <span className="text-[11px] font-medium text-[#707881] hidden sm:inline">
          Click station pin to view telemetry
        </span>
      </div>
    </div>
  );
};
