import React, { useState } from 'react';
import { X, Lock, Activity, RefreshCw, Cpu, BatteryCharging, Wifi, CheckCircle2, ShieldAlert } from 'lucide-react';

interface OperatorPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationName: string;
}

export const OperatorPortalModal: React.FC<OperatorPortalModalProps> = ({
  isOpen,
  onClose,
  stationName,
}) => {
  const [isSimulatingCycle, setIsSimulatingCycle] = useState(false);
  const [cycleStep, setCycleStep] = useState<string | null>(null);

  if (!isOpen) return null;

  const triggerTestCycle = () => {
    setIsSimulatingCycle(true);
    setCycleStep('Diagnostic handshake: Verifying telemetry uplink...');
    setTimeout(() => {
      setCycleStep('Sediment valve flushing: 12.4 L/min flow rate verified...');
    }, 1200);
    setTimeout(() => {
      setCycleStep('Bio-sand clarification active: Turbidity stable at 1.4 NTU...');
    }, 2400);
    setTimeout(() => {
      setCycleStep('Recirculation cycle #5 verified completed successfully.');
      setIsSimulatingCycle(false);
    }, 3800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#0C2340] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base text-white">
                  TinAw Operator Portal
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full border border-sky-400/30">
                  Preview
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Civic telemetry administration & pump orchestration
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-sm text-[#191c1e]">
          {/* Active Station Banner */}
          <div className="bg-[#f0f9ff] border border-sky-200 p-3.5 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-[#006194] uppercase tracking-wider block">
                Target Node
              </span>
              <span className="font-display font-bold text-slate-900 text-sm">
                {stationName}
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Online • 4G Telemetry
            </span>
          </div>

          {/* Node Health Grid */}
          <div>
            <h4 className="font-display font-semibold text-xs text-[#707881] uppercase tracking-wider mb-2">
              Hardware Telemetry Diagnostics
            </h4>
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-[#f7f9fb] p-3 rounded-xl border border-slate-200">
                <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                  <BatteryCharging className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[11px]">Solar / Battery</span>
                </div>
                <span className="font-display font-bold text-slate-800 text-sm">
                  13.8V (98%)
                </span>
              </div>

              <div className="bg-[#f7f9fb] p-3 rounded-xl border border-slate-200">
                <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                  <Wifi className="w-3.5 h-3.5 text-[#006194]" />
                  <span className="text-[11px]">Uplink RSSI</span>
                </div>
                <span className="font-display font-bold text-slate-800 text-sm">
                  -68 dBm (Strong)
                </span>
              </div>

              <div className="bg-[#f7f9fb] p-3 rounded-xl border border-slate-200">
                <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                  <Cpu className="w-3.5 h-3.5 text-purple-600" />
                  <span className="text-[11px]">MCU Status</span>
                </div>
                <span className="font-display font-bold text-slate-800 text-sm">
                  Nominal
                </span>
              </div>
            </div>
          </div>

          {/* Recirculation Orchestration */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display font-bold text-sm text-slate-900">
                  Automated Recirculation Control
                </h4>
                <p className="text-xs text-slate-500">
                  Simulate field technician pump verification routine
                </p>
              </div>
              <Activity className="w-5 h-5 text-[#006194]" />
            </div>

            {cycleStep && (
              <div className="bg-white p-3 rounded-lg border border-sky-100 text-xs text-slate-700 flex items-start gap-2 shadow-2xs">
                {isSimulatingCycle ? (
                  <RefreshCw className="w-4 h-4 text-[#006194] animate-spin shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                )}
                <span>{cycleStep}</span>
              </div>
            )}

            <button
              onClick={triggerTestCycle}
              disabled={isSimulatingCycle}
              className="w-full py-2.5 px-4 bg-[#0C2340] hover:bg-[#191c1e] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSimulatingCycle ? 'animate-spin' : ''}`} />
              <span>{isSimulatingCycle ? 'Running Diagnostic Sweep...' : 'Trigger Manual Recirculation Sweep'}</span>
            </button>
          </div>

          {/* Civic Notice */}
          <div className="bg-[#fffbeb] border border-[#fef3c7] p-3 rounded-xl flex items-start gap-2.5 text-xs text-[#92400e]">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Full operator authentication and threshold calibration controls will be unlocked in the upcoming civic release for accredited barangay health officials and watershed technicians.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-[#f7f9fb] flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
