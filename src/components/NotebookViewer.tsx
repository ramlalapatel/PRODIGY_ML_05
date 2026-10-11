import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  Code,
  FileText,
  Play,
  Terminal,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import {
  NOTEBOOK_CELLS,
  NotebookCell,
  generateJupyterNotebookJson,
  generatePythonScript,
} from '@/src/data/notebookCode.ts';
import { downloadFile } from '@/src/utils/downloadHelpers.ts';

export const NotebookViewer: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<number | 'all'>('all');
  const [copiedCellId, setCopiedCellId] = useState<string | null>(null);

  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCellId(id);
    setTimeout(() => setCopiedCellId(null), 2000);
  };

  const handleDownloadIpynb = () => {
    downloadFile(
      'food101_calorie_estimator.ipynb',
      generateJupyterNotebookJson(),
      'application/x-ipynb+json'
    );
  };

  const handleDownloadPy = () => {
    downloadFile(
      'food101_calorie_estimator.py',
      generatePythonScript(),
      'text/x-python'
    );
  };

  const filteredCells =
    selectedSection === 'all'
      ? NOTEBOOK_CELLS
      : NOTEBOOK_CELLS.filter((c) => c.section === selectedSection);

  const sectionsList = [
    { num: 'all', title: 'All Sections' },
    { num: 1, title: '1. Setup & tf.data Pipelines' },
    { num: 2, title: '2. Exploratory Data Analysis' },
    { num: 3, title: '3. 2-Phase Transfer Learning' },
    { num: 4, title: '4. Evaluation & Error Analysis' },
    { num: 5, title: '5. Calorie Estimation Engine' },
    { num: 6, title: '6. Daily Diet Tracker' },
    { num: 7, title: '7. Gradio UI & Serialization' },
    { num: 8, title: '8. Summary & Future Work' },
  ];

  return (
    <div className="space-y-8">
      {/* Header and Download Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Complete Colab & Kaggle Notebook (Python / TensorFlow)
            </h1>
            <p className="mt-1 text-xs text-slate-600">
              End-to-end, runnable notebook structured into 8 numbered sections with detailed markdown commentary, official splits, and no placeholders.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleDownloadIpynb}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .ipynb (Jupyter)</span>
            </button>
            <button
              onClick={handleDownloadPy}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <Code className="w-3.5 h-3.5" />
              <span>Download .py Script</span>
            </button>
          </div>
        </div>

        {/* Section Filter Buttons */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {sectionsList.map((sec) => (
            <button
              key={String(sec.num)}
              onClick={() => setSelectedSection(sec.num as any)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer font-medium ${
                selectedSection === sec.num
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {sec.title}
            </button>
          ))}
        </div>
      </div>

      {/* Cells List */}
      <div className="space-y-6">
        {filteredCells.map((cell) => {
          const isCopied = copiedCellId === cell.id;

          if (cell.type === 'markdown') {
            return (
              <div
                key={cell.id}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs prose prose-slate max-w-none text-xs leading-relaxed"
              >
                <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px] mb-3">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>[Markdown Cell] {cell.title || 'Section Notes'}</span>
                </div>
                <div className="whitespace-pre-line text-slate-800 font-sans text-sm">
                  {cell.content}
                </div>
              </div>
            );
          }

          return (
            <div
              key={cell.id}
              className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xs"
            >
              {/* Cell Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-300 font-medium">
                  <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                  <span className="font-mono text-emerald-400">In [ ]:</span>
                  <span>{cell.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCode(cell.content, cell.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Cell</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code Editor Body */}
              <div className="p-4 overflow-x-auto">
                <pre className="font-mono text-xs text-slate-200 leading-relaxed">
                  <code>{cell.content}</code>
                </pre>
              </div>

              {/* Execution Output Simulation */}
              {cell.outputPreview && (
                <div className="border-t border-slate-800 bg-slate-900/60 p-4">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono mb-2">
                    <Terminal className="w-3.5 h-3.5 text-slate-500" />
                    <span>Out [ ]: Execution Output</span>
                  </div>
                  <pre className="font-mono text-[11px] text-emerald-300/90 whitespace-pre-wrap leading-relaxed">
                    {cell.outputPreview}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
