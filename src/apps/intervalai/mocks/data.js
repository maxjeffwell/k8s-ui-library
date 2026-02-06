// Mock tensor activations (arrays of numbers simulating layer outputs)
export const mockActivations = [
  // Input layer (51 features) - normalized values
  Array.from({ length: 51 }, (_, i) => [Math.sin(i * 0.3) * 0.5 + 0.5]),
  // Hidden layer 1 (32 neurons)
  Array.from({ length: 32 }, (_, i) => [Math.cos(i * 0.4) * 0.7]),
  // Hidden layer 2 (16 neurons)
  Array.from({ length: 16 }, (_, i) => [Math.sin(i * 0.5) * 0.8]),
  // Output layer (1 neuron)
  [[0.73]],
];

// Feature names (first 10 labeled, rest abbreviated)
export const mockFeatureNames = [
  'memoryStrength', 'difficulty', 'timeSinceReview', 'successRate',
  'avgResponseTime', 'totalReviews', 'consecutiveCorrect', 'timeOfDay',
  'forgettingCurve_1', 'forgettingCurve_2',
  ...Array.from({ length: 41 }, (_, i) => `feature_${i + 11}`)
];

export const mockMLInfo = {
  isLoaded: true,
  backend: 'webgpu',
  metrics: {
    totalPredictions: 147,
    avgPredictionTime: 2.3,
  },
  metadata: {
    improvement: 23.5,
  },
  backendInfo: {
    current: { name: 'webgpu', description: 'WebGPU backend' },
    available: { webgpu: true, webgl: true, wasm: true, cpu: true },
    speedup: '45x vs CPU',
  },
};

export const mockMLInfoWebGL = {
  ...mockMLInfo,
  backend: 'webgl',
  backendInfo: {
    ...mockMLInfo.backendInfo,
    current: { name: 'webgl', description: 'WebGL backend' },
    speedup: '12x vs CPU',
  },
};

export const mockMLInfoLoading = {
  isLoaded: false,
  backend: '',
  metrics: { totalPredictions: 0, avgPredictionTime: 0 },
  metadata: { improvement: 0 },
  backendInfo: null,
};

export const mockTestResults = [
  { difficulty: 'Easy', input: { memoryStrength: 0.9, difficulty: 0.2 }, prediction: 0.95, label: 'Likely to remember', time: 1.8 },
  { difficulty: 'Medium', input: { memoryStrength: 0.6, difficulty: 0.5 }, prediction: 0.67, label: 'Moderate confidence', time: 2.1 },
  { difficulty: 'Hard', input: { memoryStrength: 0.3, difficulty: 0.8 }, prediction: 0.31, label: 'Likely to forget', time: 2.5 },
  { difficulty: 'Very Hard', input: { memoryStrength: 0.1, difficulty: 0.95 }, prediction: 0.12, label: 'Will likely forget', time: 3.0 },
];

export const mockComparisonData = {
  baseline: { mae: 0.142, accuracy: 0.78 },
  ml: { mae: 0.089, accuracy: 0.91 },
  improvement: 37.3,
};

export const mockProgressData = {
  dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  retention: [0.65, 0.72, 0.68, 0.78, 0.82, 0.85, 0.88],
  intervals: [1, 2, 3, 5, 8, 13, 21],
  intervalCounts: [15, 12, 10, 8, 6, 4, 2],
};

export const mockQuestion = {
  id: 'q-42',
  prompt: 'What is the time complexity of binary search?',
  answer: 'O(log n)',
  difficulty: 0.4,
  memoryStrength: 0.72,
  lastReviewed: '2025-12-10T14:30:00Z',
  totalReviews: 8,
  consecutiveCorrect: 3,
};

export const mockStats = {
  totalReviews: 342,
  correctAnswers: 289,
  currentStreak: 12,
};

export const mockFeedback = {
  correct: true,
  correctAnswer: 'O(log n)',
  nextReview: '2025-12-14T10:00:00Z',
  sm2Interval: 5,
  mlInterval: 8,
  mlConfidence: 0.89,
};
