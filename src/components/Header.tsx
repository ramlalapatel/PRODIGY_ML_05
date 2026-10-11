import React from 'react';
import { Download } from 'lucide-react';
import {
  generateJupyterNotebookJson,
  generatePythonScript,
  generateReadmeMarkdown,
} from '@/src/data/notebookCode.ts';
import { generateFoodCaloriesCsv } from '@/src/data/food101_nutrition.ts';
import { downloadFile } from '@/src/utils/downloadHelpers.ts';

interface HeaderProps {
  activeTab: 'demo' | 'notebook' | 'database' | 'metrics' | 'readme' | 'github';
  setActiveTab: (tab: 'demo' | 'notebook' | 'database' | 'metrics' | 'readme' | 'github') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [showExportMenu, setShowExportMenu] = React.useState(false);

  const handleDownloadNotebook = () => {
    downloadFile(
      'food101_calorie_estimator.ipynb',
      generateJupyterNotebookJson(),
      'application/x-ipynb+json'
    );
  };

  const handleDownloadScript = () => {
    downloadFile(
      'food101_calorie_estimator.py',
      generatePythonScript(),
      'text/x-python'
    );
  };

  const handleDownloadCsv = () => {
    downloadFile(
      'food_calories.csv',
      generateFoodCaloriesCsv(),
      'text/csv'
    );
  };

  const handleDownloadReadme = () => {
    downloadFile(
      'README.md',
      generateReadmeMarkdown(),
      'text/markdown'
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Brand wordmark */}
        <button
          onClick={() => setActiveTab('demo')}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-emerald-700 transition-colors cursor-pointer text-left"
        >
          NutriVision Food-101
        </button>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('demo')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'demo'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            Live Classifier
          </button>
          <button
            onClick={() => setActiveTab('notebook')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'notebook'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            Notebook Code
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'database'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            101 Nutrition Table
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'metrics'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            ML Metrics
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
              activeTab === 'github'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            <span>GitHub & Deploy</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </button>
          <button
            onClick={() => setActiveTab('readme')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
              activeTab === 'readme'
                ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                : 'hover:text-slate-900'
            }`}
          >
            README
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="relative shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadNotebook}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              Download .ipynb
            </button>
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              aria-label="Export options"
              className="p-2 text-xs text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
              title="More export options"
            >
              <span className="sr-only">Export options</span>
              ▾
            </button>
          </div>

          {showExportMenu && (
            <div
              className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg py-1.5 z-50 text-xs"
              onClick={() => setShowExportMenu(false)}
            >
              <button
                onClick={handleDownloadNotebook}
                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 font-medium text-slate-700 flex items-center justify-between cursor-pointer"
              >
                <span>Colab Notebook (.ipynb)</span>
                <span className="text-slate-400 font-mono text-[10px]">JSON</span>
              </button>
              <button
                onClick={handleDownloadScript}
                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 font-medium text-slate-700 flex items-center justify-between cursor-pointer"
              >
                <span>Standalone Script (.py)</span>
                <span className="text-slate-400 font-mono text-[10px]">PY</span>
              </button>
              <button
                onClick={handleDownloadCsv}
                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 font-medium text-slate-700 flex items-center justify-between cursor-pointer"
              >
                <span>Nutrition Table (.csv)</span>
                <span className="text-slate-400 font-mono text-[10px]">CSV</span>
              </button>
              <button
                onClick={handleDownloadReadme}
                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 font-medium text-slate-700 flex items-center justify-between cursor-pointer"
              >
                <span>Project README (.md)</span>
                <span className="text-slate-400 font-mono text-[10px]">MD</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile nav subbar */}
      <div className="lg:hidden flex items-center gap-4 px-6 py-2 overflow-x-auto border-t border-slate-100 text-xs text-slate-600">
        <button
          onClick={() => setActiveTab('demo')}
          className={`whitespace-nowrap ${activeTab === 'demo' ? 'font-semibold text-slate-900' : ''}`}
        >
          Classifier
        </button>
        <button
          onClick={() => setActiveTab('notebook')}
          className={`whitespace-nowrap ${activeTab === 'notebook' ? 'font-semibold text-slate-900' : ''}`}
        >
          Notebook
        </button>
        <button
          onClick={() => setActiveTab('database')}
          className={`whitespace-nowrap ${activeTab === 'database' ? 'font-semibold text-slate-900' : ''}`}
        >
          101 Nutrition
        </button>
        <button
          onClick={() => setActiveTab('metrics')}
          className={`whitespace-nowrap ${activeTab === 'metrics' ? 'font-semibold text-slate-900' : ''}`}
        >
          Metrics
        </button>
        <button
          onClick={() => setActiveTab('github')}
          className={`whitespace-nowrap ${activeTab === 'github' ? 'font-semibold text-slate-900' : ''}`}
        >
          GitHub & Deploy
        </button>
        <button
          onClick={() => setActiveTab('readme')}
          className={`whitespace-nowrap ${activeTab === 'readme' ? 'font-semibold text-slate-900' : ''}`}
        >
          README
        </button>
      </div>
    </header>
  );
};
