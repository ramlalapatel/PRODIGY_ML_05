import React, { useState } from 'react';
import {
  GitBranch,
  ExternalLink,
  Copy,
  Check,
  Globe,
  CheckCircle2,
  Terminal,
  BookOpen,
  Sparkles,
} from 'lucide-react';

export const GithubDeployGuide: React.FC = () => {
  const [username, setUsername] = useState('your-github-username');
  const [repoName, setRepoName] = useState('food101-calorie-estimator');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const cleanUser = username.trim() || 'your-github-username';
  const cleanRepo = repoName.trim() || 'food101-calorie-estimator';

  const gitUrl = `https://github.com/${cleanUser}/${cleanRepo}.git`;
  const githubPagesUrl = `https://${cleanUser}.github.io/${cleanRepo}/`;
  const colabUrl = `https://colab.research.google.com/github/${cleanUser}/${cleanRepo}/blob/main/food101_calorie_estimator.ipynb`;

  const commands = [
    {
      title: '1. Git Initialize & Add All Files',
      cmd: `git init\ngit add .\ngit commit -m "feat: complete Food-101 classifier and calorie estimator with web app"`,
      desc: 'Stages all project code, notebooks, dataset CSVs, and deployment configs.',
    },
    {
      title: '2. Set Main Branch & Link Your Remote Repository',
      cmd: `git branch -M main\ngit remote add origin ${gitUrl}`,
      desc: 'Connects your local project to your newly created GitHub repository.',
    },
    {
      title: '3. Push Code to GitHub',
      cmd: `git push -u origin main`,
      desc: 'Uploads all branches and code to GitHub.',
    },
  ];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = () => {
    const all = commands.map((c) => c.cmd).join('\n\n');
    navigator.clipboard.writeText(all);
    setCopiedIndex(99);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-slate-800" />
              <span>GitHub Push & Live Website Link Generator</span>
            </h1>
            <p className="mt-1 text-xs text-slate-600">
              Personalized terminal commands to push this codebase to GitHub and generate live URLs for GitHub Pages and Google Colab.
            </p>
          </div>
          <button
            onClick={handleCopyAll}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            {copiedIndex === 99 ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>All Commands Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Full Push Script</span>
              </>
            )}
          </button>
        </div>

        {/* Input Configuration for Personalized URLs */}
        <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Your GitHub Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. ramlala-patel"
              className="w-full text-xs font-mono py-2 px-3 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Repository Name on GitHub:
            </label>
            <input
              type="text"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              placeholder="e.g. food101-calorie-estimator"
              className="w-full text-xs font-mono py-2 px-3 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Generated Live Links Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Live GitHub Pages Link */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>Generated Live Website Link (GitHub Pages)</span>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
              Automatic CI/CD
            </span>
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-2">
            <span className="font-mono text-xs text-slate-800 truncate select-all">
              {githubPagesUrl}
            </span>
            <button
              onClick={() => handleCopy(githubPagesUrl, 101)}
              className="p-1 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              title="Copy URL"
            >
              {copiedIndex === 101 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            Powered by the pre-configured workflow at <code className="font-mono text-slate-700">.github/workflows/deploy.yml</code>. Whenever you push to <code className="font-mono">main</code>, GitHub Actions builds and publishes your site!
          </p>
        </div>

        {/* Live Colab Notebook Link */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Shareable Google Colab Notebook Link</span>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded">
              1-Click Open
            </span>
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-2">
            <span className="font-mono text-xs text-slate-800 truncate select-all">
              {colabUrl}
            </span>
            <button
              onClick={() => handleCopy(colabUrl, 102)}
              className="p-1 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              title="Copy URL"
            >
              {copiedIndex === 102 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            Anyone clicking this link will open your notebook directly in Google Colab with GPU acceleration and train/evaluate the model without downloading files.
          </p>
        </div>
      </div>

      {/* Terminal Steps */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-slate-700" />
          <span>Step-by-Step Terminal Commands</span>
        </h2>

        <div className="space-y-4">
          {commands.map((step, idx) => {
            const isCopied = copiedIndex === idx;
            return (
              <div key={step.title} className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800">{step.title}</span>
                    <span className="text-slate-500 ml-2 hidden sm:inline">({step.desc})</span>
                  </div>
                  <button
                    onClick={() => handleCopy(step.cmd, idx)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-slate-950 p-4 overflow-x-auto">
                  <pre className="font-mono text-xs text-emerald-400 leading-relaxed whitespace-pre">
                    {step.cmd}
                  </pre>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How to Enable GitHub Pages (3 simple clicks) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>How to Activate Your Live Link on GitHub (Only Once)</span>
        </h2>

        <ol className="list-decimal list-inside space-y-2 text-xs text-slate-700 leading-relaxed">
          <li>
            Go to your repository on GitHub (<code className="font-mono text-slate-800">https://github.com/{cleanUser}/{cleanRepo}</code>).
          </li>
          <li>
            Click on the <strong>Settings</strong> tab (the gear icon at the top right of your repository).
          </li>
          <li>
            In the left sidebar, click on <strong>Pages</strong> (under "Code and automation").
          </li>
          <li>
            Under <strong>Build and deployment</strong> ➔ <strong>Source</strong>, change the dropdown from <em>"Deploy from a branch"</em> to <strong>"GitHub Actions"</strong>.
          </li>
          <li>
            That&apos;s all! Your site will build in ~1 minute and show your live URL:
            <div className="mt-1 font-mono font-semibold text-emerald-700 text-sm">
              {githubPagesUrl}
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};
