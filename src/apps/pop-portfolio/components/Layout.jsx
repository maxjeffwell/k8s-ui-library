import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TerminalIcon from '@mui/icons-material/Terminal';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LogoutIcon from '@mui/icons-material/Logout';
import ConnectionStatus from './ConnectionStatus';
import NotificationBell from './NotificationBell';

const DRAWER_WIDTH = 240;

const iconMap = {
  Dashboard: DashboardIcon,
  ViewInAr: ViewInArIcon,
  RocketLaunch: RocketLaunchIcon,
  Analytics: AnalyticsIcon,
  Terminal: TerminalIcon,
  TrendingUp: TrendingUpIcon,
  SmartToy: SmartToyIcon,
};

const Layout = ({
  children,
  user = { username: 'admin' },
  navItems = [],
  externalApps = [],
  activePath = '/',
  connectionStatus = 'connected',
  notifications = [],
  unreadCount = 0,
  onNavigate,
  onLogout,
  onNotificationAction,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawer = (
    <Box sx={{ overflow: 'auto' }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
          Pop!_Portfolio
        </Typography>
      </Toolbar>
      <Divider />
      <List subheader={<ListSubheader>Navigation</ListSubheader>}>
        {navItems.map((item) => {
          const Icon = iconMap[item.icon] || DashboardIcon;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={activePath === item.path}
                onClick={() => onNavigate && onNavigate(item.path)}
                data-testid={`nav-${item.text.toLowerCase().replace(/\s/g, '-')}`}
              >
                <ListItemIcon><Icon /></ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List subheader={<ListSubheader>Applications</ListSubheader>}>
        {externalApps.map((app) => (
          <ListItem key={app.text} disablePadding>
            <ListItemButton component="a" href={app.href} target="_blank" rel="noopener noreferrer">
              <ListItemIcon><OpenInNewIcon /></ListItemIcon>
              <ListItemText primary={app.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Logged in as <strong>{user.username}</strong>
        </Typography>
        <Button
          variant="outlined"
          size="small"
          startIcon={<LogoutIcon />}
          onClick={onLogout}
          fullWidth
          data-testid="logout-btn"
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '600px', bgcolor: 'background.default' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          bgcolor: 'background.paper',
          backgroundImage: 'none',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ mr: 2, display: { sm: 'none' } }}
            data-testid="menu-toggle"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Kubernetes Dashboard
          </Typography>
          <ConnectionStatus status={connectionStatus} />
          <NotificationBell
            notifications={notifications}
            unreadCount={unreadCount}
            onMarkAsRead={onNotificationAction}
            onDelete={onNotificationAction}
            onClearAll={onNotificationAction}
          />
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, bgcolor: 'background.paper' } }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, bgcolor: 'background.paper' } }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }, mt: 8 }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
