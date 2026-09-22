import React from 'react';
import { ArrowLeft, Droplets, Cpu, RotateCw, Globe, CheckCircle2, ShieldCheck } from 'lucide-react';

interface HowItWorksScreenProps {
  onBack: () => void;
}

export const HowItWorksScreen: React.FC<HowItWorksScreenProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#f7f9fb] pb-28 text-[#191c1e] animate-in fade-in duration-200">
      <div className="max-w-xl mx-auto px-4 pt-4 space-y-5">
        {/* Back Button */}
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-xs font-semibold text-[#191c1e] rounded-full shadow-xs border border-[#e2e8f0] transition-all hover:bg-slate-50 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#006194]" />
            <span>Back to Explorer</span>
          </button>
        </div>

        {/* Title */}
        <div>
          <div className="flex items-center gap-2 text-[#006194] text-xs font-bold uppercase tracking-wider mb-1">
            <Droplets className="w-4 h-4" />
            <span>Civic Hydrology Architecture</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#191c1e] tracking-tight">
            How TinAw Works
          </h1>
          <p className="text-xs sm:text-sm text-[#707881] mt-1.5 leading-relaxed">
            A resilient community water-quality telemetry and automated recirculation system operating across Cebu watershed points.
          </p>
        </div>

        {/* 4 Steps */}
        <div className="space-y-3.5">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-xs space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-sky-100 text-[#006194] flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-display font-bold text-base text-[#191c1e]">
                In-Line Multi-Sensor Intake
              </h3>
            </div>
            <p className="text-xs text-[#3f4850] leading-relaxed pl-11">
              Industrial-grade civic optical sensors measure water turbidity (clarity), pH balance, Total Dissolved Solids (TDS), and ambient water temperature continuously as water enters community holding reservoirs.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-xs space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-sky-100 text-[#006194] flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-display font-bold text-base text-[#191c1e]">
                Solar-Powered IoT Telemetry Nodes
              </h3>
            </div>
            <p className="text-xs text-[#3f4850] leading-relaxed pl-11">
              Each station (such as Station #01 in Barangay Kalunasan) operates off-grid with dedicated solar panels and battery storage. Microcontrollers transmit verified readings every 15 minutes over cellular and LoRa networks.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-xs space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#16A34A] flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-display font-bold text-base text-[#191c1e]">
                Automated Recirculation Cycles
              </h3>
            </div>
            <p className="text-xs text-[#3f4850] leading-relaxed pl-11">
              When water stagnation or particle sedimentation is detected, automated recirculation pumps activate to flush silt, aerate the reservoir, and cycle water through multi-stage bio-sand filters, maintaining peak clarity.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-xs space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h3 className="font-display font-bold text-base text-[#191c1e]">
                Public Transparency Dashboard
              </h3>
            </div>
            <p className="text-xs text-[#3f4850] leading-relaxed pl-11">
              Data is made available in real time to the public without paywalls. Citizens, local barangay health officials, and disaster response teams can verify water status at any hour.
            </p>
          </div>
        </div>

        {/* Civic Note */}
        <div className="bg-[#f0f4f8] rounded-2xl p-4 border border-[#e2e8f0] flex items-start gap-3 text-xs text-[#3f4850]">
          <ShieldCheck className="w-5 h-5 text-[#006194] shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#191c1e]">Transparency Note:</strong> TinAw measurements evaluate baseline physical and chemical parameters for general water usability awareness and civic safety, complementing regulatory testing programs.
          </p>
        </div>
      </div>
    </div>
  );
};
