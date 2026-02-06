import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './DeploymentControls.css';

const APP_CONFIGS = {
  'educationelly': {
    label: 'educationELLy (REST)',
    serverImage: 'maxjeffwell/educationelly-server:latest',
    clientImage: 'maxjeffwell/educationelly-client:latest',
    serverPort: 8080,
    clientPort: 3000,
    dbKey: 'mongodb-educationelly',
    dbLabel: 'MongoDB Educationelly (Local)',
  },
  'educationelly-graphql': {
    label: 'educationELLy (GraphQL)',
    serverImage: 'maxjeffwell/educationelly-graphql-server:latest',
    clientImage: 'maxjeffwell/educationelly-graphql-client:latest',
    serverPort: 8000,
    clientPort: 80,
    dbKey: 'mongodb-educationelly-graphql',
    dbLabel: 'MongoDB Educationelly GraphQL (Local)',
  },
  'code-talk': {
    label: 'Code Talk',
    serverImage: 'maxjeffwell/code-talk-graphql-server:latest',
    clientImage: 'maxjeffwell/code-talk-graphql-client:latest',
    serverPort: 8000,
    clientPort: 5000,
    dbKey: 'postgres-codetalk',
    dbLabel: 'PostgreSQL + Redis (Local)',
  },
  'bookmarked': {
    label: 'Bookmarked',
    serverImage: 'maxjeffwell/bookmarks-react-hooks-server:latest',
    clientImage: 'maxjeffwell/bookmarks-react-hooks-client:latest',
    serverPort: 3001,
    clientPort: 80,
    dbKey: 'postgres-neon',
    dbLabel: 'PostgreSQL (Neon DB)',
  },
  'intervalai': {
    label: 'IntervalAI',
    serverImage: 'maxjeffwell/spaced-repetition-capstone-server:latest',
    clientImage: 'maxjeffwell/spaced-repetition-capstone-client:latest',
    serverPort: 8080,
    clientPort: 80,
    dbKey: 'mongodb-intervalai',
    dbLabel: 'MongoDB IntervalAI (Local)',
  },
};

/**
 * DeploymentControls allows deploying an application to a Kubernetes tenant.
 *
 * This is a presentation-only component. The `onDeploy` callback receives
 * the deployment configuration and is responsible for the actual API call.
 */
function DeploymentControls({ tenantName, onDeploy, lockedAppType }) {
  const [appType, setAppType] = useState(lockedAppType || 'educationelly-graphql');
  const initialConfig = APP_CONFIGS[lockedAppType || 'educationelly-graphql'];
  const [databaseKey, setDatabaseKey] = useState(initialConfig ? initialConfig.dbKey : 'mongodb-educationelly-graphql');
  const [replicas, setReplicas] = useState(1);
  const [serverImage, setServerImage] = useState(initialConfig ? initialConfig.serverImage : '');
  const [clientImage, setClientImage] = useState(initialConfig ? initialConfig.clientImage : '');
  const [serverPort, setServerPort] = useState(initialConfig ? initialConfig.serverPort : 8000);
  const [clientPort, setClientPort] = useState(initialConfig ? initialConfig.clientPort : 3000);
  const [envVars, setEnvVars] = useState('');
  const [deploying, setDeploying] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (lockedAppType && APP_CONFIGS[lockedAppType]) {
      const config = APP_CONFIGS[lockedAppType];
      setAppType(lockedAppType);
      setServerImage(config.serverImage);
      setClientImage(config.clientImage);
      setServerPort(config.serverPort);
      setClientPort(config.clientPort);
      setDatabaseKey(config.dbKey);
    }
  }, [lockedAppType]);

  const handleAppTypeChange = (type) => {
    setAppType(type);
    const config = APP_CONFIGS[type];
    if (config) {
      setServerImage(config.serverImage);
      setClientImage(config.clientImage);
      setServerPort(config.serverPort);
      setClientPort(config.clientPort);
      setDatabaseKey(config.dbKey);
    }
  };

  const handleDeploy = async (e) => {
    e.preventDefault();
    setDeploying(true);
    setError(null);

    try {
      const env = envVars
        .split('\n')
        .filter((line) => line.trim())
        .map((line) => {
          const [name, value] = line.split('=');
          return { name: name?.trim(), value: value?.trim() };
        });

      await onDeploy({
        tenantName,
        appType,
        databaseKey,
        replicas: parseInt(replicas),
        serverImage,
        clientImage,
        serverPort: parseInt(serverPort),
        clientPort: parseInt(clientPort),
        env,
      });
    } catch (err) {
      setError(err.message || 'Failed to deploy application');
    } finally {
      setDeploying(false);
    }
  };

  return (
    <div className="deployment-controls">
      <h4>Deploy Application</h4>
      <form onSubmit={handleDeploy}>
        <div className="form-group">
          <label>Select Application:</label>
          <select
            value={appType}
            onChange={(e) => handleAppTypeChange(e.target.value)}
            className="app-select"
            disabled={!!lockedAppType}
            title={lockedAppType ? 'App type is locked for this tenant' : 'Select application to deploy'}
          >
            {Object.entries(APP_CONFIGS).map(([key, config]) => (
              <option key={key} value={key}>
                {config.label}
              </option>
            ))}
          </select>
          {lockedAppType && (
            <small>App type locked to tenant configuration</small>
          )}
        </div>

        <div className="form-group">
          <label>Database Connection:</label>
          <div className="read-only-field">
            {APP_CONFIGS[appType]?.dbLabel || 'Default Database'}
          </div>
          <small>Automatically configured based on application type</small>
        </div>

        <div className="form-group">
          <label htmlFor="replicas">Replicas (per service):</label>
          <input
            type="number"
            id="replicas"
            value={replicas}
            onChange={(e) => setReplicas(e.target.value)}
            min="1"
            max="10"
            required
          />
          <small>Number of pods for both server and client</small>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="serverImage">Server Image:</label>
            <input
              type="text"
              id="serverImage"
              value={serverImage}
              onChange={(e) => setServerImage(e.target.value)}
              placeholder="image:tag"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="serverPort">Server Port:</label>
            <input
              type="number"
              id="serverPort"
              value={serverPort}
              onChange={(e) => setServerPort(e.target.value)}
              placeholder="8000"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="clientImage">Client Image:</label>
            <input
              type="text"
              id="clientImage"
              value={clientImage}
              onChange={(e) => setClientImage(e.target.value)}
              placeholder="image:tag"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="clientPort">Client Port:</label>
            <input
              type="number"
              id="clientPort"
              value={clientPort}
              onChange={(e) => setClientPort(e.target.value)}
              placeholder="3000"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="envVars">Environment Variables (optional):</label>
          <textarea
            id="envVars"
            value={envVars}
            onChange={(e) => setEnvVars(e.target.value)}
            placeholder={'NODE_ENV=production\nLOG_LEVEL=info'}
            rows="4"
          />
          <small>Format: KEY=value (one per line).</small>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="btn-primary" disabled={deploying}>
          {deploying ? 'Deploying...' : 'Deploy Application'}
        </button>
      </form>
    </div>
  );
}

DeploymentControls.propTypes = {
  tenantName: PropTypes.string.isRequired,
  onDeploy: PropTypes.func.isRequired,
  lockedAppType: PropTypes.string,
};

export default DeploymentControls;
