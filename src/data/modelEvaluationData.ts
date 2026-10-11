/**
 * Evaluation Metrics, Training Curves, Confusion Matrix Data,
 * and Error Analysis Studies for the Food-101 Model.
 */

export interface EpochMetric {
  epoch: number;
  phase: 1 | 2;
  trainLoss: number;
  valLoss: number;
  trainAcc: number;
  valAcc: number;
  trainTop5Acc: number;
  valTop5Acc: number;
  learningRate: number;
}

export const TRAINING_CURVE_DATA: EpochMetric[] = [
  // Phase 1: Feature Extraction (Backbone frozen, Adam lr=1e-3)
  { epoch: 1, phase: 1, trainLoss: 2.124, valLoss: 1.482, trainAcc: 0.495, valAcc: 0.628, trainTop5Acc: 0.771, valTop5Acc: 0.865, learningRate: 0.001 },
  { epoch: 2, phase: 1, trainLoss: 1.642, valLoss: 1.310, trainAcc: 0.583, valAcc: 0.665, trainTop5Acc: 0.835, valTop5Acc: 0.888, learningRate: 0.001 },
  { epoch: 3, phase: 1, trainLoss: 1.455, valLoss: 1.218, trainAcc: 0.628, valAcc: 0.684, trainTop5Acc: 0.862, valTop5Acc: 0.901, learningRate: 0.001 },
  { epoch: 4, phase: 1, trainLoss: 1.332, valLoss: 1.162, trainAcc: 0.654, valAcc: 0.695, trainTop5Acc: 0.880, valTop5Acc: 0.908, learningRate: 0.001 },
  { epoch: 5, phase: 1, trainLoss: 1.251, valLoss: 1.124, trainAcc: 0.672, valAcc: 0.702, trainTop5Acc: 0.893, valTop5Acc: 0.912, learningRate: 0.001 },
  { epoch: 6, phase: 1, trainLoss: 1.189, valLoss: 1.092, trainAcc: 0.687, valAcc: 0.710, trainTop5Acc: 0.902, valTop5Acc: 0.916, learningRate: 0.001 },
  { epoch: 7, phase: 1, trainLoss: 1.138, valLoss: 1.068, trainAcc: 0.699, valAcc: 0.716, trainTop5Acc: 0.908, valTop5Acc: 0.919, learningRate: 0.001 },
  { epoch: 8, phase: 1, trainLoss: 1.095, valLoss: 1.045, trainAcc: 0.708, valAcc: 0.721, trainTop5Acc: 0.912, valTop5Acc: 0.921, learningRate: 0.0002 },
  { epoch: 9, phase: 1, trainLoss: 1.072, valLoss: 1.034, trainAcc: 0.714, valAcc: 0.723, trainTop5Acc: 0.914, valTop5Acc: 0.922, learningRate: 0.0002 },
  { epoch: 10, phase: 1, trainLoss: 1.052, valLoss: 1.025, trainAcc: 0.718, valAcc: 0.725, trainTop5Acc: 0.915, valTop5Acc: 0.923, learningRate: 0.0002 },

  // Phase 2: Fine-Tuning Top 30 Layers (Adam lr=1e-5)
  { epoch: 11, phase: 2, trainLoss: 0.952, valLoss: 0.945, trainAcc: 0.742, valAcc: 0.748, trainTop5Acc: 0.928, valTop5Acc: 0.930, learningRate: 0.00001 },
  { epoch: 12, phase: 2, trainLoss: 0.884, valLoss: 0.892, trainAcc: 0.761, valAcc: 0.762, trainTop5Acc: 0.938, valTop5Acc: 0.934, learningRate: 0.00001 },
  { epoch: 13, phase: 2, trainLoss: 0.835, valLoss: 0.858, trainAcc: 0.774, valAcc: 0.771, trainTop5Acc: 0.944, valTop5Acc: 0.937, learningRate: 0.00001 },
  { epoch: 14, phase: 2, trainLoss: 0.798, valLoss: 0.834, trainAcc: 0.783, valAcc: 0.776, trainTop5Acc: 0.948, valTop5Acc: 0.939, learningRate: 0.00001 },
  { epoch: 15, phase: 2, trainLoss: 0.765, valLoss: 0.819, trainAcc: 0.791, valAcc: 0.780, trainTop5Acc: 0.951, valTop5Acc: 0.940, learningRate: 0.00001 },
  { epoch: 16, phase: 2, trainLoss: 0.738, valLoss: 0.806, trainAcc: 0.797, valAcc: 0.783, trainTop5Acc: 0.953, valTop5Acc: 0.941, learningRate: 0.00001 },
  { epoch: 17, phase: 2, trainLoss: 0.712, valLoss: 0.795, trainAcc: 0.803, valAcc: 0.785, trainTop5Acc: 0.954, valTop5Acc: 0.941, learningRate: 0.000005 },
  { epoch: 18, phase: 2, trainLoss: 0.692, valLoss: 0.785, trainAcc: 0.809, valAcc: 0.788, trainTop5Acc: 0.957, valTop5Acc: 0.942, learningRate: 0.000005 },
  { epoch: 19, phase: 2, trainLoss: 0.674, valLoss: 0.777, trainAcc: 0.814, valAcc: 0.790, trainTop5Acc: 0.959, valTop5Acc: 0.942, learningRate: 0.000005 },
  { epoch: 20, phase: 2, trainLoss: 0.662, valLoss: 0.770, trainAcc: 0.818, valAcc: 0.791, trainTop5Acc: 0.960, valTop5Acc: 0.942, learningRate: 0.000002 },
  { epoch: 21, phase: 2, trainLoss: 0.654, valLoss: 0.766, trainAcc: 0.821, valAcc: 0.793, trainTop5Acc: 0.961, valTop5Acc: 0.942, learningRate: 0.000002 },
  { epoch: 22, phase: 2, trainLoss: 0.648, valLoss: 0.762, trainAcc: 0.823, valAcc: 0.794, trainTop5Acc: 0.962, valTop5Acc: 0.943, learningRate: 0.000002 },
];

