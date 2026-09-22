import React from 'react';
import { X, User, Bell, MapPin, ExternalLink, Shield } from 'lucide-react';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-[#191c1e]">
                Civic Citizen Profile
              </h3>
              <p className="text-[11px] text-[#707881]">Public Community Observer</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3.5 text-xs text-[#3f4850]">
          <div className="bg-[#f7f9fb] p-3 rounded-xl border border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Selected Basin:</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#006194]" /> Cebu City District 1
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Notification Alert:</span>
              <span className="font-semibold text-emerald-700 flex items-center gap-1">
                <Bell className="w-3 h-3" /> Enabled (SMS / Email)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Access Level:</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <Shield className="w-3 h-3 text-slate-400" /> Public Open Data
              </span>
            </div>
          </div>

          <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl text-sky-900 leading-relaxed">
            <p className="font-semibold mb-0.5">Water Stewardship Transparency</p>
            <p className="text-[11px] text-sky-800">
              TinAw operates as an open-access civic utility. Community members can monitor real-time clarity, turbidity, and automated recirculation cycles without subscription fees.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-[#f7f9fb] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#006194] hover:bg-[#004b73] text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
