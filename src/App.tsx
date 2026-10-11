/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from '@/src/components/Header.tsx';
import { ClassifierAndDietTracker } from '@/src/components/ClassifierAndDietTracker.tsx';
import { NotebookViewer } from '@/src/components/NotebookViewer.tsx';
import { NutritionDatabaseTable } from '@/src/components/NutritionDatabaseTable.tsx';
import { ModelArchitectureAndMetrics } from '@/src/components/ModelArchitectureAndMetrics.tsx';
import { ReadmeViewer } from '@/src/components/ReadmeViewer.tsx';
import { GithubDeployGuide } from '@/src/components/GithubDeployGuide.tsx';
import { downloadFile } from '@/src/utils/downloadHelpers.ts';
import { generateJupyterNotebookJson } from '@/src/data/notebookCode.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<'demo' | 'notebook' | 'database' | 'metrics' | 'readme' | 'github'>('demo');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* 3-Zone Top Bar Navigation */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {activeTab === 'demo' && <ClassifierAndDietTracker />}
        {activeTab === 'notebook' && <NotebookViewer />}
        {activeTab === 'database' && <NutritionDatabaseTable />}
        {activeTab === 'metrics' && <ModelArchitectureAndMetrics />}
        {activeTab === 'readme' && <ReadmeViewer />}
        {activeTab === 'github' && <GithubDeployGuide />}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">NutriVision Food-101</span>
            <span aria-hidden="true">·</span>
            <span>Internship Machine Learning Project</span>
            <span aria-hidden="true">·</span>
            <span>Food-101 Dataset (ETH Zurich)</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                downloadFile(
                  'food101_calorie_estimator.ipynb',
                  generateJupyterNotebookJson(),
                  'application/x-ipynb+json'
                )
              }
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Export .ipynb
            </button>
            <span aria-hidden="true">·</span>
            <a
              href="https://data.vision.ee.ethz.ch/cvl/datasets_extra/food-101/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 transition-colors"
            >
              ETH Food-101 Citation
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://fdc.nal.usda.gov/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 transition-colors"
            >
              USDA FoodData Central
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
