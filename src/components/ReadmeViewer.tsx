import React, { useState } from 'react';
import { Copy, Check, Download, FileCode } from 'lucide-react';
import { generateReadmeMarkdown } from '@/src/data/notebookCode.ts';
import { downloadFile } from '@/src/utils/downloadHelpers.ts';

export const ReadmeViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const readmeContent = generateReadmeMarkdown();

  const handleCopy = () => {
    navigator.clipboard.writeText(readmeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadFile('README.md', readmeContent, 'text/markdown');
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            GitHub Repository Documentation (README.md)
          </h1>
          <p className="mt-1 text-xs text-slate-600">
            Production-grade open-source documentation with project overview, transfer learning architecture, benchmark tables, and reproduction instructions.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Markdown</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download README.md</span>
          </button>
        </div>
      </div>

      {/* Markdown Code Preview */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xs">
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-300 font-mono">
            <FileCode className="w-3.5 h-3.5 text-emerald-400" />
            <span>README.md</span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Markdown (GFM)</span>
        </div>
        <div className="p-5 overflow-x-auto max-h-[700px] overflow-y-auto">
          <pre className="font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
            {readmeContent}
          </pre>
        </div>
      </div>
    </div>
  );
};
