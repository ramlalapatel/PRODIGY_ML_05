import React, { useState } from 'react';
import {
  Layers,
  TrendingUp,
  Activity,
  AlertCircle,
  HelpCircle,
  CheckCircle,
  XCircle,
  Sliders,
  Cpu,
} from 'lucide-react';
import {
  TRAINING_CURVE_DATA,
  CONFUSION_CLASSES,
  CONFUSION_MATRIX_COUNTS,
  ERROR_CASE_STUDIES,
} from '@/src/data/modelEvaluationData.ts';

export const ModelArchitectureAndMetrics: React.FC = () => {
  const [activeMetricTab, setActiveMetricTab] = useState<'accuracy' | 'loss'>('accuracy');
  const [selectedConfusionCell, setSelectedConfusionCell] = useState<{
    trueClass: string;
    predClass: string;
    count: number;
    pct: number;
  } | null>(null);

  // Maximum value in confusion matrix for color normalization
  const maxConfusionVal = 250;

  return (
    <div className="space-y-10">
      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Transfer Learning Architecture & Training Diagnostics
            </h1>
            <p className="mt-1 text-xs text-slate-600">
              Deep dive into the 2-phase transfer learning schedule, learning curves, Top-1/Top-5 accuracy metrics, and confusion matrix error analysis.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg">
              Top-1 Acc: <strong className="font-bold">79.40%</strong>
            </div>
            <div className="px-3 py-1.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-lg">
              Top-5 Acc: <strong className="font-bold">94.25%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Model Architecture Pipeline Diagram */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-700" />
            <span>01. Two-Phase Transfer Learning Pipeline</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pre-trained EfficientNetB0 / MobileNetV2 backbone with data augmentation and progressive layer unfreezing.
          </p>
        </div>

        {/* Visual Flow diagram */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          {/* Step 1 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Step 1: Input & Augmentation
            </div>
            <div className="font-bold text-slate-800 text-sm">224 × 224 × 3 RGB</div>
            <ul className="text-slate-600 space-y-1 text-[11px]">
              <li>• RandomFlip (&apos;horizontal&apos;)</li>
              <li>• RandomRotation (0.12)</li>
              <li>• RandomZoom (0.15)</li>
              <li>• RandomContrast (0.10)</li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Step 2: Base Backbone
            </div>
            <div className="font-bold text-slate-800 text-sm">EfficientNetB0</div>
            <ul className="text-slate-600 space-y-1 text-[11px]">
              <li>• Pre-trained on ImageNet</li>
              <li>• 154 convolution layers</li>
              <li>• 4,049,571 parameters</li>
              <li>• Native [-1, 1] scaling</li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Step 3: Feature Pooling
            </div>
            <div className="font-bold text-slate-800 text-sm">GlobalAvgPool2D</div>
            <ul className="text-slate-600 space-y-1 text-[11px]">
              <li>• 7×7 spatial reduction</li>
              <li>• Output: 1,280 dims</li>
              <li>• BatchNormalization</li>
              <li>• Dropout (rate = 0.3)</li>
            </ul>
          </div>

          {/* Step 4 */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Step 4: Classification Head
            </div>
            <div className="font-bold text-slate-800 text-sm">Dense (101 Softmax)</div>
            <ul className="text-slate-600 space-y-1 text-[11px]">
              <li>• 101 target classes</li>
              <li>• 129,381 trainable weights</li>
              <li>• Float32 output activation</li>
              <li>• Cross-Entropy Loss</li>
            </ul>
          </div>

          {/* Step 5 */}
          <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
            <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
              Step 5: Output Tasks
            </div>
            <div className="font-bold text-emerald-950 text-sm">Inference & Nutrition</div>
            <ul className="text-emerald-900 space-y-1 text-[11px]">
              <li>• Top-3 ranked categories</li>
              <li>• Calorie lookup mapping</li>
              <li>• Portion scaling multiplier</li>
              <li>• Daily diet accumulator</li>
            </ul>
          </div>
        </div>

        {/* Phase 1 vs Phase 2 Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-sm">Phase 1: Feature Extraction</span>
              <span className="font-mono text-slate-500 text-[11px]">Epochs 1 – 10</span>
            </div>
            <p className="text-slate-600">
              The entire EfficientNet backbone is completely frozen (<code className="font-mono text-slate-800">base_model.trainable = False</code>). Only the top classification head weights (131k parameters) are updated using Adam (<code className="font-mono text-slate-800">lr = 1e-3</code>).
            </p>
            <div className="font-mono text-[11px] text-slate-500 pt-1">
              Result: Fast convergence to 72.50% validation accuracy without distorting pre-trained features.
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-sm">Phase 2: Fine-Tuning</span>
              <span className="font-mono text-slate-500 text-[11px]">Epochs 11 – 25</span>
            </div>
            <p className="text-slate-600">
              The top 30 layers of the backbone are unfrozen (<code className="font-mono text-slate-800">base_model.layers[-30:]</code>) while preserving early low-level edge filters. Recompiled with a very low learning rate (<code className="font-mono text-slate-800">lr = 1e-5</code>) and ReduceLROnPlateau.
            </p>
            <div className="font-mono text-[11px] text-emerald-700 font-medium pt-1">
              Result: +6.90% boost to 79.40% Top-1 accuracy and 94.25% Top-5 accuracy!
            </div>
          </div>
        </div>
      </div>

      {/* Training and Validation Learning Curves */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-slate-700" />
              <span>02. Training & Validation Curves (22 Epochs)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Notice the inflection point at Epoch 10 when Phase 2 fine-tuning unlocks further gains.
            </p>
          </div>
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs">
            <button
              onClick={() => setActiveMetricTab('accuracy')}
              className={`px-3 py-1 font-medium rounded-md transition-colors cursor-pointer ${
                activeMetricTab === 'accuracy'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Accuracy Curves
            </button>
            <button
              onClick={() => setActiveMetricTab('loss')}
              className={`px-3 py-1 font-medium rounded-md transition-colors cursor-pointer ${
                activeMetricTab === 'loss'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Loss Curves
            </button>
          </div>
        </div>

        {/* Interactive Visual SVG Line Chart */}
        <div className="h-64 w-full relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 800 240">
            {/* Grid lines */}
            <line x1="50" y1="20" x2="780" y2="20" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="50" y1="70" x2="780" y2="70" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="50" y1="120" x2="780" y2="120" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="50" y1="170" x2="780" y2="170" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="50" y1="210" x2="780" y2="210" stroke="#cbd5e1" strokeWidth="1" />

            {/* Phase 1 / Phase 2 vertical dividing line at epoch 10 */}
            <line
              x1={50 + ((10 - 1) / 21) * 730}
              y1="10"
              x2={50 + ((10 - 1) / 21) * 730}
              y2="210"
              stroke="#94a3b8"
              strokeWidth="1.5"
              strokeDasharray="4,4"
            />
            <text
              x={50 + ((10 - 1) / 21) * 730 + 6}
              y="25"
              fill="#64748b"
              fontSize="10"
              fontFamily="monospace"
            >
              Phase 2 Fine-Tuning Begins
            </text>

            {/* Render lines based on active tab */}
            {activeMetricTab === 'accuracy' ? (
              <>
                {/* Y-axis labels */}
                <text x="20" y="24" fill="#94a3b8" fontSize="10" fontFamily="monospace">90%</text>
                <text x="20" y="74" fill="#94a3b8" fontSize="10" fontFamily="monospace">80%</text>
                <text x="20" y="124" fill="#94a3b8" fontSize="10" fontFamily="monospace">70%</text>
                <text x="20" y="174" fill="#94a3b8" fontSize="10" fontFamily="monospace">60%</text>
                <text x="20" y="214" fill="#94a3b8" fontSize="10" fontFamily="monospace">50%</text>

                {/* Train Accuracy Path (blue) */}
                <path
                  d={TRAINING_CURVE_DATA.reduce((acc, pt, idx) => {
                    const x = 50 + (idx / 21) * 730;
                    // mapping 0.50 to 210, 0.90 to 20
                    const y = 210 - ((pt.trainAcc - 0.50) / 0.40) * 190;
                    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
                  }, '')}
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                />

                {/* Val Accuracy Path (green) */}
                <path
                  d={TRAINING_CURVE_DATA.reduce((acc, pt, idx) => {
                    const x = 50 + (idx / 21) * 730;
                    const y = 210 - ((pt.valAcc - 0.50) / 0.40) * 190;
                    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
                  }, '')}
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2.5"
                />

                {/* Top-5 Val Accuracy Path (purple dashed) */}
                <path
                  d={TRAINING_CURVE_DATA.reduce((acc, pt, idx) => {
                    const x = 50 + (idx / 21) * 730;
                    const y = 210 - ((pt.valTop5Acc - 0.50) / 0.50) * 190;
                    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
                  }, '')}
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="1.8"
                  strokeDasharray="3,3"
                />
              </>
            ) : (
              <>
                {/* Loss Y-axis labels */}
                <text x="20" y="24" fill="#94a3b8" fontSize="10" fontFamily="monospace">2.2</text>
                <text x="20" y="74" fill="#94a3b8" fontSize="10" fontFamily="monospace">1.8</text>
                <text x="20" y="124" fill="#94a3b8" fontSize="10" fontFamily="monospace">1.4</text>
                <text x="20" y="174" fill="#94a3b8" fontSize="10" fontFamily="monospace">1.0</text>
                <text x="20" y="214" fill="#94a3b8" fontSize="10" fontFamily="monospace">0.6</text>

                {/* Train Loss Path (red) */}
                <path
                  d={TRAINING_CURVE_DATA.reduce((acc, pt, idx) => {
                    const x = 50 + (idx / 21) * 730;
                    // mapping 0.6 to 210, 2.2 to 20
                    const y = 210 - ((pt.trainLoss - 0.6) / 1.6) * 190;
                    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
                  }, '')}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2.5"
                />

                {/* Val Loss Path (amber) */}
                <path
                  d={TRAINING_CURVE_DATA.reduce((acc, pt, idx) => {
                    const x = 50 + (idx / 21) * 730;
                    const y = 210 - ((pt.valLoss - 0.6) / 1.6) * 190;
                    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
                  }, '')}
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="2.5"
                />
              </>
            )}

            {/* X-axis labels */}
            {TRAINING_CURVE_DATA.map((pt, idx) => {
              if (idx % 3 === 0 || idx === 21) {
                const x = 50 + (idx / 21) * 730;
                return (
                  <text
                    key={pt.epoch}
                    x={x}
                    y="228"
                    fill="#64748b"
                    fontSize="10"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    Ep {pt.epoch}
                  </text>
                );
              }
              return null;
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs pt-2 border-t border-slate-100">
          {activeMetricTab === 'accuracy' ? (
            <>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-600 rounded-sm" />
                <span className="text-slate-700">Training Top-1 Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-emerald-600 rounded-sm" />
                <span className="text-slate-700">Validation Top-1 Accuracy (Final: 79.40%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-0.5 border-t-2 border-dashed border-purple-500" />
                <span className="text-slate-700">Validation Top-5 Accuracy (Final: 94.25%)</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-rose-600 rounded-sm" />
                <span className="text-slate-700">Training Loss (Cross-Entropy)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-amber-500 rounded-sm" />
                <span className="text-slate-700">Validation Loss (Final: 0.762)</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Confusion Matrix Interactive Heatmap */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-slate-700" />
            <span>03. Confusion Matrix: 10 Visually Ambiguous Classes</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Evaluated on 250 test images per category. Hover over any cell to inspect true vs. predicted counts and confusion rate.
          </p>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="min-w-[640px]">
            {/* Header row */}
            <div className="grid grid-cols-11 gap-1 text-[11px] font-mono text-slate-500 mb-1">
              <div className="text-right pr-2 font-sans font-medium text-slate-400">Actual ↓ / Pred →</div>
              {CONFUSION_CLASSES.map((cls) => (
                <div key={cls} className="text-center truncate font-medium text-slate-700" title={cls}>
                  {cls.replace('_', ' ').slice(0, 7)}
                </div>
              ))}
            </div>

            {/* Matrix rows */}
            {CONFUSION_MATRIX_COUNTS.map((row, rIdx) => {
              const trueClassName = CONFUSION_CLASSES[rIdx];
              return (
                <div key={trueClassName} className="grid grid-cols-11 gap-1 mb-1 items-center">
                  <div className="text-xs font-medium text-slate-800 text-right pr-2 truncate" title={trueClassName}>
                    {trueClassName.replace('_', ' ')}
                  </div>
                  {row.map((count, cIdx) => {
                    const predClassName = CONFUSION_CLASSES[cIdx];
                    const isDiagonal = rIdx === cIdx;
                    const pct = Math.round((count / 250) * 100);

                    // Heatmap color intensity
                    let cellBg = 'bg-slate-50 text-slate-400';
                    if (isDiagonal) {
                      cellBg = count > 210 ? 'bg-emerald-600 text-white font-bold' : 'bg-emerald-500 text-white font-bold';
                    } else if (count > 25) {
                      cellBg = 'bg-amber-500 text-white font-semibold';
                    } else if (count > 10) {
                      cellBg = 'bg-amber-100 text-amber-900 font-medium';
                    } else if (count > 0) {
                      cellBg = 'bg-slate-100 text-slate-600';
                    }

                    return (
                      <button
                        key={`${rIdx}-${cIdx}`}
                        onClick={() =>
                          setSelectedConfusionCell({
                            trueClass: trueClassName,
                            predClass: predClassName,
                            count,
                            pct,
                          })
                        }
                        className={`aspect-square flex items-center justify-center rounded text-xs font-mono transition-transform hover:scale-105 cursor-pointer tabular-nums ${cellBg}`}
                        title={`Actual: ${trueClassName} | Pred: ${predClassName} | Count: ${count} (${pct}%)`}
                      >
                        {count}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Cell Inspector */}
        {selectedConfusionCell && (
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-semibold text-slate-900">Inspecting Cell: </span>
              <span className="text-slate-700">
                Ground Truth = <strong>{selectedConfusionCell.trueClass.replace('_', ' ')}</strong>, Predicted as = <strong>{selectedConfusionCell.predClass.replace('_', ' ')}</strong>
              </span>
            </div>
            <div className="font-mono text-slate-800 font-bold tabular-nums">
              {selectedConfusionCell.count} images ({selectedConfusionCell.pct}%)
            </div>
          </div>
        )}
      </div>

      {/* Qualitative Error Analysis Case Studies */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-slate-700" />
            <span>04. Qualitative Error Analysis & Confused Food Pairs</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Why do specific foods get confused? Machine learning diagnosis and computer vision engineering mitigations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ERROR_CASE_STUDIES.map((study) => (
            <div key={study.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/40 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[11px]">
                    Ground Truth: {study.groundTruth}
                  </span>
                  <span className="text-slate-400">→</span>
                  <span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-semibold text-[11px]">
                    Predicted: {study.predicted}
                  </span>
                </div>
                <span className="font-mono text-slate-500 tabular-nums font-semibold">
                  {study.confidence}% conf
                </span>
              </div>

              <div>
                <span className="font-semibold text-slate-800">Visual Ambiguity Cause: </span>
                <span className="text-slate-600">{study.reason}</span>
              </div>

              <div className="pt-1 border-t border-slate-200/60 text-slate-500">
                <span className="font-medium text-slate-700">Engineering Mitigation: </span>
                <span>{study.mitigation}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
