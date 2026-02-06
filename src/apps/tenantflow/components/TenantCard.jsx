import { useState } from 'react';
import PropTypes from 'prop-types';
import './TenantCard.css';

/**
 * TenantCard displays a Kubernetes tenant with expandable details.
 *
 * This is a presentation-only component. All data (tenant summary, details,
 * metrics) is passed via props rather than fetched internally.
 */
function TenantCard({
  tenant,
  isExpanded = false,
  onToggle,
  onDeleted,
  onRefresh,
  onEnableDatabase,
  details = null,
  metrics = null,
  loading = false,
  deploymentControls = null,
}) {
  const [editingQuota, setEditingQuota] = useState(false);
  const [quotaForm, setQuotaForm] = useState({ cpu: '', memory: '' });
  const [selectedPodLogs, setSelectedPodLogs] = useState(null);

  const handleEditQuota = () => {
    setQuotaForm({
      cpu: tenant.cpu || '2',
      memory: tenant.memory || '4Gi',
    });
    setEditingQuota(true);
  };

  const handleUpdateQuota = (e) => {
    e.preventDefault();
    if (onRefresh) {
      onRefresh({ ...quotaForm });
    }
    setEditingQuota(false);
  };

  const hasDeployments = details?.deployments && details.deployments.length > 0;

  return (
    <div className={`tenant-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="tenant-card-header" onClick={onToggle}>
        <div className="tenant-info">
          <h3>{tenant.name}</h3>
          <span className={`status-badge ${tenant.status.toLowerCase()}`}>
            {tenant.status}
          </span>
        </div>
        <div className="tenant-meta">
          <span className="created-date">
            Created: {new Date(tenant.createdAt).toLocaleDateString()}
          </span>
          <button className="expand-btn">
            {isExpanded ? '\u25BC' : '\u25B6'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="tenant-card-body">
          {loading ? (
            <div className="loading-details">Loading details...</div>
          ) : (
            <>
              {!hasDeployments && deploymentControls}

              {hasDeployments && (
                <div className="deployments-section">
                  <h4>Deployments</h4>
                  {details.deployments.map((deployment) => (
                    <div key={deployment.name} className="deployment-info">
                      <div className="deployment-header">
                        <span className="deployment-name">{deployment.name}</span>
                        <span className="replica-count">
                          {deployment.availableReplicas || 0}/{deployment.replicas} replicas
                        </span>
                      </div>
                      <div className="deployment-details">
                        <span>Image: {deployment.image}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {details?.ingresses && details.ingresses.length > 0 && (
                <div className="ingress-section">
                  <h4>Access URLs</h4>
                  {details.ingresses.map((ingress) => (
                    <div key={ingress.name} className="ingress-info">
                      <div className="ingress-header">
                        <span className="ingress-type">
                          {ingress.type === 'client' ? 'Frontend' : 'API'}
                        </span>
                        <a
                          href={ingress.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ingress-url"
                        >
                          {ingress.host}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {details?.database && (
                <div className="database-section">
                  <h4>Database</h4>
                  <div className="database-info">
                    {details.database.configured ? (
                      <>
                        <div className="database-header">
                          <span className="database-name">
                            {details.database.name}
                          </span>
                          {details.database.connection && (
                            <span className={`connection-status ${details.database.connection.status}`}>
                              {details.database.connection.status === 'connected' && 'Connected'}
                              {details.database.connection.status === 'connection_error' && 'Connection Error'}
                              {details.database.connection.status === 'no_pods' && 'No Pods'}
                              {details.database.connection.status === 'pod_not_running' && 'Pod Not Running'}
                              {details.database.connection.status === 'unknown' && 'Unknown'}
                              {details.database.connection.status === 'logs_unavailable' && 'Logs Unavailable'}
                            </span>
                          )}
                        </div>
                        <div className="database-details">
                          {details.database.connection?.message && (
                            <span className="connection-message">
                              {details.database.connection.message}
                            </span>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="database-not-configured">
                        <p>No database configured</p>
                        <button
                          className="btn-primary btn-enable-database"
                          onClick={onEnableDatabase}
                          disabled={!hasDeployments}
                        >
                          Enable Database
                        </button>
                        {!hasDeployments && (
                          <p className="database-hint">Deploy an application first</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {details?.services && details.services.length > 0 && (
                <div className="services-section">
                  <h4>Services</h4>
                  {details.services.map((service) => (
                    <div key={service.name} className="service-info">
                      <div className="service-header">
                        <span className="service-name">{service.name}</span>
                        <span className="service-type">Type: {service.type}</span>
                      </div>
                      <div className="service-details">
                        <div className="service-ports">
                          Ports: {service.ports?.map((p) => `${p.port}:${p.targetPort}`).join(', ') || 'N/A'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {metrics && metrics.pods && (
                <div className="metrics-section">
                  <h4>Resource Usage</h4>
                  <div className="metrics-grid">
                    <div className="metric">
                      <span className="metric-label">Total Pods:</span>
                      <span className="metric-value">{metrics.pods.total}</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Running:</span>
                      <span className="metric-value running">{metrics.pods.running}</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Pending:</span>
                      <span className="metric-value pending">{metrics.pods.pending}</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Failed:</span>
                      <span className="metric-value failed">{metrics.pods.failed}</span>
                    </div>
                  </div>
                </div>
              )}

              {metrics?.podsList && metrics.podsList.length > 0 && (
                <div className="pods-section">
                  <h4>Pods</h4>
                  <div className="pods-list">
                    {metrics.podsList.map((pod) => (
                      <div key={pod.name} className="pod-info">
                        <span className="pod-name">{pod.name}</span>
                        <span className={`pod-status ${pod.status.toLowerCase()}`}>
                          {pod.status}
                        </span>
                        <span className="pod-restarts">Restarts: {pod.restarts}</span>
                        <button
                          className="btn-logs"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPodLogs({
                              podName: pod.name,
                              logs: pod.logs || 'No logs available',
                            });
                          }}
                        >
                          Logs
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedPodLogs && (
                <div className="logs-modal">
                  <div className="logs-header">
                    <h4>Logs: {selectedPodLogs.podName}</h4>
                    <button
                      className="btn-close-logs"
                      onClick={() => setSelectedPodLogs(null)}
                    >
                      x
                    </button>
                  </div>
                  <pre className="logs-content">
                    {selectedPodLogs.logs}
                  </pre>
                </div>
              )}

              {editingQuota && (
                <div className="edit-quota-form">
                  <h4>Edit Resource Quota</h4>
                  <form onSubmit={handleUpdateQuota}>
                    <div className="form-group">
                      <label>CPU Cores</label>
                      <input
                        type="text"
                        value={quotaForm.cpu}
                        onChange={(e) => setQuotaForm({ ...quotaForm, cpu: e.target.value })}
                        placeholder="e.g., 2 or 500m"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Memory</label>
                      <input
                        type="text"
                        value={quotaForm.memory}
                        onChange={(e) => setQuotaForm({ ...quotaForm, memory: e.target.value })}
                        placeholder="e.g., 4Gi or 2048Mi"
                        className="form-input"
                      />
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn-primary">
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => setEditingQuota(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="tenant-actions">
                <button className="btn-secondary" onClick={onRefresh}>
                  Refresh
                </button>
                <button className="btn-secondary" onClick={handleEditQuota}>
                  Edit Quota
                </button>
                <button
                  className="btn-danger"
                  onClick={onDeleted}
                >
                  Delete Tenant
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

TenantCard.propTypes = {
  tenant: PropTypes.shape({
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    cpu: PropTypes.string,
    memory: PropTypes.string,
    appType: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  isExpanded: PropTypes.bool,
  onToggle: PropTypes.func,
  onDeleted: PropTypes.func,
  onRefresh: PropTypes.func,
  onEnableDatabase: PropTypes.func,
  details: PropTypes.shape({
    deployments: PropTypes.array,
    ingresses: PropTypes.array,
    database: PropTypes.object,
    services: PropTypes.array,
  }),
  metrics: PropTypes.shape({
    pods: PropTypes.shape({
      total: PropTypes.number,
      running: PropTypes.number,
      pending: PropTypes.number,
      failed: PropTypes.number,
    }),
    podsList: PropTypes.array,
  }),
  loading: PropTypes.bool,
  deploymentControls: PropTypes.node,
};

export default TenantCard;
