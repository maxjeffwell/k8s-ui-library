import React from 'react';

const backendEmoji = {
  webgpu: '\u{1F680}',
  webgl: '\u26A1',
  wasm: '\u{1F527}',
  cpu: '\u{1F4BB}',
};

const backendColor = {
  webgpu: '#00ff41',
  webgl: '#00ccff',
  wasm: '#ffcc00',
  cpu: '#ff6600',
};

const MLStatus = ({ mlInfo }) => {
  if (!mlInfo || !mlInfo.isLoaded) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <span style={styles.spinner}>{'\u231B'}</span>
          <span>Loading ML Model...</span>
        </div>
      </div>
    );
  }

  const color = backendColor[mlInfo.backend] || '#00ff41';
  const emoji = backendEmoji[mlInfo.backend] || '\u{1F916}';

  return (
    <div style={{ ...styles.container, borderColor: color + '40' }}>
      <div style={styles.header}>
        <span style={{ fontSize: '1.5em' }}>{emoji}</span>
        <span style={{ ...styles.backendName, color }}>
          {mlInfo.backend.toUpperCase()}
        </span>
        {mlInfo.backendInfo?.speedup && (
          <span style={styles.speedup}>{mlInfo.backendInfo.speedup}</span>
        )}
      </div>
      <div style={styles.metrics}>
        <div style={styles.metric}>
          <span style={styles.metricValue}>{mlInfo.metrics.totalPredictions}</span>
          <span style={styles.metricLabel}>Predictions</span>
        </div>
        <div style={styles.metric}>
          <span style={styles.metricValue}>{mlInfo.metrics.avgPredictionTime.toFixed(1)}ms</span>
          <span style={styles.metricLabel}>Avg Time</span>
        </div>
        {mlInfo.metadata?.improvement > 0 && (
          <div style={styles.metric}>
            <span style={{ ...styles.metricValue, color: '#00ff41' }}>
              +{mlInfo.metadata.improvement.toFixed(1)}%
            </span>
            <span style={styles.metricLabel}>Improvement</span>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#0d1235',
    border: '1px solid #00ff4130',
    borderRadius: '8px',
    padding: '16px',
    fontFamily: "'Courier New', monospace",
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#00ff4180',
  },
  spinner: {
    animation: 'pulse 1.5s ease-in-out infinite',
    fontSize: '1.2em',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px',
  },
  backendName: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    letterSpacing: '2px',
  },
  speedup: {
    fontSize: '0.8em',
    color: '#00ff4160',
    marginLeft: 'auto',
  },
  metrics: {
    display: 'flex',
    gap: '20px',
  },
  metric: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  metricValue: {
    fontSize: '1.3em',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  metricLabel: {
    fontSize: '0.7em',
    color: '#00ff4160',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
};

export default MLStatus;