export const CONFUSION_CLASSES = [
  'steak',
  'filet_mignon',
  'pizza',
  'garlic_bread',
  'chocolate_cake',
  'chocolate_mousse',
  'apple_pie',
  'bread_pudding',
  'sushi',
  'sashimi',
];

// 10x10 matrix representing test split counts (250 items per class)
export const CONFUSION_MATRIX_COUNTS: number[][] = [
  // steak
  [194, 38, 1, 0, 0, 0, 0, 0, 1, 16],
  // filet_mignon
  [41, 192, 0, 0, 0, 0, 0, 0, 0, 17],
  // pizza
  [0, 0, 222, 19, 0, 0, 4, 3, 0, 2],
  // garlic_bread
  [0, 0, 16, 218, 0, 0, 2, 7, 0, 7],
  // chocolate_cake
  [0, 0, 0, 0, 201, 36, 4, 5, 0, 4],
  // chocolate_mousse
  [0, 0, 0, 0, 32, 204, 2, 6, 0, 6],
  // apple_pie
  [0, 0, 3, 2, 3, 2, 198, 35, 0, 7],
  // bread_pudding
  [0, 0, 2, 5, 4, 4, 33, 196, 0, 6],
  // sushi
  [0, 0, 0, 0, 0, 0, 0, 0, 215, 35],
  // sashimi
  [1, 2, 0, 0, 0, 0, 0, 0, 32, 215],
];

export interface ErrorCaseStudy {
  id: string;
  groundTruth: string;
  predicted: string;
  confidence: number;
  reason: string;
  mitigation: string;
}

export const ERROR_CASE_STUDIES: ErrorCaseStudy[] = [
  {
    id: 'case-1',
    groundTruth: 'Filet Mignon',
    predicted: 'Steak',
    confidence: 68.4,
    reason: 'Both dishes feature dark seared beef muscle fibers, grill cross-hatching, and au jus reduction on dark plates. Without 3D height perspective to judge the cylindrical center cut, 2D appearance is nearly identical.',
    mitigation: 'Incorporate fine-grained side-profile aspect ratio features or multi-view capture during data ingestion.',
  },
  {
    id: 'case-2',
    groundTruth: 'Bread Pudding',
    predicted: 'Apple Pie',
    confidence: 61.2,
    reason: 'Shared visual motifs: golden-brown baked dough pastry, caramelized butter sugar sheen, powdered sugar dusting, and diced cinnamon-dusted filling chunks.',
    mitigation: 'Higher resolution crop focusing on bread cube texture vs crimped pie crust edges.',
  },
  {
    id: 'case-3',
    groundTruth: 'Sushi',
    predicted: 'Sashimi',
    confidence: 58.9,
    reason: 'Top-down photo of salmon nigiri obscures the underlying seasoned rice block, showing only the glistening raw fish topping that visually matches pure sashimi cuts.',
    mitigation: 'Contextual feature weighting that looks for soy sauce dipping dish, chopsticks, and rice grain borders.',
  },
  {
    id: 'case-4',
    groundTruth: 'Chocolate Mousse',
    predicted: 'Chocolate Cake',
    confidence: 64.7,
    reason: 'Close-up macro shot of dark chocolate surface texture without bowl edges or cake sponge crumb visibility.',
    mitigation: 'Include wider contextual field of view to capture dishware containers (ramekin/glass vs dessert plate).',
  },
];
