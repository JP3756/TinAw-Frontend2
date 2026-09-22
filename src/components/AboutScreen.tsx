import React from 'react';
import { ArrowLeft, ShieldCheck, MapPin, HeartHandshake, ExternalLink, Mail } from 'lucide-react';

interface AboutScreenProps {
  onBack: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
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
            <ShieldCheck className="w-4 h-4" />
            <span>About The Initiative</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#191c1e] tracking-tight">
            About TinAw
          </h1>
          <p className="text-xs sm:text-sm text-[#707881] mt-1.5 leading-relaxed">
            Derived from the Cebuano word for <em>"clear"</em> or <em>"limpid"</em>, TinAw is a civic technology project created to democratize water security in Metro Cebu.
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-xs space-y-3">
          <h3 className="font-display font-bold text-base text-[#191c1e]">
            Our Civic Mission
          </h3>
          <p className="text-xs text-[#3f4850] leading-relaxed">
            Clean and accessible water is fundamental to human dignity. By combining affordable open-hardware sensor arrays, automated bio-sand recirculation, and transparent public dashboards, TinAw empowers communities in Cebu City to monitor their local water tables with certainty.
          </p>
        </div>

        {/* Coverage Card */}
        <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-800">
            <MapPin className="w-4 h-4 text-[#006194]" />
            <h3 className="font-display font-bold text-base text-[#191c1e]">
              Active Catchment Deployments
            </h3>
          </div>
          <ul className="text-xs text-[#3f4850] space-y-2">
            <li className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="font-semibold text-slate-800">Barangay Kalunasan (Station #01)</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold text-[10px]">
                Primary Hub • Active
              </span>
            </li>
            <li className="flex items-center justify-between py-1 border-b border-slate-100">
              <span className="font-semibold text-slate-800">Barangay Guadalupe (Station #02)</span>
              <span className="text-[#006194] bg-sky-50 px-2 py-0.5 rounded-full font-semibold text-[10px]">
                Periodic Sweep
              </span>
            </li>
            <li className="flex items-center justify-between py-1">
              <span className="font-semibold text-slate-800">Barangay Lahug (Station #03)</span>
              <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full font-semibold text-[10px]">
                Calibration Stage
              </span>
            </li>
          </ul>
        </div>

        {/* Community & Open Protocol */}
        <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-800">
            <HeartHandshake className="w-4 h-4 text-[#006194]" />
            <h3 className="font-display font-bold text-base text-[#191c1e]">
              Community Stakeholders
            </h3>
          </div>
          <p className="text-xs text-[#3f4850] leading-relaxed">
            TinAw is developed in collaboration with local community leaders, watershed advocacy groups, academic engineering researchers, and civic technicians across Central Visayas.
          </p>
        </div>
      </div>
    </div>
  );
};
