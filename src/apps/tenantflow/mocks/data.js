// ============================================================
// TenantFlow Mock Data
// Realistic Kubernetes multi-tenant platform data for Storybook
// ============================================================

const now = new Date();
const oneWeekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();
const threeDaysAgo = new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString();
const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000).toISOString();
const sixHoursAgo = new Date(now - 6 * 60 * 60 * 1000).toISOString();
const oneHourAgo = new Date(now - 60 * 60 * 1000).toISOString();

// ----------------------------------------------------------
// Tenant summary objects (shown in collapsed card headers)
// ----------------------------------------------------------

export const mockTenants = {
  active: {
    name: 'tenant-educationelly',
    status: 'Active',
    cpu: '2',
    memory: '4Gi',
    appType: 'educationelly-graphql',
    createdAt: oneWeekAgo,
  },
  pending: {
    name: 'tenant-codetalk',
    status: 'Pending',
    cpu: '1',
    memory: '2Gi',
    appType: 'code-talk',
    createdAt: oneDayAgo,
  },
  failed: {
    name: 'tenant-intervalai',
    status: 'Failed',
    cpu: '2',
    memory: '4Gi',
    appType: 'intervalai',
    createdAt: threeDaysAgo,
  },
  newTenant: {
    name: 'tenant-bookmarked',
    status: 'Active',
    cpu: '1',
    memory: '2Gi',
    appType: 'bookmarked',
    createdAt: sixHoursAgo,
  },
  noDeployments: {
    name: 'tenant-empty',
    status: 'Active',
    cpu: '1',
    memory: '2Gi',
    appType: null,
    createdAt: oneHourAgo,
  },
};

// ----------------------------------------------------------
// Tenant detail objects (shown in expanded card body)
// ----------------------------------------------------------

export const mockTenantDetails = {
  withDeployments: {
    tenant: {
      name: 'tenant-educationelly',
      appType: 'educationelly-graphql',
    },
    deployments: [
      {
        name: 'educationelly-graphql-server',
        replicas: 2,
        availableReplicas: 2,
        image: 'maxjeffwell/educationelly-graphql-server:latest',
      },
      {
        name: 'educationelly-graphql-client',
        replicas: 2,
        availableReplicas: 2,
        image: 'maxjeffwell/educationelly-graphql-client:latest',
      },
    ],
    ingresses: [
      {
        name: 'educationelly-client-ingress',
        type: 'client',
        host: 'educationelly.k8s.example.com',
        url: 'https://educationelly.k8s.example.com',
      },
      {
        name: 'educationelly-api-ingress',
        type: 'api',
        host: 'api.educationelly.k8s.example.com',
        url: 'https://api.educationelly.k8s.example.com',
      },
    ],
    database: {
      configured: true,
      name: 'mongodb-educationelly-graphql',
      connection: {
        status: 'connected',
        message: 'MongoDB replica set healthy with 3 members',
      },
    },
    services: [
      {
        name: 'educationelly-graphql-server-svc',
        type: 'ClusterIP',
        ports: [{ port: 8000, targetPort: 8000 }],
        selector: { app: 'educationelly-graphql-server' },
      },
      {
        name: 'educationelly-graphql-client-svc',
        type: 'ClusterIP',
        ports: [{ port: 80, targetPort: 80 }],
        selector: { app: 'educationelly-graphql-client' },
      },
    ],
    pods: [
      {
        name: 'educationelly-graphql-server-7d8f9c6b4-abc12',
        status: 'Running',
        labels: { app: 'educationelly-graphql-server' },
      },
      {
        name: 'educationelly-graphql-server-7d8f9c6b4-def34',
        status: 'Running',
        labels: { app: 'educationelly-graphql-server' },
      },
      {
        name: 'educationelly-graphql-client-5c4d3e2f1-ghi56',
        status: 'Running',
        labels: { app: 'educationelly-graphql-client' },
      },
    ],
  },

  withDatabaseError: {
    tenant: {
      name: 'tenant-codetalk',
      appType: 'code-talk',
    },
    deployments: [
      {
        name: 'code-talk-graphql-server',
        replicas: 1,
        availableReplicas: 1,
        image: 'maxjeffwell/code-talk-graphql-server:latest',
      },
    ],
    ingresses: [],
    database: {
      configured: true,
      name: 'postgres-codetalk',
      connection: {
        status: 'connection_error',
        message: 'FATAL: password authentication failed for user "codetalk"',
      },
    },
    services: [
      {
        name: 'code-talk-server-svc',
        type: 'ClusterIP',
        ports: [{ port: 8000, targetPort: 8000 }],
      },
    ],
  },

  noDatabase: {
    tenant: {
      name: 'tenant-bookmarked',
      appType: 'bookmarked',
    },
    deployments: [
      {
        name: 'bookmarked-server',
        replicas: 1,
        availableReplicas: 1,
        image: 'maxjeffwell/bookmarks-react-hooks-server:latest',
      },
      {
        name: 'bookmarked-client',
        replicas: 1,
        availableReplicas: 0,
        image: 'maxjeffwell/bookmarks-react-hooks-client:latest',
      },
    ],
    ingresses: [],
    database: {
      configured: false,
    },
    services: [],
  },

  empty: {
    tenant: {
      name: 'tenant-empty',
    },
    deployments: [],
    ingresses: [],
    database: null,
    services: [],
  },
};

