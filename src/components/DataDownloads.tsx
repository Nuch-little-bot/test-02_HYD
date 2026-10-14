import React from 'react';
import { RAW_DATA_FILES, SHUINAN_ZONING } from '../data/impactData';
import { Download, FileText, PieChart } from 'lucide-react';

interface DataDownloadsProps {
  langMode: 'both' | 'zh' | 'en';
}

export const DataDownloads: React.FC<DataDownloadsProps> = ({ langMode }) => {
  return (
    <div className="space-y-6">
      {/* Land Use Zoning Breakdown */}
      <div className="bg-[var(--bg-surface)] p-5 sm:p-7 rounded-xl border-2 border-[var(--border-strong)] space-y-4">
        <div className="border-b-2 border-[var(--border-color)] pb-3">
          <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] flex items-center gap-2">
            <PieChart className="w-6 h-6 text-amber-500" />
            <span>Shuinan Airport Site Detailed Plan: Land Use</span>
            {(langMode === 'both' || langMode === 'zh') && (
              <span className="block sm:inline sm:ml-2 text-base sm:text-lg font-bold text-[var(--text-secondary)] font-mono">
                / 水湳機場原址細部計畫：土地使用面積
              </span>
            )}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 font-medium">
            Official land use zoning allocations and area percentages (2nd Comprehensive Review, 2024-02-01).
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-[var(--border-color)] text-xs sm:text-sm">
            <thead>
              <tr className="bg-[var(--bg-subtle)] text-[var(--text-primary)] border-b-2 border-[var(--border-strong)] font-mono uppercase">
                <th className="p-3 border border-[var(--border-color)]">Land Use Zone 分區名稱</th>
                <th className="p-3 border border-[var(--border-color)] text-right">Area (ha) 面積 (公頃)</th>
                <th className="p-3 border border-[var(--border-color)] text-right">Share 佔比 (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y border border-[var(--border-color)]">
              {SHUINAN_ZONING.map((z, idx) => (
                <tr key={idx} className="hover:bg-[var(--bg-subtle)] transition-colors">
                  <td className="p-3 border border-[var(--border-color)] font-medium">
                    <span className="font-bold text-[var(--text-primary)]">{z.zoneZh}</span>
                    <span className="text-xs text-[var(--text-muted)] block sm:inline sm:ml-2">({z.zoneEn})</span>
                  </td>
                  <td className="p-3 border border-[var(--border-color)] text-right font-mono font-bold text-[var(--text-primary)]">
                    {z.areaHa.toFixed(2)}
                  </td>
                  <td className="p-3 border border-[var(--border-color)] text-right font-mono font-bold text-amber-700 dark:text-amber-400">
                    {z.sharePct.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Downloadable Research Files */}
      <div className="bg-[var(--bg-surface)] p-5 sm:p-7 rounded-xl border-2 border-[var(--border-strong)] space-y-4">
        <div className="border-b-2 border-[var(--border-color)] pb-3">
          <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-500" />
            <span>Open Data & GIS Downloads</span>
            {(langMode === 'both' || langMode === 'zh') && (
              <span className="block sm:inline sm:ml-2 text-base sm:text-lg font-bold text-[var(--text-secondary)] font-mono">
                / 開放資料與地理圖資下載
              </span>
            )}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1 font-medium">
            Open government data, CAD drawings, and GIS GeoJSON files prepared for #HackYourDistrict 2026.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-[var(--border-color)] text-xs sm:text-sm">
            <thead>
              <tr className="bg-[var(--bg-subtle)] text-[var(--text-primary)] border-b-2 border-[var(--border-strong)] font-mono uppercase">
                <th className="p-3 border border-[var(--border-color)]">Dataset Title 圖資標題</th>
                <th className="p-3 border border-[var(--border-color)]">Format 格式</th>
                <th className="p-3 border border-[var(--border-color)] text-right">Size 檔案大小</th>
                <th className="p-3 border border-[var(--border-color)] text-center">Download 下載</th>
              </tr>
            </thead>
            <tbody className="divide-y border border-[var(--border-color)]">
              {RAW_DATA_FILES.map((file, i) => (
                <tr key={i} className="hover:bg-[var(--bg-subtle)] transition-colors">
                  <td className="p-3 border border-[var(--border-color)]">
                    <div className="font-bold text-[var(--text-primary)]">{file.title}</div>
                    <div className="text-xs font-semibold text-amber-700 dark:text-amber-400 mt-0.5">{file.titleZh}</div>
                    <p className="text-xs text-[var(--text-muted)] mt-1">{file.desc}</p>
                  </td>
                  <td className="p-3 border border-[var(--border-color)] font-mono font-bold text-xs">
                    <span className="px-2 py-0.5 rounded bg-[var(--bg-subtle)] border border-[var(--border-color)]">
                      {file.format}
                    </span>
                  </td>
                  <td className="p-3 border border-[var(--border-color)] text-right font-mono font-bold text-xs text-[var(--text-muted)]">
                    {file.size}
                  </td>
                  <td className="p-3 border border-[var(--border-color)] text-center">
                    <a
                      href={file.url}
                      download
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border-2 border-[var(--border-strong)] font-bold text-xs bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] transition-colors text-[var(--text-primary)]"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>下載</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
