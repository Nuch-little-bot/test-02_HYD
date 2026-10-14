import React, { useState } from 'react';
import { ProjectData, DistrictData, ImpactId } from '../types';
import { ZoomIn, ZoomOut, RotateCcw, MapPin, Building2, CheckCircle2 } from 'lucide-react';

interface TaichungMapProps {
  districts: DistrictData[];
  projects: ProjectData[];
  selectedAttributeId: ImpactId;
  selectedProject: ProjectData | null;
  onSelectProject: (p: ProjectData) => void;
  langMode: 'both' | 'zh' | 'en';
}

export const TaichungMap: React.FC<TaichungMapProps> = ({
  districts,
  projects,
  selectedAttributeId,
  selectedProject,
  onSelectProject,
  langMode,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeDistrict, setActiveDistrict] = useState<DistrictData | null>(null);

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.3, 2.5));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.3, 0.8));
  const handleReset = () => {
    setZoomLevel(1);
    setActiveDistrict(null);
  };

  return (
    <div className="bg-[var(--bg-surface)] p-5 sm:p-7 rounded-xl border-2 border-[var(--border-strong)] space-y-4">
      {/* Title & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[var(--border-color)] pb-3">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] flex items-center gap-2">
            <MapPin className="w-6 h-6 text-amber-500" />
            <span>Former Taichung City & Shuinan Base Map</span>
            {(langMode === 'both' || langMode === 'zh') && (
              <span className="block sm:inline sm:ml-2 text-base sm:text-lg font-bold text-[var(--text-secondary)] font-mono">
                / 原臺中市與水湳經貿園區基本圖
              </span>
            )}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 font-medium">
            Active Attribute: <strong className="text-amber-600 dark:text-amber-400 capitalize">{selectedAttributeId}</strong>.
            Click any project marker or district area to inspect spatial impacts.
          </p>
        </div>

        {/* Map Control Buttons */}
        <div className="inline-flex items-center gap-1 border-2 border-[var(--border-strong)] rounded bg-[var(--bg-subtle)] p-1 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-2 rounded hover:bg-[var(--bg-surface)] text-[var(--text-primary)] font-bold transition-colors"
            title="Zoom In 放大"
            aria-label="Zoom in map"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-2 rounded hover:bg-[var(--bg-surface)] text-[var(--text-primary)] font-bold transition-colors"
            title="Zoom Out 縮小"
            aria-label="Zoom out map"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="p-2 rounded hover:bg-[var(--bg-surface)] text-[var(--text-primary)] font-bold transition-colors text-xs flex items-center gap-1"
            title="Reset View 重設"
            aria-label="Reset map view"
          >
            <RotateCcw className="w-4 h-4" />
            <span>重設</span>
          </button>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative w-full h-[460px] sm:h-[520px] bg-[var(--bg-base)] rounded-lg border-2 border-[var(--border-color)] overflow-hidden flex items-center justify-center">
        {/* Legend overlay */}
        <div className="absolute top-3 left-3 z-10 bg-[var(--bg-surface)]/95 backdrop-blur-sm p-3 rounded-lg border-2 border-[var(--border-color)] text-xs space-y-1.5 shadow-sm max-w-[210px]">
          <div className="font-bold text-[var(--text-primary)] uppercase tracking-wider text-[11px] border-b border-[var(--border-color)] pb-1">
            Map Legend 圖例
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 bg-emerald-700/30 border border-emerald-600 rounded-sm"></span>
            <span className="text-[var(--text-secondary)]">Shuinan Park 水湳園區</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 bg-amber-500/20 border border-amber-600 rounded-sm"></span>
            <span className="text-[var(--text-secondary)]">Old Downtown 舊城五區</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 bg-blue-500/20 border border-blue-600 rounded-sm"></span>
            <span className="text-[var(--text-secondary)]">Outer Districts 西屯/北屯/南屯</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold text-[10px]">
              #
            </span>
            <span className="text-[var(--text-secondary)] font-bold">Project Marker 重大建設</span>
          </div>
        </div>

        {/* Interactive SVG Map */}
        <div
          className="w-full h-full transition-transform duration-300 ease-out origin-center flex items-center justify-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg
            viewBox="0 0 900 650"
            className="w-full h-full max-h-[500px] select-none"
            aria-label="Interactive Taichung City base map"
          >
            {/* Background grid */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[var(--border-color)] opacity-40" />
            </pattern>
            <rect width="900" height="650" fill="url(#grid)" />

            {/* Approximate stylized geometric representations of Taichung's 8 districts */}
            {/* Beitun (Large North-East) */}
            <path
              d="M 430,90 L 720,80 L 810,230 L 710,340 L 530,310 L 450,220 Z"
              className={`transition-colors cursor-pointer ${
                activeDistrict?.nameZh === '北屯區'
                  ? 'fill-amber-500/30 stroke-amber-600 stroke-2'
                  : 'fill-blue-500/10 stroke-[var(--border-color)] stroke-1 hover:fill-blue-500/20'
              }`}
              onClick={() => setActiveDistrict(districts.find((d) => d.nameZh === '北屯區') || null)}
            />
            <text x="630" y="190" textAnchor="middle" className="text-xs font-bold fill-[var(--text-secondary)] pointer-events-none">
              北屯區 Beitun (61.8 km²)
            </text>

            {/* Xitun (North-West, host to Shuinan) */}
            <path
              d="M 230,150 L 440,110 L 470,250 L 410,360 L 260,330 L 190,240 Z"
              className={`transition-colors cursor-pointer ${
                activeDistrict?.nameZh === '西屯區'
                  ? 'fill-amber-500/30 stroke-amber-600 stroke-2'
                  : 'fill-blue-500/15 stroke-[var(--border-color)] stroke-1 hover:fill-blue-500/25'
              }`}
              onClick={() => setActiveDistrict(districts.find((d) => d.nameZh === '西屯區') || null)}
            />
            <text x="320" y="240" textAnchor="middle" className="text-xs font-bold fill-[var(--text-secondary)] pointer-events-none">
              西屯區 Xitun (40.0 km²)
            </text>

            {/* Nantun (South-West) */}
            <path
              d="M 240,340 L 410,360 L 430,470 L 360,560 L 220,510 Z"
              className={`transition-colors cursor-pointer ${
                activeDistrict?.nameZh === '南屯區'
                  ? 'fill-amber-500/30 stroke-amber-600 stroke-2'
                  : 'fill-blue-500/10 stroke-[var(--border-color)] stroke-1 hover:fill-blue-500/20'
              }`}
              onClick={() => setActiveDistrict(districts.find((d) => d.nameZh === '南屯區') || null)}
            />
            <text x="320" y="450" textAnchor="middle" className="text-xs font-bold fill-[var(--text-secondary)] pointer-events-none">
              南屯區 Nantun (30.5 km²)
            </text>

            {/* Old Downtown 5 Districts Cluster (Central, North, West, South, East) */}
            {/* North District */}
            <path
              d="M 450,220 L 530,230 L 560,310 L 470,300 Z"
              className={`transition-colors cursor-pointer ${
                activeDistrict?.nameZh === '北區'
                  ? 'fill-amber-500/40 stroke-amber-600 stroke-2'
                  : 'fill-amber-500/20 stroke-[var(--border-color)] stroke-1 hover:fill-amber-500/30'
              }`}
              onClick={() => setActiveDistrict(districts.find((d) => d.nameZh === '北區') || null)}
            />
            <text x="500" y="270" textAnchor="middle" className="text-[11px] font-bold fill-[var(--text-primary)] pointer-events-none">
              北區 North
            </text>

            {/* West District */}
            <path
              d="M 410,360 L 470,300 L 510,370 L 440,430 Z"
              className={`transition-colors cursor-pointer ${
                activeDistrict?.nameZh === '西區'
                  ? 'fill-amber-500/40 stroke-amber-600 stroke-2'
                  : 'fill-amber-500/20 stroke-[var(--border-color)] stroke-1 hover:fill-amber-500/30'
              }`}
              onClick={() => setActiveDistrict(districts.find((d) => d.nameZh === '西區') || null)}
            />
            <text x="460" y="370" textAnchor="middle" className="text-[11px] font-bold fill-[var(--text-primary)] pointer-events-none">
              西區 West
            </text>

            {/* Central District (Smallest, heart) */}
            <rect
              x="510"
              y="325"
              width="45"
              height="40"
              rx="4"
              className={`transition-colors cursor-pointer ${
                activeDistrict?.nameZh === '中區'
                  ? 'fill-amber-600 text-white stroke-black stroke-2'
                  : 'fill-amber-600/60 stroke-amber-800 stroke-1 hover:fill-amber-600'
              }`}
              onClick={() => setActiveDistrict(districts.find((d) => d.nameZh === '中區') || null)}
            />
            <text x="532" y="350" textAnchor="middle" className="text-[10px] font-black fill-white pointer-events-none">
              中區
            </text>

            {/* East District */}
            <path
              d="M 560,310 L 670,330 L 640,460 L 560,420 L 555,365 Z"
              className={`transition-colors cursor-pointer ${
                activeDistrict?.nameZh === '東區'
                  ? 'fill-amber-500/40 stroke-amber-600 stroke-2'
                  : 'fill-amber-500/20 stroke-[var(--border-color)] stroke-1 hover:fill-amber-500/30'
              }`}
              onClick={() => setActiveDistrict(districts.find((d) => d.nameZh === '東區') || null)}
            />
            <text x="610" y="380" textAnchor="middle" className="text-[11px] font-bold fill-[var(--text-primary)] pointer-events-none">
              東區 East
            </text>

            {/* South District */}
            <path
              d="M 440,430 L 560,420 L 570,530 L 460,540 L 430,470 Z"
              className={`transition-colors cursor-pointer ${
                activeDistrict?.nameZh === '南區'
                  ? 'fill-amber-500/40 stroke-amber-600 stroke-2'
                  : 'fill-amber-500/20 stroke-[var(--border-color)] stroke-1 hover:fill-amber-500/30'
              }`}
              onClick={() => setActiveDistrict(districts.find((d) => d.nameZh === '南區') || null)}
            />
            <text x="500" y="480" textAnchor="middle" className="text-[11px] font-bold fill-[var(--text-primary)] pointer-events-none">
              南區 South
            </text>

            {/* Shuinan Economic and Trade Park & Central Park Outline (in Xitun, crossing to Beitun) */}
            <g id="shuinan-corridor">
              <rect
                x="370"
                y="150"
                width="80"
                height="170"
                rx="10"
                className="fill-emerald-600/30 stroke-emerald-600 stroke-2 stroke-dasharray-4"
              />
              <text x="410" y="142" textAnchor="middle" className="text-[11px] font-black fill-emerald-700 dark:fill-emerald-300">
                ★ 水湳中央公園 Shuinan Central Park (67 ha)
              </text>
            </g>

            {/* Project Markers Placed Geographically */}
            {/* 1. Green Museumbrary */}
            <g
              className="cursor-pointer group"
              onClick={() => onSelectProject(projects[0])}
              transform="translate(410, 165)"
            >
              <circle r="16" className="fill-emerald-600 stroke-white stroke-2 group-hover:scale-110 transition-transform" />
              <text y="4" textAnchor="middle" className="fill-white font-black text-xs">1</text>
              <text y="-20" textAnchor="middle" className="fill-[var(--text-primary)] font-extrabold text-[11px] bg-white px-1">
                綠美圖
              </text>
            </g>

            {/* 2. Taichung International Exhibition Center */}
            <g
              className="cursor-pointer group"
              onClick={() => onSelectProject(projects[1])}
              transform="translate(385, 175)"
            >
              <circle r="16" className="fill-blue-600 stroke-white stroke-2 group-hover:scale-110 transition-transform" />
              <text y="4" textAnchor="middle" className="fill-white font-black text-xs">2</text>
              <text y="-20" textAnchor="middle" className="fill-[var(--text-primary)] font-extrabold text-[11px]">
                國際會展中心
              </text>
            </g>

            {/* 3. Shuinan Transfer Center */}
            <g
              className="cursor-pointer group"
              onClick={() => onSelectProject(projects[2])}
              transform="translate(420, 125)"
            >
              <circle r="16" className="fill-purple-600 stroke-white stroke-2 group-hover:scale-110 transition-transform" />
              <text y="4" textAnchor="middle" className="fill-white font-black text-xs">3</text>
              <text y="-20" textAnchor="middle" className="fill-[var(--text-primary)] font-extrabold text-[11px]">
                水湳轉運中心
              </text>
            </g>

            {/* 4. Taichung Pop Music and Film Center */}
            <g
              className="cursor-pointer group"
              onClick={() => onSelectProject(projects[3])}
              transform="translate(435, 260)"
            >
              <circle r="16" className="fill-rose-600 stroke-white stroke-2 group-hover:scale-110 transition-transform" />
              <text y="4" textAnchor="middle" className="fill-white font-black text-xs">4</text>
              <text y="28" textAnchor="middle" className="fill-[var(--text-primary)] font-extrabold text-[11px]">
                流行影音中心
              </text>
            </g>

            {/* 5. Taichung Dome Stadium */}
            <g
              className="cursor-pointer group"
              onClick={() => onSelectProject(projects[4])}
              transform="translate(390, 280)"
            >
              <circle r="16" className="fill-amber-600 stroke-white stroke-2 group-hover:scale-110 transition-transform" />
              <text y="4" textAnchor="middle" className="fill-white font-black text-xs">5</text>
              <text y="28" textAnchor="middle" className="fill-[var(--text-primary)] font-extrabold text-[11px]">
                臺中超巨蛋
              </text>
            </g>

            {/* 6. Central Park Center */}
            <g
              className="cursor-pointer group"
              onClick={() => onSelectProject(projects[5])}
              transform="translate(410, 215)"
            >
              <circle r="16" className="fill-emerald-800 stroke-white stroke-2 group-hover:scale-110 transition-transform" />
              <text y="4" textAnchor="middle" className="fill-white font-black text-xs">6</text>
              <text y="-20" textAnchor="middle" className="fill-[var(--text-primary)] font-extrabold text-[11px]">
                中央公園 (67ha)
              </text>
            </g>

            {/* 7. MRT Wenhua Senior High School Station */}
            <g
              className="cursor-pointer group"
              onClick={() => onSelectProject(projects[6])}
              transform="translate(435, 330)"
            >
              <circle r="14" className="fill-cyan-600 stroke-white stroke-2 group-hover:scale-110 transition-transform" />
              <text y="4" textAnchor="middle" className="fill-white font-black text-xs">7</text>
              <text y="24" textAnchor="middle" className="fill-[var(--text-primary)] font-extrabold text-[10px]">
                捷運文華高中站
              </text>
            </g>

            {/* Compass Rose */}
            <g transform="translate(830, 80)">
              <circle r="22" className="fill-[var(--bg-surface)] stroke-[var(--border-strong)] stroke-2" />
              <path d="M 0,-16 L 5,0 L 0,-4 L -5,0 Z" fill="#d97706" />
              <path d="M 0,16 L 5,0 L 0,4 L -5,0 Z" fill="#94a3b8" />
              <text y="-20" textAnchor="middle" className="text-xs font-black fill-[var(--text-primary)]">N</text>
            </g>
          </svg>
        </div>
      </div>

      {/* District or Project Selection Inspector Card */}
      {activeDistrict && (
        <div className="p-4 rounded-lg bg-[var(--bg-subtle)] border-2 border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono uppercase text-amber-700 dark:text-amber-400 font-extrabold">
              District Details · 行政區資料
            </div>
            <h4 className="text-lg font-black text-[var(--text-primary)]">
              {activeDistrict.nameZh} {activeDistrict.nameEn}
              <span className="text-xs font-normal opacity-80 ml-2">
                (Area: {activeDistrict.areaKm2} km² · {activeDistrict.villageCount} Villages 里)
              </span>
            </h4>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
              {langMode === 'zh' ? activeDistrict.descriptionZh : activeDistrict.description}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveDistrict(null)}
            className="px-3 py-1.5 rounded border border-[var(--border-strong)] text-xs font-bold self-start sm:self-auto hover:bg-[var(--bg-surface)]"
          >
            關閉 Close
          </button>
        </div>
      )}

      {selectedProject && (
        <div className="p-4 sm:p-5 rounded-lg bg-amber-500/10 border-2 border-amber-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-800 dark:text-amber-300">
              <Building2 className="w-4 h-4" />
              <span>PROJECT #{selectedProject.id} · {selectedProject.category}</span>
            </div>
            <h4 className="text-xl font-black text-[var(--text-primary)]">
              {selectedProject.nameZh} <span className="text-base font-normal opacity-80">({selectedProject.nameEn})</span>
            </h4>
            <div className="text-xs text-[var(--text-muted)] font-mono">
              狀態 Status: {selectedProject.statusZh} ({selectedProject.statusEn})
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-primary)] font-medium mt-2 leading-relaxed">
              <strong>{selectedAttributeId.toUpperCase()} IMPACT:</strong> {selectedProject.impactsZh[selectedAttributeId]}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {selectedProject.osmUrl && (
              <a
                href={selectedProject.osmUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded border border-[var(--border-strong)] text-xs font-bold bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] text-[var(--text-primary)]"
              >
                OpenStreetMap 座標
              </a>
            )}
            <button
              type="button"
              onClick={() => onSelectProject(selectedProject)}
              className="px-3 py-2 rounded bg-[var(--text-primary)] text-[var(--bg-base)] text-xs font-bold hover:opacity-90"
            >
              檢視完整影響 View Full Impact
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
