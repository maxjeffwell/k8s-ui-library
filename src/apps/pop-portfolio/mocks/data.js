export const mockUser = {
  username: 'admin',
  email: 'admin@pop-portfolio.dev',
  role: 'admin',
};

export const mockNotifications = [
  {
    id: 'notif-1',
    title: 'Pod CrashLoopBackOff',
    message: 'Pod api-server-7d4b8c6f5-x2k9j in namespace production is in CrashLoopBackOff state.',
    priority: 10,
    date: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-2',
    title: 'High Memory Usage',
    message: 'Node worker-03 memory usage has exceeded 85% threshold.',
    priority: 7,
    date: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-3',
    title: 'Deployment Scaled',
    message: 'Deployment frontend-app scaled from 3 to 5 replicas in namespace staging.',
    priority: 4,
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-4',
    title: 'Certificate Expiring',
    message: 'TLS certificate for *.el-jefe.me expires in 7 days.',
    priority: 7,
    date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-5',
    title: 'Backup Completed',
    message: 'Scheduled etcd backup completed successfully.',
    priority: 1,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockNavItems = [
  { text: 'Dashboard', path: '/', icon: 'Dashboard' },
  { text: 'Pods', path: '/pods', icon: 'ViewInAr' },
  { text: 'Deployments', path: '/deployments', icon: 'RocketLaunch' },
  { text: 'Metrics', path: '/metrics', icon: 'Analytics' },
  { text: 'Logs', path: '/logs', icon: 'Terminal' },
  { text: 'Analytics', path: '/analytics', icon: 'TrendingUp' },
  { text: 'AI Chat', path: '/ai-chat', icon: 'SmartToy' },
];

export const mockExternalApps = [
  { text: 'ArgoCD', href: 'https://argocd.el-jefe.me' },
  { text: 'PodRick', href: 'https://podrick.el-jefe.me' },
  { text: 'Grafana', href: 'https://grafana.el-jefe.me' },
];