// ----------------------------------------------------------
// Tenant metrics (pod counts & pod details)
// ----------------------------------------------------------

export const mockTenantMetrics = {
  healthy: {
    pods: {
      total: 5,
      running: 5,
      pending: 0,
      failed: 0,
    },
    podsList: [
      {
        name: 'educationelly-graphql-server-7d8f9c6b4-abc12',
        status: 'Running',
        restarts: 0,
        logs: `[2026-02-05T10:00:00Z] INFO  Server started on port 8000
[2026-02-05T10:00:01Z] INFO  Connected to MongoDB replica set
[2026-02-05T10:00:02Z] INFO  GraphQL schema loaded successfully
[2026-02-05T10:00:03Z] INFO  Health check endpoint ready at /health
[2026-02-05T10:05:12Z] INFO  Handled 142 requests in the last 5 minutes`,
      },
      {
        name: 'educationelly-graphql-server-7d8f9c6b4-def34',
        status: 'Running',
        restarts: 1,
        logs: `[2026-02-05T09:55:00Z] WARN  Connection to MongoDB lost, retrying...
[2026-02-05T09:55:05Z] INFO  Reconnected to MongoDB
[2026-02-05T10:00:00Z] INFO  Server restarted on port 8000`,
      },
      {
        name: 'educationelly-graphql-client-5c4d3e2f1-ghi56',
        status: 'Running',
        restarts: 0,
        logs: '[2026-02-05T10:00:00Z] INFO  nginx: serving static files on port 80',
      },
      {
        name: 'mongodb-educationelly-0',
        status: 'Running',
        restarts: 0,
        logs: `[2026-02-05T08:00:00Z] I NETWORK  Listening on 0.0.0.0:27017
[2026-02-05T08:00:01Z] I REPL     Replica set initialized`,
      },
      {
        name: 'mongodb-educationelly-1',
        status: 'Running',
        restarts: 0,
        logs: `[2026-02-05T08:00:05Z] I REPL     Joined replica set as SECONDARY`,
      },
    ],
  },

  mixed: {
    pods: {
      total: 4,
      running: 2,
      pending: 1,
      failed: 1,
    },
    podsList: [
      {
        name: 'code-talk-server-8e9f0a1b2-xyz78',
        status: 'Running',
        restarts: 3,
        logs: `[2026-02-05T09:00:00Z] INFO  Server started
[2026-02-05T09:45:00Z] ERROR  WebSocket connection pool exhausted
[2026-02-05T09:45:01Z] WARN  Restarting subscription handlers`,
      },
      {
        name: 'code-talk-client-3d4e5f6a7-uvw90',
        status: 'Running',
        restarts: 0,
        logs: '[2026-02-05T10:00:00Z] INFO  Client build served on port 5000',
      },
      {
        name: 'postgres-codetalk-0',
        status: 'Pending',
        restarts: 0,
        logs: 'Waiting for persistent volume claim...',
      },
      {
        name: 'redis-codetalk-0',
        status: 'Failed',
        restarts: 5,
        logs: `[2026-02-05T09:30:00Z] FATAL  OOM: Redis memory limit exceeded
[2026-02-05T09:30:01Z] ERROR  Process terminated with exit code 137`,
      },
    ],
  },
};

// ----------------------------------------------------------
// Prometheus-style metrics for MetricsCharts component
// ----------------------------------------------------------

// Generate time-series data points (1 hour, every 60s = 60 points)
function generateTimeSeriesPoints(baseValue, variance, count = 60) {
  const startTime = Math.floor(Date.now() / 1000) - count * 60;
  return Array.from({ length: count }, (_, i) => [
    startTime + i * 60,
    String(baseValue + (Math.random() - 0.5) * variance),
  ]);
}

