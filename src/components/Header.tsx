import React from 'react';
import { ThemeMode, FontSize } from '../types';
import { Volume2, VolumeX, Eye, ZoomIn } from 'lucide-react';

interface HeaderProps {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  fontSize: FontSize;
  setFontSize: (s: FontSize) => void;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
  langMode: 'both' | 'zh' | 'en';
  setLangMode: (l: 'both' | 'zh' | 'en') => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  setTheme,
  fontSize,
  setFontSize,
  isSpeaking,
  onToggleSpeech,
  langMode,
  setLangMode,
}) => {
  return (
    <header className="border-b-2 border-[var(--border-strong)] bg-[var(--bg-surface)] py-4 px-4 sm:px-6 md:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Top bar with accessibility settings */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[var(--text-muted)] font-bold">
            <span className="w-2.5 h-2.5 bg-amber-500 rounded-full inline-block animate-pulse" aria-hidden="true"></span>
            <span>HYD 2026 TAICHUNG · SHUINAN & FORMER CITY</span>
          </div>

          {/* Senior & Accessibility Toolbar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Audio Reader */}
            <button
              onClick={onToggleSpeech}
              type="button"
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded border-2 text-xs sm:text-sm font-semibold transition-all ${
                isSpeaking
                  ? 'bg-amber-500 text-black border-amber-600 font-bold'
                  : 'bg-[var(--bg-subtle)] text-[var(--text-primary)] border-[var(--border-color)] hover:border-[var(--text-primary)]'
              }`}
              title="Read text aloud for seniors / 語音朗讀"
              aria-label={isSpeaking ? 'Stop reading aloud' : 'Read content aloud with voice'}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 shrink-0 text-black" />
                  <span>停止朗讀 Stop Voice</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 shrink-0" />
                  <span>語音朗讀 Read Aloud</span>
                </>
              )}
            </button>

            {/* Font Size Adjuster */}
            <div className="inline-flex items-center border-2 border-[var(--border-strong)] rounded overflow-hidden bg-[var(--bg-subtle)]">
              <span className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1 border-r border-[var(--border-color)]">
                <ZoomIn className="w-3.5 h-3.5" /> 字級
              </span>
              <button
                type="button"
                onClick={() => setFontSize('normal')}
                className={`px-2.5 py-1 text-xs font-bold transition-colors ${
                  fontSize === 'normal'
                    ? 'bg-[var(--accent-color)] text-[var(--accent-contrast)]'
                    : 'text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                }`}
                title="Normal text size (100%)"
                aria-pressed={fontSize === 'normal'}
              >
                標準 A
              </button>
              <button
                type="button"
                onClick={() => setFontSize('large')}
                className={`px-2.5 py-1 text-xs sm:text-sm font-bold border-l border-[var(--border-color)] transition-colors ${
                  fontSize === 'large'
                    ? 'bg-[var(--accent-color)] text-[var(--accent-contrast)]'
                    : 'text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                }`}
                title="Large text size (120%) - Recommended for seniors"
                aria-pressed={fontSize === 'large'}
              >
                放大 A+
              </button>
              <button
                type="button"
                onClick={() => setFontSize('xlarge')}
                className={`px-2.5 py-1 text-sm font-black border-l border-[var(--border-color)] transition-colors ${
                  fontSize === 'xlarge'
                    ? 'bg-[var(--accent-color)] text-[var(--accent-contrast)]'
                    : 'text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                }`}
                title="Extra large text size (140%) - High visibility"
                aria-pressed={fontSize === 'xlarge'}
              >
                特大 A++
              </button>
            </div>

            {/* Contrast Theme Selector */}
            <div className="inline-flex items-center border-2 border-[var(--border-strong)] rounded overflow-hidden bg-[var(--bg-subtle)]">
              <span className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1 border-r border-[var(--border-color)]">
                <Eye className="w-3.5 h-3.5" /> 對比
              </span>
              <button
                type="button"
                onClick={() => setTheme('crisp')}
                className={`px-2 py-1 text-xs font-bold transition-colors ${
                  theme === 'crisp'
                    ? 'bg-[var(--accent-color)] text-[var(--accent-contrast)]'
                    : 'text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                }`}
                title="Crisp high-contrast light theme"
                aria-pressed={theme === 'crisp'}
              >
                明亮
              </button>
              <button
                type="button"
                onClick={() => setTheme('paper')}
                className={`px-2 py-1 text-xs font-bold border-l border-[var(--border-color)] transition-colors ${
                  theme === 'paper'
                    ? 'bg-[var(--accent-color)] text-[var(--accent-contrast)]'
                    : 'text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                }`}
                title="Warm paper editorial theme (HYD Deck)"
                aria-pressed={theme === 'paper'}
              >
                暖紙
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`px-2 py-1 text-xs font-bold border-l border-[var(--border-color)] transition-colors ${
                  theme === 'dark'
                    ? 'bg-[var(--accent-color)] text-[var(--accent-contrast)]'
                    : 'text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                }`}
                title="Dark high-contrast theme"
                aria-pressed={theme === 'dark'}
              >
                深黑
              </button>
              <button
                type="button"
                onClick={() => setTheme('yellow')}
                className={`px-2 py-1 text-xs font-bold border-l border-[var(--border-color)] transition-colors ${
                  theme === 'yellow'
                    ? 'bg-[#facc15] text-black font-black'
                    : 'text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                }`}
                title="Ultra high contrast yellow-on-black for low-vision eyes"
                aria-pressed={theme === 'yellow'}
              >
                高反差黃
              </button>
            </div>

            {/* Language switch */}
            <div className="inline-flex items-center border border-[var(--border-color)] rounded text-xs overflow-hidden">
              <button
                type="button"
                onClick={() => setLangMode('both')}
                className={`px-2 py-1 font-bold ${
                  langMode === 'both' ? 'bg-[var(--text-primary)] text-[var(--bg-base)]' : 'text-[var(--text-secondary)]'
                }`}
              >
                雙語
              </button>
              <button
                type="button"
                onClick={() => setLangMode('zh')}
                className={`px-2 py-1 font-bold border-l border-[var(--border-color)] ${
                  langMode === 'zh' ? 'bg-[var(--text-primary)] text-[var(--bg-base)]' : 'text-[var(--text-secondary)]'
                }`}
              >
                中文
              </button>
              <button
                type="button"
                onClick={() => setLangMode('en')}
                className={`px-2 py-1 font-bold border-l border-[var(--border-color)] ${
                  langMode === 'en' ? 'bg-[var(--text-primary)] text-[var(--bg-base)]' : 'text-[var(--text-secondary)]'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* Main Title Section */}
        <div className="pt-2">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-b border-[var(--border-color)] pb-3">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                HYD2026 Taichung <span className="font-serif-display italic font-normal text-amber-600 dark:text-amber-400">Impacts</span>
                {(langMode === 'both' || langMode === 'zh') && (
                  <span className="block sm:inline sm:ml-4 text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--text-secondary)]">
                    臺中永續六大面向影響力評估
                  </span>
                )}
              </h1>
              <p className="mt-2 text-sm sm:text-base md:text-lg text-[var(--text-secondary)] max-w-4xl font-medium">
                {(langMode === 'both' || langMode === 'en') && (
                  <span>
                    Research data, spatial basemaps, and accessibility indicators for the former Taichung City and the Shuinan Economic and Trade Park.
                  </span>
                )}
                {langMode === 'both' && <span className="block mt-1"></span>}
                {(langMode === 'both' || langMode === 'zh') && (
                  <span className="opacity-90">
                    針對大臺中舊城區與水湳經貿園區規劃，提供長者友善、高對比易讀之六大永續面向分析與圖資。
                  </span>
                )}
              </p>
            </div>
            <div className="shrink-0 text-xs text-[var(--text-muted)] font-mono flex items-center gap-1.5 self-start md:self-end">
              <span>WCAG AAA 7:1+ 對比標準</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
