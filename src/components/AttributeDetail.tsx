import React from 'react';
import { ImpactAttribute, ProjectData } from '../types';
import { Volume2, VolumeX, ShieldCheck, MapPin, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

interface AttributeDetailProps {
  attribute: ImpactAttribute;
  projects: ProjectData[];
  onSelectProject: (p: ProjectData) => void;
  langMode: 'both' | 'zh' | 'en';
  isSpeaking: boolean;
  onReadAttribute: () => void;
}

export const AttributeDetail: React.FC<AttributeDetailProps> = ({
  attribute,
  projects,
  onSelectProject,
  langMode,
  isSpeaking,
  onReadAttribute,
}) => {
  const relatedProjects = projects.filter((p) => attribute.relatedProjectIds.includes(p.id));

  return (
    <div className="space-y-6 bg-[var(--bg-surface)] p-5 sm:p-7 md:p-8 rounded-xl border-2 border-[var(--border-strong)] shadow-sm transition-colors">
      {/* Title & Speech Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[var(--border-color)] pb-4">
        <div>
          <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-extrabold flex items-center gap-1.5">
            <span>#{attribute.id.toUpperCase()}</span>
            <span>·</span>
            <span>{langMode === 'zh' ? attribute.kickerZh : attribute.kicker}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-1 text-[var(--text-primary)]">
            {(langMode === 'both' || langMode === 'en') && <div>{attribute.title}</div>}
            {(langMode === 'both' || langMode === 'zh') && (
              <div className="text-xl sm:text-2xl md:text-3xl font-extrabold mt-0.5 text-[var(--text-secondary)]">
                {attribute.titleZh}
              </div>
            )}
          </h2>
        </div>

        {/* Read aloud button */}
        <button
          onClick={onReadAttribute}
          type="button"
          className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 text-sm sm:text-base font-bold transition-all shadow-sm ${
            isSpeaking
              ? 'bg-amber-500 text-black border-black ring-2 ring-black'
              : 'bg-[var(--bg-subtle)] text-[var(--text-primary)] border-[var(--border-strong)] hover:bg-amber-100 hover:text-black hover:border-amber-600'
          }`}
          title="Listen to this section aloud with text-to-speech / 朗讀此章節"
        >
          {isSpeaking ? (
            <>
              <VolumeX className="w-5 h-5 text-black" />
              <span>停止朗讀 Stop Voice</span>
            </>
          ) : (
            <>
              <Volume2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>朗讀此章節 Read This Section</span>
            </>
          )}
        </button>
      </div>

      {/* Plain-Language Takeaway for Elderly & All Readers */}
      <div className="p-4 sm:p-5 rounded-lg bg-amber-500/10 border-2 border-amber-500/40">
        <div className="text-xs font-mono uppercase tracking-wider text-amber-800 dark:text-amber-300 font-extrabold mb-1">
          {langMode === 'zh' ? '重點摘要 (大字速覽)' : 'Quick Takeaway · 大字速覽'}
        </div>
        <p className="text-base sm:text-lg md:text-xl font-bold leading-relaxed text-[var(--text-primary)]">
          {(langMode === 'both' || langMode === 'en') && <span>{attribute.shortSummary}</span>}
          {langMode === 'both' && <span className="block mt-2"></span>}
          {(langMode === 'both' || langMode === 'zh') && <span>{attribute.shortSummaryZh}</span>}
        </p>
      </div>

      {/* Senior & Accessibility Benefits */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Benefits for Seniors & Low-Vision Citizens</span>
          {(langMode === 'both' || langMode === 'zh') && (
            <span className="text-sm font-bold text-[var(--text-muted)] font-mono">
              / 銀髮長者與弱視族群實質助益
            </span>
          )}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {attribute.elderlyBenefits.map((benEn, idx) => {
            const benZh = attribute.elderlyBenefitsZh[idx];
            return (
              <div
                key={idx}
                className="p-3.5 sm:p-4 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-color)] flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-sm sm:text-base font-medium text-[var(--text-primary)] leading-snug">
                  {(langMode === 'both' || langMode === 'zh') && <div className="font-bold">{benZh}</div>}
                  {(langMode === 'both' || langMode === 'en') && (
                    <div className={langMode === 'both' ? 'text-xs sm:text-sm text-[var(--text-muted)] mt-1' : ''}>
                      {benEn}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Quantitative Metrics */}
      <div className="space-y-3 pt-2">
        <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-amber-500 rounded-sm"></span>
          <span>Core Quantitative Indicators</span>
          {(langMode === 'both' || langMode === 'zh') && (
            <span className="text-sm font-bold text-[var(--text-muted)] font-mono">/ 量化數據與指標</span>
          )}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {attribute.keyMetrics.map((metric, i) => (
            <div
              key={i}
              className="p-4 rounded-lg bg-[var(--bg-subtle)] border-2 border-[var(--border-color)] flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-bold">
                  {langMode === 'zh' ? metric.labelZh : metric.label}
                  {langMode === 'both' && <span className="block text-[11px] opacity-80">{metric.labelZh}</span>}
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black mt-2 text-[var(--text-primary)]">
                  {metric.value}
                </div>
                {metric.unit && (
                  <div className="text-xs font-semibold text-amber-700 dark:text-amber-400 font-mono mt-0.5">
                    {metric.unit}
                  </div>
                )}
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-3 pt-2 border-t border-[var(--border-color)] leading-relaxed">
                {langMode === 'zh' ? metric.detailZh : metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehensive Analysis */}
      <div className="space-y-2 pt-2 border-t border-[var(--border-color)]">
        <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-[var(--text-primary)]">
          In-Depth Urban Analysis · 深入分析
        </h3>
        <div className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-relaxed space-y-2">
          {(langMode === 'both' || langMode === 'en') && <p>{attribute.fullDescription}</p>}
          {(langMode === 'both' || langMode === 'zh') && <p className="font-medium">{attribute.fullDescriptionZh}</p>}
        </div>
      </div>

      {/* Linked Major Projects */}
      <div className="space-y-3 pt-2 border-t border-[var(--border-color)]">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-500 shrink-0" />
            <span>Key Projects Contributing to {attribute.title}</span>
            {(langMode === 'both' || langMode === 'zh') && (
              <span className="text-sm font-bold text-[var(--text-muted)] font-mono">/ 關聯重大建設計畫</span>
            )}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => onSelectProject(proj)}
              className="p-4 sm:p-5 rounded-lg border-2 border-[var(--border-color)] bg-[var(--bg-subtle)] hover:border-[var(--border-strong)] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[var(--text-muted)] mb-1">
                  <span>PROJECT #{proj.id}</span>
                  <span className="text-amber-700 dark:text-amber-400 font-semibold">{proj.category}</span>
                </div>
                <h4 className="text-lg sm:text-xl font-black text-[var(--text-primary)] group-hover:underline">
                  {proj.nameZh} <span className="font-normal text-sm sm:text-base opacity-80">({proj.nameEn})</span>
                </h4>
                <div className="text-xs text-[var(--text-muted)] font-mono mt-1">
                  {proj.statusZh} · {proj.statusEn}
                </div>
                <div className="mt-3 p-3 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs sm:text-sm font-medium text-[var(--text-primary)] leading-relaxed">
                  {(langMode === 'both' || langMode === 'zh') && (
                    <div className="font-semibold">{proj.impactsZh[attribute.id]}</div>
                  )}
                  {(langMode === 'both' || langMode === 'en') && (
                    <div className={langMode === 'both' ? 'text-xs text-[var(--text-muted)] mt-1' : ''}>
                      {proj.impacts[attribute.id]}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-bold text-[var(--text-primary)] group-hover:text-amber-600">
                <span>點擊查看完整建設詳情 View Details</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* District Highlights */}
      <div className="space-y-3 pt-2 border-t border-[var(--border-color)]">
        <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
          <MapPin className="w-5 h-5 text-rose-500 shrink-0" />
          <span>Regional District Impact in Taichung</span>
          {(langMode === 'both' || langMode === 'zh') && (
            <span className="text-sm font-bold text-[var(--text-muted)] font-mono">/ 原臺中市各行政區受惠情況</span>
          )}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {attribute.districtHighlights.map((dh, i) => (
            <div key={i} className="p-3.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-subtle)]">
              <div className="text-sm sm:text-base font-black text-[var(--text-primary)]">
                {dh.districtZh} <span className="text-xs font-normal opacity-80">({dh.district})</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 leading-snug">
                {langMode === 'zh' ? dh.impactZh : dh.impact}
                {langMode === 'both' && <span className="block mt-1 opacity-80 text-xs">{dh.impact}</span>}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