export const mockMetricsData = {
  full: {
    reliability: {
      availability: 99.7,
      pvcUsage: 34.2,
    },
    appPerformance: {
      requestRate: 12.45,
      latency: 0.087,
      errorRate: 0.02,
    },
    quotaUsage: {
      cpu: { usage: 0.85, percentage: 42.5 },
      memory: { usage: 1610612736, percentage: 37.5 }, // 1.5 GiB
    },
    podStatus: {
      result: [
        { metric: { phase: 'Running' }, value: [Date.now() / 1000, '5'] },
        { metric: { phase: 'Pending' }, value: [Date.now() / 1000, '1'] },
        { metric: { phase: 'Failed' }, value: [Date.now() / 1000, '0'] },
      ],
    },
    networkIO: {
      receive: {
        result: [
          { metric: { pod: 'server-abc12' }, value: [Date.now() / 1000, '524288'] },
          { metric: { pod: 'server-def34' }, value: [Date.now() / 1000, '412672'] },
          { metric: { pod: 'client-ghi56' }, value: [Date.now() / 1000, '1048576'] },
        ],
      },
      transmit: {
        result: [
          { metric: { pod: 'server-abc12' }, value: [Date.now() / 1000, '262144'] },
          { metric: { pod: 'server-def34' }, value: [Date.now() / 1000, '196608'] },
          { metric: { pod: 'client-ghi56' }, value: [Date.now() / 1000, '786432'] },
        ],
      },
    },
    restarts: {
      result: [
        { metric: { pod: 'server-abc12' }, value: [Date.now() / 1000, '0'] },
        { metric: { pod: 'server-def34' }, value: [Date.now() / 1000, '1'] },
        { metric: { pod: 'client-ghi56' }, value: [Date.now() / 1000, '0'] },
      ],
    },
    timestamp: now.toISOString(),
  },

  degraded: {
    reliability: {
      availability: 87.3,
      pvcUsage: 78.9,
    },
    appPerformance: {
      requestRate: 3.21,
      latency: 0.542,
      errorRate: 1.85,
    },
    quotaUsage: {
      cpu: { usage: 1.78, percentage: 89.0 },
      memory: { usage: 3489660928, percentage: 81.3 }, // ~3.25 GiB
    },
    podStatus: {
      result: [
        { metric: { phase: 'Running' }, value: [Date.now() / 1000, '2'] },
        { metric: { phase: 'Pending' }, value: [Date.now() / 1000, '1'] },
        { metric: { phase: 'Failed' }, value: [Date.now() / 1000, '2'] },
      ],
    },
    networkIO: {
      receive: {
        result: [
          { metric: { pod: 'server-xyz78' }, value: [Date.now() / 1000, '102400'] },
          { metric: { pod: 'client-uvw90' }, value: [Date.now() / 1000, '204800'] },
        ],
      },
      transmit: {
        result: [
          { metric: { pod: 'server-xyz78' }, value: [Date.now() / 1000, '51200'] },
          { metric: { pod: 'client-uvw90' }, value: [Date.now() / 1000, '153600'] },
        ],
      },
    },
    restarts: {
      result: [
        { metric: { pod: 'server-xyz78' }, value: [Date.now() / 1000, '3'] },
        { metric: { pod: 'redis-0' }, value: [Date.now() / 1000, '5'] },
      ],
    },
    timestamp: now.toISOString(),
  },
};

export const mockTimeSeries = {
  full: {
    cpu: {
      result: [
        {
          metric: { pod: 'server-abc12' },
          values: generateTimeSeriesPoints(0.35, 0.15),
        },
        {
          metric: { pod: 'server-def34' },
          values: generateTimeSeriesPoints(0.28, 0.12),
        },
        {
          metric: { pod: 'client-ghi56' },
          values: generateTimeSeriesPoints(0.12, 0.08),
        },
      ],
    },
    memory: {
      result: [
        {
          metric: { pod: 'server-abc12' },
          values: generateTimeSeriesPoints(268435456, 52428800), // ~256MB base
        },
        {
          metric: { pod: 'server-def34' },
          values: generateTimeSeriesPoints(234881024, 41943040), // ~224MB base
        },
        {
          metric: { pod: 'client-ghi56' },
          values: generateTimeSeriesPoints(134217728, 20971520), // ~128MB base
        },
      ],
    },
  },
};
