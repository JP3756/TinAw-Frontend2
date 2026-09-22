import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  CheckCircle2,
  Info,
  RotateCw,
  FlaskConical,
  Droplets,
  Layers,
  Thermometer,
  ShieldCheck,
  Globe2,
  SlidersHorizontal,
  Activity,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { WaterStation } from '../types';
import { WaterQualityChart } from './WaterQualityChart';

interface DetailScreenProps {
  station: WaterStation;
  onBack: () => void;
  onSelectAnotherLocation: () => void;
  onOpenPortal: () => void;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({
  station,
  onBack,
  onSelectAnotherLocation,
  onOpenPortal,
}) => {
  const [showNumericalScore, setShowNumericalScore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdatedText, setLastUpdatedText] = useState(station.lastUpdatedTimestamp);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdatedText('Just now (Live sensor ping)');
    }, 900);
  };

  // Helper to render icon for parameters
  const getParamIcon = (key: string) => {
    switch (key) {
      case 'ph':
        return <FlaskConical className="w-5 h-5 text-[#006194]" />;
      case 'turbidity':
        return <Droplets className="w-5 h-5 text-[#006194]" />;
      case 'tds':
        return <Layers className="w-5 h-5 text-[#006194]" />;
      case 'temperature':
        return <Thermometer className="w-5 h-5 text-[#006194]" />;
      default:
        return <Activity className="w-5 h-5 text-[#006194]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] pb-24 text-[#191c1e] animate-in fade-in duration-200">
      {/* Top Floating Back Bar */}
      <div className="max-w-xl mx-auto px-4 pt-3 pb-2">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/95 hover:bg-white text-xs font-semibold text-[#191c1e] rounded-full shadow-xs border border-[#e2e8f0] transition-all hover:shadow-sm active:scale-98 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#006194]" />
          <span>Back to Monitored Places</span>
        </button>
      </div>

      <div className="max-w-xl mx-auto px-4 space-y-4">
        {/* Hero Station Banner */}
        <div className="relative rounded-2xl overflow-hidden shadow-sm aspect-[16/10] sm:aspect-[16/9] border border-[#d8dadc] bg-slate-800">
          {/* Background Image */}
          <img
            src={station.heroImage}
            alt={station.hubName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-[0.82]"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

          {/* Content Overlays */}
          <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between text-white">
            {/* Top Pill on Image */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/20 text-xs font-medium">
                <span className="inline-flex items-center gap-1 font-semibold text-sky-300">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  Station {station.stationNumber}
                </span>
                <span className="text-white/60">•</span>
                <span className="text-white/90 truncate max-w-[200px]">{station.hubName}</span>
              </div>
            </div>

            {/* Bottom Title on Image */}
            <div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-tight drop-shadow-sm">
                {station.name}
              </h1>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-200 mt-1 font-medium drop-shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>{station.locationSubtitle}</span>
              </div>
            </div>
          </div>
        </div>

        {/* OVERALL STATUS CARD */}
        <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-xs space-y-4">
          {/* Top Status & Score Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider block mb-1">
                OVERALL STATUS
              </span>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#DCFCE7] text-[#166534] rounded-full text-xs font-bold border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                  {station.statusLabel}
                </span>
                <span className="text-xs text-[#707881] font-medium">• Verified stable</span>
              </div>
            </div>

            {/* Index Score Callout */}
            <div className="text-right">
              <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider block mb-0.5">
                INDEX SCORE
              </span>
              <div
                onClick={() => setShowNumericalScore(!showNumericalScore)}
                className="font-display font-extrabold text-2xl sm:text-3xl text-[#006194] tracking-tight cursor-pointer hover:opacity-85 transition-opacity inline-flex items-baseline"
                title="Click to toggle calibrated civic score preview"
              >
                <span>{showNumericalScore ? station.calculatedScore : station.scoreDisplay}</span>
                <span className="text-base sm:text-lg font-semibold text-[#707881] ml-1">/ 100</span>
              </div>
            </div>
          </div>

          {/* Info Notice Box */}
          <div className="bg-[#f0f4f8] rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-[#3f4850] leading-relaxed border border-[#e2e8f0]">
            <Info className="w-4 h-4 text-[#006194] shrink-0 mt-0.5" />
            <p>
              {station.scoreNote}
            </p>
          </div>

          {/* Green Check Status Message Box */}
          <div className="bg-[#f0fdf4] rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-[#166534] leading-relaxed border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
            <p className="font-medium">
              The water status of {station.name} meets standard reference thresholds for usability based on the latest TinAw automated assessment.
            </p>
          </div>

          {/* Timestamp & Recirculation Footer */}
          <div className="pt-2 border-t border-[#f2f4f6] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-[#707881]">
            <div className="flex items-center gap-1.5">
              <span>🕒</span>
              <span>Last updated: {lastUpdatedText}</span>
              <button
                onClick={handleRefresh}
                className="p-1 hover:text-[#006194] rounded transition-colors"
                title="Refresh telemetry"
                aria-label="Refresh telemetry"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#006194]' : ''}`} />
              </button>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-[#006194] rounded-full text-xs font-semibold border border-sky-100 self-start sm:self-auto">
              <RotateCw className="w-3.5 h-3.5 text-[#006194]" />
              <span>{station.recirculationStatus}</span>
            </div>
          </div>
        </div>

        {/* WATER PARAMETERS SECTION */}
        <div className="space-y-3">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-lg text-[#191c1e] tracking-tight">
                  Water Parameters
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Telemetry live
                </span>
              </div>
              <p className="text-xs text-[#707881] mt-0.5">
                Evaluated via in-line automated civic sensor array
              </p>
            </div>
          </div>

          {/* Parameter Cards Grid */}
          <div className="space-y-3">
            {station.parameters.map((param) => {
              const icon = getParamIcon(param.key);

              return (
                <div
                  key={param.key}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e2e8f0] shadow-xs space-y-3"
                >
                  {/* Top Row: Icon + Name + Status Pill */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center">
                        {icon}
                      </div>
                      <span className="font-display font-bold text-sm text-[#191c1e]">
                        {param.name}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        param.statusType === 'good'
                          ? 'bg-[#DCFCE7] text-[#166534]'
                          : param.statusType === 'info'
                          ? 'bg-sky-100 text-[#006194]'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {param.status}
                    </span>
                  </div>

                  {/* Value Row: Big Tabular Metric & Optimal Range Target */}
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#191c1e] tabular-nums tracking-tight">
                        {param.value}
                      </span>
                      <span className="text-sm font-semibold text-[#707881]">
                        {param.unit}
                      </span>
                    </div>

                    <span className="text-xs font-semibold text-[#707881]">
                      {param.targetLabel}
                    </span>
                  </div>

                  {/* Visual Range Progress Bar */}
                  <div className="w-full bg-[#eceef0] rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        param.statusType === 'good'
                          ? 'bg-[#007bb9]'
                          : param.statusType === 'info'
                          ? 'bg-[#4b5f7f]'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min(param.currentPercent, 100)}%` }}
                    />
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#707881] leading-relaxed pt-0.5">
                    {param.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Important Note Callout */}
          <div className="bg-[#f0f4f8] border border-[#e2e8f0] rounded-xl p-4 flex items-start gap-3 text-xs text-[#3f4850] leading-relaxed">
            <ShieldCheck className="w-5 h-5 text-[#006194] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#191c1e] block mb-0.5">
                Important note:
              </span>
              <span>
                These four parameters indicate general physical-chemical water usability. They do not alone establish complete microbiological drinking-water safety or certified potability.
              </span>
            </div>
          </div>
        </div>

        {/* WATER QUALITY HISTORY CHART */}
        <WaterQualityChart
          history24h={station.history24h}
          history7d={station.history7d}
          history30d={station.history30d}
          avg24h="Stable"
          peakVariance="Minimal"
          recircCycles={`${station.recircCyclesDone} Done`}
        />

        {/* ASSESSMENT INFORMATION SECTION */}
        <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-xs space-y-4">
          <h3 className="font-display font-bold text-lg text-[#191c1e] tracking-tight">
            Assessment Information
          </h3>

          <div className="space-y-3.5 text-xs text-[#3f4850]">
            {/* Summary Item */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 mt-0.5">
                <SlidersHorizontal className="w-4 h-4 text-[#006194]" />
              </div>
              <div>
                <span className="font-display font-bold text-[11px] text-[#707881] uppercase tracking-wider block mb-0.5">
                  LATEST ASSESSMENT SUMMARY
                </span>
                <p className="leading-relaxed text-[#191c1e]">
                  {station.assessmentSummary}
                </p>
              </div>
            </div>

            {/* Evaluated Parameters */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 mt-0.5">
                <Activity className="w-4 h-4 text-[#006194]" />
              </div>
              <div>
                <span className="font-display font-bold text-[11px] text-[#707881] uppercase tracking-wider block mb-0.5">
                  EVALUATED PARAMETERS
                </span>
                <p className="leading-relaxed text-[#191c1e]">
                  {station.evaluatedParametersText}
                </p>
              </div>
            </div>

            {/* Reference Guidelines */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-[#006194]" />
              </div>
              <div>
                <span className="font-display font-bold text-[11px] text-[#707881] uppercase tracking-wider block mb-0.5">
                  REFERENCE-BASED ASSESSMENT
                </span>
                <p className="leading-relaxed text-[#191c1e]">
                  {station.referenceAssessmentText}
                </p>
              </div>
            </div>

            {/* Last sensor verification date */}
            <div className="pt-3 border-t border-[#f2f4f6] flex items-center justify-between text-xs text-[#707881]">
              <span>Last sensor verification</span>
              <span className="font-semibold text-[#191c1e]">
                {station.lastVerificationDate}
              </span>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="space-y-2.5 pt-2">
          {/* Select Another Location Primary Button */}
          <button
            onClick={onSelectAnotherLocation}
            className="w-full py-3.5 px-5 bg-[#006194] hover:bg-[#004b73] active:scale-98 text-white rounded-xl font-display font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
          >
            <Globe2 className="w-4 h-4" />
            <span>Select Another Location</span>
          </button>

          {/* Operator Maintenance Portal Button */}
          <button
            onClick={onOpenPortal}
            className="w-full py-3 px-4 bg-[#eceef0] hover:bg-[#e0e3e5] active:scale-98 text-[#3f4850] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#707881]" />
            <span>Operator Maintenance Portal — Coming Soon</span>
          </button>
        </div>
      </div>
    </div>
  );
};
