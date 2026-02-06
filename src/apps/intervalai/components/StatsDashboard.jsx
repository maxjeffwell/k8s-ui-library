import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const StatsDashboard = ({ comparisonData, progressData }) => {
  const comparisonRef = useRef(null);
  const retentionRef = useRef(null);
  const intervalRef = useRef(null);
  const chartsRef = useRef([]);

  useEffect(() => {
    // Cleanup previous charts
    chartsRef.current.forEach(c => c.destroy());
    chartsRef.current = [];

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#00ff41', font: { family: 'Courier New' } } },
      },
      scales: {
        x: { ticks: { color: '#00ff4180' }, grid: { color: '#00ff4115' } },
        y: { ticks: { color: '#00ff4180' }, grid: { color: '#00ff4115' } },
      },
    };

    // Comparison chart
    if (comparisonRef.current && comparisonData) {
      const ctx = comparisonRef.current.getContext('2d');
      chartsRef.current.push(new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['MAE (lower is better)', 'Accuracy'],
          datasets: [
            {
              label: 'SM-2 Baseline',
              data: [comparisonData.baseline.mae, comparisonData.baseline.accuracy],
              backgroundColor: '#ff660080',
              borderColor: '#ff6600',
              borderWidth: 1,
            },
            {
              label: 'ML Model',
              data: [comparisonData.ml.mae, comparisonData.ml.accuracy],
              backgroundColor: '#00ff4180',
              borderColor: '#00ff41',
              borderWidth: 1,
            },
          ],
        },
        options: { ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: 'Algorithm Comparison', color: '#00ff41', font: { family: 'Courier New', size: 14 } } } },
      }));
    }

    // Retention chart
    if (retentionRef.current && progressData) {
      const ctx = retentionRef.current.getContext('2d');
      chartsRef.current.push(new Chart(ctx, {
        type: 'line',
        data: {
          labels: progressData.dates,
          datasets: [{
            label: 'Retention Rate',
            data: progressData.retention,
            borderColor: '#00ff41',
            backgroundColor: '#00ff4120',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#00ff41',
            pointBorderColor: '#0a0e27',
            pointBorderWidth: 2,
          }],
        },
        options: { ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: 'Retention Over Time', color: '#00ff41', font: { family: 'Courier New', size: 14 } } } },
      }));
    }

    // Interval distribution chart
    if (intervalRef.current && progressData) {
      const ctx = intervalRef.current.getContext('2d');
      chartsRef.current.push(new Chart(ctx, {
        type: 'bar',
        data: {
          labels: progressData.intervals.map(d => `${d}d`),
          datasets: [{
            label: 'Cards at Interval',
            data: progressData.intervalCounts,
            backgroundColor: progressData.intervalCounts.map((_, i) =>
              `hsl(${120 + i * 15}, 100%, ${40 + i * 5}%)`
            ),
            borderColor: '#00ff41',
            borderWidth: 1,
          }],
        },
        options: { ...chartOptions, plugins: { ...chartOptions.plugins, title: { display: true, text: 'Interval Distribution', color: '#00ff41', font: { family: 'Courier New', size: 14 } } } },
      }));
    }

    return () => {
      chartsRef.current.forEach(c => c.destroy());
      chartsRef.current = [];
    };
  }, [comparisonData, progressData]);

  return (
    <div style={styles.dashboard}>
      <h2 style={styles.title}>{'\u{1F4CA}'} Statistics Dashboard</h2>

      {comparisonData && (
        <div style={styles.statCard}>
          <div style={styles.improvementBanner}>
            ML Model Improvement: <strong>+{comparisonData.improvement.toFixed(1)}%</strong>
          </div>
        </div>
      )}

      <div style={styles.chartGrid}>
        <div style={styles.chartContainer}>
          <canvas ref={comparisonRef} data-testid="comparison-chart" />
        </div>
        <div style={styles.chartContainer}>
          <canvas ref={retentionRef} data-testid="retention-chart" />
        </div>
        <div style={styles.chartContainer}>
          <canvas ref={intervalRef} data-testid="interval-chart" />
        </div>
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    backgroundColor: '#0a0e27',
    padding: '24px',
    fontFamily: "'Courier New', monospace",
    color: '#00ff41',
  },
  title: {
    fontSize: '1.5em',
    marginBottom: '20px',
    letterSpacing: '2px',
  },
  statCard: {
    marginBottom: '20px',
  },
  improvementBanner: {
    backgroundColor: '#00ff4115',
    border: '1px solid #00ff4130',
    borderRadius: '8px',
    padding: '12px 20px',
    textAlign: 'center',
    fontSize: '1.1em',
  },
  chartGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '20px',
  },
  chartContainer: {
    backgroundColor: '#0d1235',
    borderRadius: '8px',
    border: '1px solid #00ff4120',
    padding: '16px',
    height: '300px',
  },
};

export default StatsDashboard;
