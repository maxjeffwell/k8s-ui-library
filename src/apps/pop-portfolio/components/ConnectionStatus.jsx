import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import SyncIcon from '@mui/icons-material/Sync';

const ConnectionStatus = ({ status = 'connected' }) => {
  const statusConfig = {
    connected: { color: 'success', label: 'Connected', tooltip: 'WebSocket connection active' },
    connecting: { color: 'warning', label: 'Connecting...', tooltip: 'Establishing WebSocket connection' },
    disconnected: { color: 'error', label: 'Disconnected', tooltip: 'WebSocket connection lost' },
    reconnecting: { color: 'warning', label: 'Reconnecting...', tooltip: 'Attempting to reconnect' },
  };

  const config = statusConfig[status] || statusConfig.disconnected;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title={config.tooltip}>
        <Chip
          size="small"
          label={config.label}
          color={config.color}
          icon={status === 'reconnecting' ? (
            <SyncIcon sx={{ animation: 'spin 1s linear infinite', '@keyframes spin': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } } }} />
          ) : undefined}
          variant="outlined"
          data-testid="connection-status"
        />
      </Tooltip>
    </Box>
  );
};

export default ConnectionStatus;
