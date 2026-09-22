import React, { useState } from 'react';
import { X, Search, MapPin, Check, Radio } from 'lucide-react';
import { WaterStation } from '../types';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  stations: WaterStation[];
  selectedStationId: string;
  onSelectStation: (stationId: string) => void;
  onViewStation: (stationId: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  stations,
  selectedStationId,
  onSelectStation,
  onViewStation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filtered = stations.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.locationSubtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.catchment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sky-50 text-[#006194] flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#191c1e]">
                Select Water Location
              </h3>
              <p className="text-xs text-[#707881]">
                Cebu City Public Monitoring Stations
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-3 border-b border-slate-100 bg-[#f7f9fb]">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search barangay, basin catchment, or station..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006194]/30 focus:border-[#006194] text-slate-800 placeholder-slate-400"
              autoFocus
            />
          </div>
        </div>

        {/* Stations List */}
        <div className="p-3 overflow-y-auto space-y-2 flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              No monitored water stations match your search.
            </div>
          ) : (
            filtered.map((station) => {
              const isSelected = station.id === selectedStationId;

              return (
                <div
                  key={station.id}
                  onClick={() => {
                    onSelectStation(station.id);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-[#006194] bg-[#f0f9ff]'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        station.status === 'good'
                          ? 'bg-emerald-100 text-emerald-700'
                          : station.status === 'fair'
                          ? 'bg-sky-100 text-[#006194]'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      <Radio className="w-4 h-4" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-display font-bold text-sm text-[#191c1e]">
                          {station.name}
                        </h4>
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          Station {station.stationNumber}
                        </span>
                      </div>

                      <p className="text-xs text-[#707881] mt-0.5">
                        {station.locationSubtitle}
                      </p>

                      <div className="flex items-center gap-2 mt-1.5">
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                            station.status === 'good'
                              ? 'bg-[#DCFCE7] text-[#166534]'
                              : station.status === 'fair'
                              ? 'bg-sky-100 text-[#006194]'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              station.status === 'good'
                                ? 'bg-[#16A34A]'
                                : station.status === 'fair'
                                ? 'bg-[#006194]'
                                : 'bg-[#707881]'
                            }`}
                          />
                          {station.statusLabel}
                        </span>

                        <span className="text-[11px] text-slate-400">
                          {station.updatedAgo}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectStation(station.id);
                        onViewStation(station.id);
                        onClose();
                      }}
                      className="px-2.5 py-1 text-xs font-semibold bg-white border border-slate-200 hover:border-[#006194] text-[#006194] rounded-lg shadow-2xs hover:bg-sky-50 transition-colors whitespace-nowrap"
                    >
                      View Detail
                    </button>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#006194] text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-[#f7f9fb] flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {stations.length} civic telemetry points online
          </span>
          <button
            onClick={() => {
              onViewStation(selectedStationId);
              onClose();
            }}
            className="px-4 py-2 bg-[#006194] hover:bg-[#004b73] text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
};
