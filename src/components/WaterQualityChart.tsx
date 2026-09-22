import React, { useState } from 'react';
import { HistoryDataPoint } from '../types';

interface WaterQualityChartProps {
  history24h: HistoryDataPoint[];
  history7d: HistoryDataPoint[];
  history30d: HistoryDataPoint[];
  avg24h?: string;
  peakVariance?: string;
  recircCycles?: string;
}

export const WaterQualityChart: React.FC<WaterQualityChartProps> = ({
  history24h,
  history7d,
  history30d,
  avg24h = 'Stable',
  peakVariance = 'Minimal',
  recircCycles = '4 Done',
}) => {
  const [activeRange, setActiveRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [hoveredPoint, setHoveredPoint] = useState<HistoryDataPoint | null>(null);

  const data = activeRange === '24h' ? history24h : activeRange === '7d' ? history7d : history30d;

  // Chart dimensions
  const width = 500;
  const height = 180;
  const padding = { top: 24, right: 20, bottom: 32, left: 20 };

  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  // Scale calculations (score is 50 to 100)
  const minScore = 55;
  const maxScore = 100;

  const getX = (index: number) => {
    return padding.left + (index / (data.length - 1)) * chartW;
  };

  const getY = (score: number) => {
    const clamped = Math.min(Math.max(score, minScore), maxScore);
    const ratio = (clamped - minScore) / (maxScore - minScore);
    return padding.top + (1 - ratio) * chartH;
  };

  // Threshold band coordinates (70 to 100)
  const thresholdTopY = getY(100);
  const thresholdBottomY = getY(70);

  // Generate smooth SVG path
  const points = data.map((d, i) => ({ x: getX(i), y: getY(d.score), data: d }));

  let pathD = '';
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const midX = (p0.x + p1.x) / 2;
      pathD += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
    }
  }

  // Area path for gradient fill
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding.bottom} L ${points[0].x} ${height - padding.bottom} Z`;

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-xs">
      {/* Header with Title & Range Tabs */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg text-[#191c1e] tracking-tight">
          Water Quality History
        </h3>

        {/* Range Selector Pill Group */}
        <div className="flex bg-[#f2f4f6] p-0.5 rounded-lg border border-[#e0e3e5]">
          {(['24h', '7d', '30d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeRange === range
                  ? 'bg-white text-[#006194] shadow-xs'
                  : 'text-[#707881] hover:text-[#191c1e]'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs mb-3 text-[#3f4850]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#006194]" />
          <span className="font-medium text-[#191c1e]">Usability Index Trace</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
          <span className="font-medium text-[#16A34A]">Healthy Threshold Band (70 - 100)</span>
        </div>
      </div>

      {/* Interactive Chart Container */}
      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <defs>
            {/* Smooth aquatic gradient under the trace line */}
            <linearGradient id="traceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.22" />
              <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.01" />
            </linearGradient>

            <linearGradient id="thresholdGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16a34a" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#16a34a" stopOpacity="0.03" />
            </linearGradient>
          </defs>

          {/* Healthy Threshold Shaded Band (70 - 100) */}
          <rect
            x={padding.left}
            y={thresholdTopY}
            width={chartW}
            height={thresholdBottomY - thresholdTopY}
            fill="url(#thresholdGrad)"
            rx="4"
          />

          {/* Faint threshold baseline 70 */}
          <line
            x1={padding.left}
            y1={thresholdBottomY}
            x2={width - padding.right}
            y2={thresholdBottomY}
            stroke="#16a34a"
            strokeWidth="1"
            strokeDasharray="4 3"
            strokeOpacity="0.4"
          />

          {/* Area Fill */}
          <path d={areaD} fill="url(#traceGradient)" />

          {/* Main Stroke Path */}
          <path
            d={pathD}
            fill="none"
            stroke="#006194"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {points.map((p, i) => {
            const isHovered = hoveredPoint?.fullTime === p.data.fullTime;
            const isLast = i === points.length - 1;

            return (
              <g
                key={i}
                className="cursor-pointer transition-transform"
                onMouseEnter={() => setHoveredPoint(p.data)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                {/* Larger invisible hit area */}
                <circle cx={p.x} cy={p.y} r="14" fill="transparent" />

                {/* Outer ring */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 6.5 : isLast ? 5 : 4}
                  fill="#ffffff"
                  stroke="#006194"
                  strokeWidth={isHovered || isLast ? 3 : 2}
                  className="transition-all"
                />

                {/* Inner dot for last / hovered */}
                {(isHovered || isLast) && (
                  <circle cx={p.x} cy={p.y} r="2.5" fill="#16a34a" />
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint && (
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#0C2340] text-white text-xs px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-3 z-20 pointer-events-none transition-all"
          >
            <div>
              <span className="text-slate-400 block text-[10px]">{hoveredPoint.fullTime}</span>
              <span className="font-bold text-white">Score: {hoveredPoint.score} / 100</span>
            </div>
            <div className="border-l border-slate-700 pl-2 text-[11px] text-slate-300">
              <span>Turbidity: {hoveredPoint.turbidity} NTU</span>
              <span className="mx-1">•</span>
              <span>pH: {hoveredPoint.ph}</span>
            </div>
          </div>
        )}

        {/* X-Axis Labels */}
        <div className="flex justify-between items-center text-[11px] font-medium text-[#707881] pt-1 px-1">
          {activeRange === '24h' ? (
            <>
              <span>Yesterday 10 AM</span>
              <span>6 PM</span>
              <span>2 AM</span>
              <span className="text-[#006194] font-semibold">Now (10:42 AM)</span>
            </>
          ) : activeRange === '7d' ? (
            <>
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
              <span className="text-[#006194] font-semibold">Today</span>
            </>
          ) : (
            <>
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span className="text-[#006194] font-semibold">Current Week</span>
            </>
          )}
        </div>
      </div>

      {/* Summary Metrics Row at Bottom */}
      <div className="grid grid-cols-3 gap-2 pt-4 mt-3 border-t border-[#f2f4f6] text-center">
        <div className="bg-[#f7f9fb] p-2 rounded-xl">
          <span className="text-[11px] font-medium text-[#707881] block">24h Average</span>
          <span className="font-display font-bold text-sm text-[#191c1e]">{avg24h}</span>
        </div>

        <div className="bg-[#f7f9fb] p-2 rounded-xl">
          <span className="text-[11px] font-medium text-[#707881] block">Peak Variance</span>
          <span className="font-display font-bold text-sm text-[#191c1e]">{peakVariance}</span>
        </div>

        <div className="bg-[#f7f9fb] p-2 rounded-xl">
          <span className="text-[11px] font-medium text-[#707881] block">Recirc. Cycles</span>
          <span className="font-display font-bold text-sm text-[#006194]">{recircCycles}</span>
        </div>
      </div>
    </div>
  );
};
