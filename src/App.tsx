/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ThemeMode, FontSize, ImpactId, ProjectData } from './types';
import { IMPACT_ATTRIBUTES, MAJOR_PROJECTS, FORMER_CITY_DISTRICTS } from './data/impactData';
import { Header } from './components/Header';
import { AttributeSelector } from './components/AttributeSelector';
import { AttributeDetail } from './components/AttributeDetail';
import { AttributeComparison } from './components/AttributeComparison';
import { TaichungMap } from './components/TaichungMap';
import { ProjectList } from './components/ProjectList';
import { DataDownloads } from './components/DataDownloads';
import { Layers, Map as MapIcon, BarChart2, Building, Download, Heart } from 'lucide-react';

export default function App() {
  const [selectedAttributeId, setSelectedAttributeId] = useState<ImpactId>('environmental');
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('hyd2026_theme') as ThemeMode) || 'crisp';
  });
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    return (localStorage.getItem('hyd2026_fontsize') as FontSize) || 'normal';
  });
  const [langMode, setLangMode] = useState<'both' | 'zh' | 'en'>('both');
  const [activeTab, setActiveTab] = useState<'detail' | 'compare' | 'map' | 'projects' | 'data'>('detail');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(MAJOR_PROJECTS[0]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Sync theme and font size with document root
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('hyd2026_theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.fontsize = fontSize;
    localStorage.setItem('hyd2026_fontsize', fontSize);
  }, [fontSize]);

  const activeAttribute = IMPACT_ATTRIBUTES.find((a) => a.id === selectedAttributeId) || IMPACT_ATTRIBUTES[0];

  // Stop speech if unmounting or changing
  const stopSpeech = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  const handleToggleSpeech = useCallback(() => {
    if (!('speechSynthesis' in window)) {
      alert('Your browser does not support Web Speech API.');
      return;
    }

    if (isSpeaking) {
      stopSpeech();
      return;
    }

    stopSpeech();

    // Prepare text to read
    const textToSpeak =
      langMode === 'en'
        ? `${activeAttribute.title}. ${activeAttribute.shortSummary}. ${activeAttribute.fullDescription}`
        : `${activeAttribute.titleZh}。${activeAttribute.shortSummaryZh}。${activeAttribute.fullDescriptionZh}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = langMode === 'en' ? 'en-US' : 'zh-TW';
    utterance.rate = 0.9; // Slightly slower, calm pacing for senior listeners
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  }, [activeAttribute, isSpeaking, langMode, stopSpeech]);

  const handleSelectAttribute = (id: ImpactId) => {
    setSelectedAttributeId(id);
    stopSpeech();
    // When changing attribute, stay on detail or comparison
    if (activeTab !== 'detail' && activeTab !== 'compare' && activeTab !== 'map') {
      setActiveTab('detail');
    }
  };

  const handleSelectProject = (p: ProjectData) => {
    setSelectedProject(p);
    setActiveTab('map');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors">
      {/* Accessible Header */}
      <Header
        theme={theme}
        setTheme={setTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
        isSpeaking={isSpeaking}
        onToggleSpeech={handleToggleSpeech}
        langMode={langMode}
        setLangMode={setLangMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8 space-y-8">
        {/* Core Requirement 1: Clickable Attributes */}
        <AttributeSelector
          selectedId={selectedAttributeId}
          onSelect={handleSelectAttribute}
          langMode={langMode}
        />

        {/* View Mode Navigation Tabs (Clean, minimal, high-contrast) */}
        <div className="border-b-2 border-[var(--border-strong)] flex flex-wrap items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('detail')}
            className={`px-4 py-2.5 rounded-t-lg font-bold text-xs sm:text-sm md:text-base border-t-2 border-x-2 transition-all inline-flex items-center gap-2 ${
              activeTab === 'detail'
                ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-strong)] -mb-[2px] shadow-sm z-10'
                : 'bg-[var(--bg-subtle)] text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-500" />
            <span>Attribute Details · 面向解析</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('compare')}
            className={`px-4 py-2.5 rounded-t-lg font-bold text-xs sm:text-sm md:text-base border-t-2 border-x-2 transition-all inline-flex items-center gap-2 ${
              activeTab === 'compare'
                ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-strong)] -mb-[2px] shadow-sm z-10'
                : 'bg-[var(--bg-subtle)] text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]'
            }`}
          >
            <BarChart2 className="w-4 h-4 text-amber-500" />
            <span>Compare 6 Matrix · 綜合對照</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('map')}
            className={`px-4 py-2.5 rounded-t-lg font-bold text-xs sm:text-sm md:text-base border-t-2 border-x-2 transition-all inline-flex items-center gap-2 ${
              activeTab === 'map'
                ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-strong)] -mb-[2px] shadow-sm z-10'
                : 'bg-[var(--bg-subtle)] text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]'
            }`}
          >
            <MapIcon className="w-4 h-4 text-amber-500" />
            <span>Interactive Map · 基本圖與地圖</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2.5 rounded-t-lg font-bold text-xs sm:text-sm md:text-base border-t-2 border-x-2 transition-all inline-flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-strong)] -mb-[2px] shadow-sm z-10'
                : 'bg-[var(--bg-subtle)] text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]'
            }`}
          >
            <Building className="w-4 h-4 text-amber-500" />
            <span>Major Projects · 園區重大建設</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('data')}
            className={`px-4 py-2.5 rounded-t-lg font-bold text-xs sm:text-sm md:text-base border-t-2 border-x-2 transition-all inline-flex items-center gap-2 ${
              activeTab === 'data'
                ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-strong)] -mb-[2px] shadow-sm z-10'
                : 'bg-[var(--bg-subtle)] text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]'
            }`}
          >
            <Download className="w-4 h-4 text-amber-500" />
            <span>Open Data & Zoning · 資料下載</span>
          </button>
        </div>

        {/* Tab View Content */}
        {activeTab === 'detail' && (
          <AttributeDetail
            attribute={activeAttribute}
            projects={MAJOR_PROJECTS}
            onSelectProject={handleSelectProject}
            langMode={langMode}
            isSpeaking={isSpeaking}
            onReadAttribute={handleToggleSpeech}
          />
        )}

        {activeTab === 'compare' && (
          <AttributeComparison
            attributes={IMPACT_ATTRIBUTES}
            selectedId={selectedAttributeId}
            onSelect={handleSelectAttribute}
            langMode={langMode}
          />
        )}

        {activeTab === 'map' && (
          <TaichungMap
            districts={FORMER_CITY_DISTRICTS}
            projects={MAJOR_PROJECTS}
            selectedAttributeId={selectedAttributeId}
            selectedProject={selectedProject}
            onSelectProject={(p) => setSelectedProject(p)}
            langMode={langMode}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectList
            projects={MAJOR_PROJECTS}
            selectedAttributeId={selectedAttributeId}
            onSelectProject={handleSelectProject}
            langMode={langMode}
          />
        )}

        {activeTab === 'data' && <DataDownloads langMode={langMode} />}
      </main>

      {/* Accessible Footer */}
      <footer className="mt-12 border-t-2 border-[var(--border-strong)] bg-[var(--bg-surface)] py-6 px-4 sm:px-6 md:px-8 text-xs sm:text-sm text-[var(--text-muted)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-bold text-[var(--text-primary)]">
              HYD2026 Taichung: Urban Impacts & Spatial Research
            </div>
            <div>
              Prepared for <span className="font-semibold text-amber-600 dark:text-amber-400">#HackYourDistrict 2026</span> · Former Taichung City & Shuinan Park.
            </div>
            <div className="text-[11px] font-mono">
              Designed with WCAG AAA accessibility, high-contrast palette, and large touch targets for elderly citizens.
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--bg-subtle)] hover:border-[var(--text-primary)] text-[var(--text-primary)] font-bold"
            >
              ↑ 回到頁首 Back to Top
            </button>
            <a
              href="https://github.com/Nuch-little-bot/HYD2026_Taichung"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--text-primary)] hover:underline"
            >
              GitHub: Nuch-little-bot/HYD2026_Taichung
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
