import React from 'react';
import { ImpactAttribute, ImpactId } from '../types';
import { Check, ArrowRight } from 'lucide-react';

interface AttributeComparisonProps {
  attributes: ImpactAttribute[];
  selectedId: ImpactId;
  onSelect: (id: ImpactId) => void;
  langMode: 'both' | 'zh' | 'en';
}

export const AttributeComparison: React.FC<AttributeComparisonProps> = ({
  attributes,
  selectedId,
  onSelect,
  langMode,
}) => {
  return (
    <div className="bg-[var(--bg-surface)] p-5 sm:p-7 rounded-xl border-2 border-[var(--border-strong)] space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[var(--border-color)] pb-3">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
            6 Attributes Comparison Matrix
            {(langMode === 'both' || langMode === 'zh') && (
              <span className="block sm:inline sm:ml-3 text-lg font-extrabold text-[var(--text-secondary)]">
                六大面向綜合對照矩陣
              </span>
            )}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Compare quantitative KPIs, senior amenities, and major initiatives at a glance.
          </p>
        </div>
      </div>

      {/* Table with high contrast and clear borders */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border-2 border-[var(--border-strong)]">
          <thead>
            <tr className="bg-[var(--text-primary)] text-[var(--bg-base)]">
              <th className="p-3 sm:p-4 text-xs font-mono uppercase tracking-wider border border-[var(--border-strong)] w-1/4">
                Attribute 面向
              </th>
              <th className="p-3 sm:p-4 text-xs font-mono uppercase tracking-wider border border-[var(--border-strong)] w-1/4">
                Primary Metric 核心指標
              </th>
              <th className="p-3 sm:p-4 text-xs font-mono uppercase tracking-wider border border-[var(--border-strong)] w-1/3">
                Key Senior Benefit 銀髮長輩效益
              </th>
              <th className="p-3 sm:p-4 text-xs font-mono uppercase tracking-wider border border-[var(--border-strong)] text-center">
                Action 動作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-[var(--border-color)] text-sm sm:text-base">
            {attributes.map((attr) => {
              const isSelected = selectedId === attr.id;
              const primaryMetric = attr.keyMetrics[0];
              const primaryElderlyBenefitZh = attr.elderlyBenefitsZh[0];
              const primaryElderlyBenefitEn = attr.elderlyBenefits[0];

              return (
                <tr
                  key={attr.id}
                  className={`transition-colors ${
                    isSelected
                      ? 'bg-amber-500/15 font-semibold'
                      : 'hover:bg-[var(--bg-subtle)]'
                  }`}
                >
                  <td className="p-3 sm:p-4 border border-[var(--border-color)] align-top">
                    <div className="font-black text-base text-[var(--text-primary)]">
                      {(langMode === 'both' || langMode === 'en') && <div>{attr.title}</div>}
                      {(langMode === 'both' || langMode === 'zh') && (
                        <div className="text-sm font-bold text-amber-700 dark:text-amber-400">
                          {attr.titleZh}
                        </div>
                      )}
                    </div>
                    <div className="text-xs font-mono text-[var(--text-muted)] mt-1">
                      {attr.kicker}
                    </div>
                  </td>

                  <td className="p-3 sm:p-4 border border-[var(--border-color)] align-top">
                    <div className="text-lg sm:text-xl font-black text-[var(--text-primary)]">
                      {primaryMetric.value} <span className="text-xs font-normal opacity-80">{primaryMetric.unit}</span>
                    </div>
                    <div className="text-xs text-[var(--text-muted)] mt-0.5">
                      {langMode === 'zh' ? primaryMetric.labelZh : primaryMetric.label}
                    </div>
                  </td>

                  <td className="p-3 sm:p-4 border border-[var(--border-color)] align-top">
                    <div className="text-sm font-medium text-[var(--text-primary)]">
                      {(langMode === 'both' || langMode === 'zh') && (
                        <div className="font-bold">{primaryElderlyBenefitZh}</div>
                      )}
                      {(langMode === 'both' || langMode === 'en') && (
                        <div className={langMode === 'both' ? 'text-xs text-[var(--text-muted)] mt-1' : ''}>
                          {primaryElderlyBenefitEn}
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="p-3 sm:p-4 border border-[var(--border-color)] align-top text-center">
                    <button
                      type="button"
                      onClick={() => onSelect(attr.id)}
                      className={`px-3 py-1.5 rounded border-2 text-xs font-bold transition-all inline-flex items-center gap-1 ${
                        isSelected
                          ? 'bg-[var(--text-primary)] text-[var(--bg-base)] border-[var(--text-primary)]'
                          : 'bg-[var(--bg-subtle)] border-[var(--border-color)] hover:border-[var(--text-primary)]'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>已選 Active</span>
                        </>
                      ) : (
                        <>
                          <span>檢視 View</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
