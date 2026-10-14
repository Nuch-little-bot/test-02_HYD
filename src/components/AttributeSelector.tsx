import React from 'react';
import { ImpactId } from '../types';
import { Leaf, Users, TrendingUp, RefreshCw, Bus, HeartPulse } from 'lucide-react';

interface AttributeSelectorProps {
  selectedId: ImpactId;
  onSelect: (id: ImpactId) => void;
  langMode: 'both' | 'zh' | 'en';
}

interface AttributeButtonConfig {
  id: ImpactId;
  number: string;
  title: string;
  titleZh: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  taglineZh: string;
}

const ATTRIBUTES: AttributeButtonConfig[] = [
  {
    id: 'environmental',
    number: '01',
    title: 'Environmental Impact',
    titleZh: '環境影響',
    icon: Leaf,
    tagline: 'Cooling, ecology & sponge city',
    taglineZh: '微氣候降溫、綠肺與海綿韌性',
  },
  {
    id: 'social',
    number: '02',
    title: 'Social Impact',
    titleZh: '社會影響',
    icon: Users,
    tagline: 'Inclusion, culture & all-age learning',
    taglineZh: '文化平權、全齡樂齡與共融空間',
  },
  {
    id: 'economic',
    number: '03',
    title: 'Economic Impacts',
    titleZh: '經濟效益',
    icon: TrendingUp,
    tagline: 'MICE expo, R&D & high-value jobs',
    taglineZh: '國際會展、創新研發與在地繁榮',
  },
  {
    id: 'circularity',
    number: '04',
    title: 'Circularity Aspects',
    titleZh: '循環經濟面向',
    icon: RefreshCw,
    tagline: 'Reclaimed water, solar & recycled aggregates',
    taglineZh: '再生水100%澆灌、綠電與再生建材',
  },
  {
    id: 'mobility',
    number: '05',
    title: 'Mobility Impacts',
    titleZh: '交通與移動影響',
    icon: Bus,
    tagline: 'Transit hub, MRT link & safe walk paths',
    taglineZh: '水湳轉運中心、捷運與人車分流',
  },
  {
    id: 'health',
    number: '06',
    title: 'Health Issues',
    titleZh: '健康與福祉議題',
    icon: HeartPulse,
    tagline: 'Sensory pavilions & elderly active trails',
    taglineZh: '12座感官氣候區與每50米長椅',
  },
];

export const AttributeSelector: React.FC<AttributeSelectorProps> = ({
  selectedId,
  onSelect,
  langMode,
}) => {
  return (
    <section className="space-y-3" aria-label="Impact attributes navigation">
      <div className="flex items-center justify-between border-b-2 border-[var(--border-strong)] pb-2">
        <h2 className="text-base sm:text-lg font-black tracking-wider uppercase text-[var(--text-primary)] flex items-center gap-2">
          <span className="w-3 h-3 bg-amber-500 rounded-sm"></span>
          <span>Clickable Impact Attributes</span>
          {(langMode === 'both' || langMode === 'zh') && (
            <span className="text-sm font-bold text-[var(--text-muted)] font-mono">
              / 點擊切換六大永續核心面向
            </span>
          )}
        </h2>
        <span className="text-xs font-mono text-[var(--text-muted)] font-semibold hidden sm:inline">
          大按鈕適合各年齡與長輩操作 · 6 Core Pillars
        </span>
      </div>

      {/* Grid of 6 big, tactile, high-contrast buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {ATTRIBUTES.map((attr) => {
          const isSelected = selectedId === attr.id;
          const Icon = attr.icon;

          return (
            <button
              key={attr.id}
              onClick={() => onSelect(attr.id)}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`relative text-left p-4 sm:p-5 rounded-lg border-2 transition-all duration-150 focus:outline-none cursor-pointer flex flex-col justify-between min-h-[92px] sm:min-h-[105px] ${
                isSelected
                  ? 'border-[var(--border-strong)] bg-[var(--text-primary)] text-[var(--bg-base)] shadow-md ring-3 ring-amber-500 ring-offset-2'
                  : 'border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]'
              }`}
            >
              {/* Top row: Number + Icon */}
              <div className="flex items-center justify-between w-full mb-2">
                <span
                  className={`text-xs font-mono font-black tracking-widest px-1.5 py-0.5 rounded ${
                    isSelected
                      ? 'bg-amber-400 text-black'
                      : 'bg-[var(--bg-subtle)] text-[var(--text-muted)]'
                  }`}
                >
                  {attr.number}
                </span>
                <div
                  className={`p-1.5 rounded ${
                    isSelected
                      ? 'text-amber-400 bg-white/10'
                      : 'text-[var(--text-secondary)] bg-[var(--bg-subtle)]'
                  }`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              {/* Title row */}
              <div>
                <h3
                  className={`text-base sm:text-lg lg:text-xl font-black leading-tight tracking-tight ${
                    isSelected ? 'text-[var(--bg-base)]' : 'text-[var(--text-primary)]'
                  }`}
                >
                  {(langMode === 'both' || langMode === 'en') && <div>{attr.title}</div>}
                  {(langMode === 'both' || langMode === 'zh') && (
                    <div
                      className={`text-sm sm:text-base font-extrabold ${
                        langMode === 'both' ? 'mt-0.5 opacity-90' : ''
                      }`}
                    >
                      {attr.titleZh}
                    </div>
                  )}
                </h3>

                {/* Subtitle / summary */}
                <p
                  className={`text-xs sm:text-sm mt-1.5 leading-normal line-clamp-1 font-medium ${
                    isSelected ? 'text-[var(--bg-base)] opacity-85' : 'text-[var(--text-muted)]'
                  }`}
                >
                  {langMode === 'zh' ? attr.taglineZh : attr.tagline}
                </p>
              </div>

              {/* Active check indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span>Active</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};
