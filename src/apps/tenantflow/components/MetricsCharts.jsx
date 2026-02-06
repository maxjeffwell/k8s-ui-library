import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import './MetricsCharts.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * MetricsCharts renders Prometheus-style metrics for a Kubernetes tenant.
 *
 * This is a presentation-only component. Metrics and time series data are
 * passed via props rather than fetched from an API.
 */
function MetricsCharts({
  tenantName,
  metrics = null,
  timeSeries = null,
  loading = false,
  error = null,
  onRefresh,
  onRetry,
}) {
  const [autoRefresh, setAutoRefresh] = useState(false);

  if (loading) {
    return (
      <div className="metrics-charts">
        <div className="metrics-loading">
          <div className="spinner"></div>
          <p>Loading metrics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="metrics-charts">
        <div className="metrics-error">
          <p>{error}</p>
          <button onClick={onRetry} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="metrics-charts">
        <div className="metrics-error">
          <p>No metrics available</p>
        </div>
      </div>
    );
  }

  // Helper formatters (replacing metricsService dependency)
  const formatCPU = (value) => {
    if (value >= 1) return `${value.toFixed(2)} cores`;
    return `${(value * 1000).toFixed(0)}m`;
  };

  const formatBytes = (bytes) => {
    if (bytes >= 1073741824) return `${(bytes / 1073741824).toFixed(2)} GiB`;
    if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MiB`;
    if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KiB`;
    return `${bytes} B`;
  };

  // Prepare CPU time-series chart data
  const cpuChartData = timeSeries?.cpu?.result
    ? {
        labels:
          timeSeries.cpu.result[0]?.values.map((v) =>
            new Date(v[0] * 1000).toLocaleTimeString()
          ) || [],
        datasets: timeSeries.cpu.result.map((series, index) => ({
          label: series.metric.pod || `Pod ${index + 1}`,
          data: series.values.map((v) => parseFloat(v[1])),
          borderColor: `hsl(${index * 60}, 70%, 50%)`,
          backgroundColor: `hsla(${index * 60}, 70%, 50%, 0.1)`,
          fill: true,
          tension: 0.4,
        })),
      }
    : null;

  // Prepare memory time-series chart data
  const memoryChartData = timeSeries?.memory?.result
    ? {
        labels:
          timeSeries.memory.result[0]?.values.map((v) =>
            new Date(v[0] * 1000).toLocaleTimeString()
          ) || [],
        datasets: timeSeries.memory.result.map((series, index) => ({
          label: series.metric.pod || `Pod ${index + 1}`,
          data: series.values.map((v) => parseFloat(v[1]) / (1024 * 1024)),
          borderColor: `hsl(${index * 60 + 180}, 70%, 50%)`,
          backgroundColor: `hsla(${index * 60 + 180}, 70%, 50%, 0.1)`,
          fill: true,
          tension: 0.4,
        })),
      }
    : null;

  // Prepare pod status doughnut chart
  const podStatusData = metrics.podStatus?.result
    ? (() => {
        const statusCounts = {};
        metrics.podStatus.result.forEach((item) => {
          const phase = item.metric.phase;
          const count = parseInt(item.value[1]);
          statusCounts[phase] = (statusCounts[phase] || 0) + count;
        });

        return {
          labels: Object.keys(statusCounts),
          datasets: [
            {
              data: Object.values(statusCounts),
              backgroundColor: [
                '#10b981', // Running - green
                '#f59e0b', // Pending - orange
                '#ef4444', // Failed - red
                '#6b7280', // Unknown - gray
                '#8b5cf6', // Other - purple
              ],
              borderWidth: 2,
              borderColor: '#1f2937',
            },
          ],
        };
      })()
    : null;

  // Prepare network I/O bar chart
  const networkData = metrics.networkIO
    ? (() => {
        const receivePods = metrics.networkIO.receive?.result || [];
        const transmitPods = metrics.networkIO.transmit?.result || [];

        const podNames = [
          ...new Set([
            ...receivePods.map((p) => p.metric.pod),
            ...transmitPods.map((p) => p.metric.pod),
          ]),
        ];

        return {
          labels: podNames,
          datasets: [
            {
              label: 'Receive (KB/s)',
              data: podNames.map((pod) => {
                const item = receivePods.find((p) => p.metric.pod === pod);
                return item ? parseFloat(item.value[1]) / 1024 : 0;
              }),
              backgroundColor: '#3b82f6',
            },
            {
              label: 'Transmit (KB/s)',
              data: podNames.map((pod) => {
                const item = transmitPods.find((p) => p.metric.pod === pod);
                return item ? parseFloat(item.value[1]) / 1024 : 0;
              }),
              backgroundColor: '#8b5cf6',
            },
          ],
        };
      })()
    : null;

  // Chart options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#e5e7eb' },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: { color: '#9ca3af', maxTicksLimit: 10 },
        grid: { color: '#374151' },
      },
      y: {
        ticks: { color: '#9ca3af' },
        grid: { color: '#374151' },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  const cpuChartOptions = {
    ...lineChartOptions,
    scales: {
      ...lineChartOptions.scales,
      y: {
        ...lineChartOptions.scales.y,
        title: { display: true, text: 'CPU Cores', color: '#9ca3af' },
      },
    },
  };

  const memoryChartOptions = {
    ...lineChartOptions,
    scales: {
      ...lineChartOptions.scales,
      y: {
        ...lineChartOptions.scales.y,
        title: { display: true, text: 'Memory (MB)', color: '#9ca3af' },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: { color: '#e5e7eb' },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#e5e7eb' },
      },
    },
    scales: {
      x: {
        ticks: { color: '#9ca3af' },
        grid: { color: '#374151' },
      },
      y: {
        ticks: { color: '#9ca3af' },
        grid: { color: '#374151' },
        title: { display: true, text: 'KB/s', color: '#9ca3af' },
      },
    },
  };

  return (
    <div className="metrics-charts">
      <div className="metrics-header">
        <h2>Metrics for {tenantName}</h2>
        <div className="metrics-controls">
          <button
            className={`refresh-toggle ${autoRefresh ? 'active' : ''}`}
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            {autoRefresh ? 'Pause' : 'Resume'} Auto-Refresh
          </button>
          <button onClick={onRefresh} className="refresh-button">
            Refresh Now
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="metrics-summary">
        <div className="metric-card">
          <h3>Health &amp; Availability</h3>
          <p className="metric-value">
            {metrics.reliability?.availability !== undefined
              ? `${metrics.reliability.availability.toFixed(1)}%`
              : 'N/A'}
          </p>
          <p className="metric-subtitle">
            {metrics.reliability?.availability < 100
              ? 'Degradation Detected'
              : 'All Systems Operational'}
          </p>
        </div>

        <div className="metric-card">
          <h3>Request Rate</h3>
          <p className="metric-value">
            {metrics.appPerformance?.requestRate !== undefined
              ? `${metrics.appPerformance.requestRate.toFixed(2)} rps`
              : '0 rps'}
          </p>
          <p className="metric-subtitle">HTTP Requests per Second</p>
        </div>

        <div className="metric-card">
          <h3>P95 Latency</h3>
          <p className="metric-value">
            {metrics.appPerformance?.latency !== undefined
              ? `${(metrics.appPerformance.latency * 1000).toFixed(0)} ms`
              : '0 ms'}
          </p>
          <p className="metric-subtitle">95th Percentile Duration</p>
        </div>

        <div className="metric-card">
          <h3>Error Rate</h3>
          <p
            className="metric-value"
            style={{
              color: metrics.appPerformance?.errorRate > 0 ? '#ef4444' : 'inherit',
              WebkitTextFillColor:
                metrics.appPerformance?.errorRate > 0 ? '#ef4444' : undefined,
            }}
          >
            {metrics.appPerformance?.errorRate !== undefined
              ? `${metrics.appPerformance.errorRate.toFixed(2)} rps`
              : '0 rps'}
          </p>
          <p className="metric-subtitle">HTTP 5xx Errors</p>
        </div>
      </div>

      <div className="metrics-summary">
        <div className="metric-card">
          <h3>CPU Usage</h3>
          <p className="metric-value">
            {metrics.quotaUsage?.cpu?.usage
              ? formatCPU(metrics.quotaUsage.cpu.usage)
              : 'N/A'}
          </p>
          {metrics.quotaUsage?.cpu?.percentage && (
            <p className="metric-subtitle">
              {metrics.quotaUsage.cpu.percentage}% of quota
            </p>
          )}
        </div>

        <div className="metric-card">
          <h3>Memory Usage</h3>
          <p className="metric-value">
            {metrics.quotaUsage?.memory?.usage
              ? formatBytes(metrics.quotaUsage.memory.usage)
              : 'N/A'}
          </p>
          {metrics.quotaUsage?.memory?.percentage && (
            <p className="metric-subtitle">
              {metrics.quotaUsage.memory.percentage}% of quota
            </p>
          )}
        </div>

        <div className="metric-card">
          <h3>PVC Storage</h3>
          <p className="metric-value">
            {metrics.reliability?.pvcUsage !== undefined
              ? `${metrics.reliability.pvcUsage.toFixed(1)}%`
              : 'N/A'}
          </p>
          <p className="metric-subtitle">Disk Usage</p>
        </div>

        <div className="metric-card">
          <h3>Pod Restarts</h3>
          <p className="metric-value">
            {metrics.restarts?.result?.reduce(
              (sum, item) => sum + parseInt(item.value[1]),
              0
            ) || 0}
          </p>
          <p className="metric-subtitle">Total restarts</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {cpuChartData && (
          <div className="chart-container">
            <h3>CPU Usage Over Time</h3>
            <div className="chart-wrapper">
              <Line data={cpuChartData} options={cpuChartOptions} />
            </div>
          </div>
        )}

        {memoryChartData && (
          <div className="chart-container">
            <h3>Memory Usage Over Time</h3>
            <div className="chart-wrapper">
              <Line data={memoryChartData} options={memoryChartOptions} />
            </div>
          </div>
        )}

        {podStatusData && (
          <div className="chart-container small">
            <h3>Pod Status</h3>
            <div className="chart-wrapper">
              <Doughnut data={podStatusData} options={doughnutOptions} />
            </div>
          </div>
        )}

        {networkData && (
          <div className="chart-container small">
            <h3>Network I/O by Pod</h3>
            <div className="chart-wrapper">
              <Bar data={networkData} options={barChartOptions} />
            </div>
          </div>
        )}
      </div>

      <div className="metrics-footer">
        <p>
          Last updated: {new Date(metrics.timestamp).toLocaleTimeString()} |
          {autoRefresh ? ' Auto-refreshing every 30 seconds' : ' Auto-refresh paused'}
        </p>
      </div>
    </div>
  );
}

MetricsCharts.propTypes = {
  tenantName: PropTypes.string.isRequired,
  metrics: PropTypes.shape({
    reliability: PropTypes.shape({
      availability: PropTypes.number,
      pvcUsage: PropTypes.number,
    }),
    appPerformance: PropTypes.shape({
      requestRate: PropTypes.number,
      latency: PropTypes.number,
      errorRate: PropTypes.number,
    }),
    quotaUsage: PropTypes.shape({
      cpu: PropTypes.shape({ usage: PropTypes.number, percentage: PropTypes.number }),
      memory: PropTypes.shape({ usage: PropTypes.number, percentage: PropTypes.number }),
    }),
    podStatus: PropTypes.object,
    networkIO: PropTypes.object,
    restarts: PropTypes.object,
    timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  timeSeries: PropTypes.shape({
    cpu: PropTypes.object,
    memory: PropTypes.object,
  }),
  loading: PropTypes.bool,
  error: PropTypes.string,
  onRefresh: PropTypes.func,
  onRetry: PropTypes.func,
};

export default MetricsCharts;
