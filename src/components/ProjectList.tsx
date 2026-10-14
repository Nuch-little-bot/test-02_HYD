import React, { useState } from 'react';
import { ProjectData, ImpactId } from '../types';
import { Search, Building2, ExternalLink, Filter } from 'lucide-react';

interface ProjectListProps {
  projects: ProjectData[];
  selectedAttributeId: ImpactId;
  onSelectProject: (p: ProjectData) => void;
  langMode: 'both' | 'zh' | 'en';
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  selectedAttributeId,
  onSelectProject,
  langMode,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.nameZh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.statusZh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.impactsZh[selectedAttributeId].toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[var(--bg-surface)] p-5 sm:p-7 rounded-xl border-2 border-[var(--border-strong)] space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[var(--border-color)] pb-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] flex items-center gap-2">
            <Building2 className="w-6 h-6 text-amber-500" />
            <span>Major Projects in Shuinan Park (2026)</span>
            {(langMode === 'both' || langMode === 'zh') && (
              <span className="block sm:inline sm:ml-2 text-base sm:text-lg font-bold text-[var(--text-secondary)] font-mono">
                / 水湳園區重大建設計畫進度與影響
              </span>
            )}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 font-medium">
            Status and multi-dimensional impact assessments compiled from official Taichung City Government reports.
          </p>
        </div>

        {/* Search input with large font for seniors */}
        <div className="relative w-full md:w-72">
          <label htmlFor="project-search" className="sr-only">Search projects</label>
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
          <input
            id="project-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋建設名稱或關鍵字 Search..."
            className="w-full pl-9 pr-3 py-2 text-sm sm:text-base rounded-lg border-2 border-[var(--border-color)] bg-[var(--bg-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--text-primary)] font-medium"
          />
        </div>
      </div>

      {/* Category Filter buttons */}
      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
        <span className="text-xs font-mono font-bold text-[var(--text-muted)] flex items-center gap-1 uppercase mr-1">
          <Filter className="w-3.5 h-3.5" /> 類別 Category:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            type="button"
            className={`px-3 py-1.5 rounded border-2 font-bold transition-colors ${
              activeCategory === cat
                ? 'bg-[var(--text-primary)] text-[var(--bg-base)] border-[var(--text-primary)]'
                : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--text-primary)]'
            }`}
          >
            {cat === 'all' ? '全部 All' : cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="p-5 rounded-lg border-2 border-[var(--border-color)] bg-[var(--bg-subtle)] hover:border-[var(--border-strong)] transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs font-mono font-bold text-[var(--text-primary)]">
                  #{proj.id} · {proj.category}
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)] font-semibold text-right">
                  {proj.keyFiguresEn}
                </span>
              </div>

              <div>
                <h4 className="text-lg sm:text-xl font-black text-[var(--text-primary)] leading-tight">
                  {proj.nameZh}
                </h4>
                <div className="text-xs sm:text-sm font-medium text-[var(--text-muted)] mt-0.5">
                  {proj.nameEn}
                </div>
              </div>

              <div className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 p-2 rounded border border-amber-500/20">
                進度 Status: {proj.statusZh} ({proj.statusEn})
              </div>

              {/* Impact for active attribute */}
              <div className="p-3 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs sm:text-sm leading-relaxed">
                <div className="text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-extrabold mb-1">
                  Active Focus: {selectedAttributeId} Impact
                </div>
                {(langMode === 'both' || langMode === 'zh') && (
                  <p className="font-bold text-[var(--text-primary)]">
                    {proj.impactsZh[selectedAttributeId]}
                  </p>
                )}
                {(langMode === 'both' || langMode === 'en') && (
                  <p className={langMode === 'both' ? 'text-xs text-[var(--text-muted)] mt-1' : 'text-[var(--text-primary)]'}>
                    {proj.impacts[selectedAttributeId]}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-semibold">
              <div className="text-[11px] text-[var(--text-muted)] line-clamp-1 max-w-[240px]">
                來源: {proj.source}
              </div>
              {proj.osmUrl && (
                <a
                  href={proj.osmUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[var(--text-primary)] hover:underline shrink-0"
                >
                  <span>OSM</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
