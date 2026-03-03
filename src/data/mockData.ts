import type {
  KPIMetric,
  RevenueDataPoint,
  TrafficDataPoint,
  RegionData,
  ActivityEvent,
  PerformanceMetric,
  PieSegment,
  FunnelStage,
  ServerNode,
  TopProduct,
} from '../types';

// ─── KPI Metrics ──────────────────────────────────────────────────────────────

export const INITIAL_KPI_METRICS: KPIMetric[] = [
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: 2_847_392,
    previousValue: 2_634_118,
    unit: '',
    prefix: '$',
    trend: 'up',
    changePercent: 8.1,
    sparklineData: [42, 55, 49, 63, 58, 72, 68, 81, 75, 89, 84, 97],
    color: 'indigo',
    icon: 'DollarSign',
  },
  {
    id: 'users',
    label: 'Active Users',
    value: 142_853,
    previousValue: 128_941,
    unit: '',
    prefix: '',
    trend: 'up',
    changePercent: 10.8,
    sparklineData: [30, 38, 35, 44, 41, 52, 48, 59, 56, 68, 63, 72],
    color: 'violet',
    icon: 'Users',
  },
  {
    id: 'sessions',
    label: 'Sessions Today',
    value: 38_721,
    previousValue: 41_034,
    unit: '',
    prefix: '',
    trend: 'down',
    changePercent: -5.6,
    sparklineData: [85, 79, 88, 73, 82, 76, 69, 75, 68, 72, 65, 70],
    color: 'cyan',
    icon: 'Activity',
  },
  {
    id: 'conversion',
    label: 'Conv. Rate',
    value: 4.73,
    previousValue: 4.21,
    unit: '%',
    prefix: '',
    trend: 'up',
    changePercent: 12.4,
    sparklineData: [3.2, 3.5, 3.4, 3.8, 3.7, 4.0, 4.1, 4.3, 4.2, 4.5, 4.6, 4.73],
    color: 'emerald',
    icon: 'TrendingUp',
  },
];

// ─── Revenue Chart Data ───────────────────────────────────────────────────────

export const REVENUE_DATA: RevenueDataPoint[] = [
  { month: 'Jan', revenue: 186_000, expenses: 120_000, profit: 66_000 },
  { month: 'Feb', revenue: 225_000, expenses: 138_000, profit: 87_000 },
  { month: 'Mar', revenue: 198_000, expenses: 125_000, profit: 73_000 },
  { month: 'Apr', revenue: 267_000, expenses: 152_000, profit: 115_000 },
  { month: 'May', revenue: 312_000, expenses: 168_000, profit: 144_000 },
  { month: 'Jun', revenue: 285_000, expenses: 159_000, profit: 126_000 },
  { month: 'Jul', revenue: 341_000, expenses: 187_000, profit: 154_000 },
  { month: 'Aug', revenue: 378_000, expenses: 203_000, profit: 175_000 },
  { month: 'Sep', revenue: 356_000, expenses: 195_000, profit: 161_000 },
  { month: 'Oct', revenue: 402_000, expenses: 218_000, profit: 184_000 },
  { month: 'Nov', revenue: 445_000, expenses: 235_000, profit: 210_000 },
  { month: 'Dec', revenue: 478_000, expenses: 251_000, profit: 227_000 },
];

// ─── Traffic Data ─────────────────────────────────────────────────────────────

export const TRAFFIC_DATA: TrafficDataPoint[] = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, '0')}:00`,
  desktop: Math.round(Math.sin((i / 24) * Math.PI * 2 - 1) * 800 + 1200 + Math.random() * 200),
  mobile: Math.round(Math.cos((i / 24) * Math.PI * 1.5) * 600 + 900 + Math.random() * 150),
  tablet: Math.round(Math.sin((i / 24) * Math.PI) * 300 + 400 + Math.random() * 100),
}));

// ─── Region Data ──────────────────────────────────────────────────────────────

export const REGION_DATA: RegionData[] = [
  { region: 'North America', sessions: 48_234, revenue: 1_284_000, users: 38_120, fill: '#6366f1' },
  { region: 'Europe', sessions: 32_118, revenue: 892_000, users: 24_890, fill: '#8b5cf6' },
  { region: 'Asia Pacific', sessions: 27_493, revenue: 421_000, users: 21_340, fill: '#06b6d4' },
  { region: 'Latin America', sessions: 12_847, revenue: 138_000, users: 10_021, fill: '#10b981' },
  { region: 'Middle East', sessions: 8_234, revenue: 89_200, users: 6_543, fill: '#f59e0b' },
  { region: 'Africa', sessions: 4_117, revenue: 23_100, users: 3_234, fill: '#f43f5e' },
];

// ─── Activity Feed ────────────────────────────────────────────────────────────

const NAMES = [
  'Emma Johnson', 'Liam Williams', 'Olivia Brown', 'Noah Davis', 'Ava Miller',
  'Oliver Wilson', 'Isabella Moore', 'Elijah Taylor', 'Sophia Anderson', 'James Thomas',
];

const ACTIONS = [
  { action: 'completed a purchase', target: 'Pro Annual Plan', type: 'purchase' as const },
  { action: 'signed up for', target: 'Free Trial', type: 'signup' as const },
  { action: 'upgraded to', target: 'Enterprise Tier', type: 'upgrade' as const },
  { action: 'requested a refund for', target: 'Starter Plan', type: 'refund' as const },
  { action: 'triggered alert on', target: 'API Rate Limit', type: 'alert' as const },
];

export const ACTIVITY_EVENTS: ActivityEvent[] = Array.from({ length: 20 }, (_, i) => {
  const nameIndex = i % NAMES.length;
  const actionIndex = i % ACTIONS.length;
  const name = NAMES[nameIndex];
  return {
    id: `event-${i}`,
    user: {
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
    },
    ...ACTIONS[actionIndex],
    timestamp: new Date(Date.now() - i * 4 * 60 * 1000),
  };
});

// ─── Performance Metrics ──────────────────────────────────────────────────────

export const PERFORMANCE_METRICS: PerformanceMetric[] = [
  { name: 'API Response Time', score: 142, maxScore: 500, unit: 'ms', status: 'excellent' },
  { name: 'Page Load Speed', score: 2.3, maxScore: 10, unit: 's', status: 'excellent' },
  { name: 'Error Rate', score: 0.12, maxScore: 5, unit: '%', status: 'excellent' },
  { name: 'Cache Hit Rate', score: 94.7, maxScore: 100, unit: '%', status: 'excellent' },
  { name: 'DB Query Time', score: 48, maxScore: 200, unit: 'ms', status: 'good' },
  { name: 'Memory Usage', score: 67, maxScore: 100, unit: '%', status: 'good' },
  { name: 'CPU Utilization', score: 78, maxScore: 100, unit: '%', status: 'warning' },
  { name: 'Disk I/O', score: 91, maxScore: 100, unit: '%', status: 'warning' },
];

// ─── Pie / Donut ──────────────────────────────────────────────────────────────

export const ACQUISITION_DATA: PieSegment[] = [
  { name: 'Organic Search', value: 38, color: '#6366f1' },
  { name: 'Direct', value: 24, color: '#8b5cf6' },
  { name: 'Social Media', value: 19, color: '#06b6d4' },
  { name: 'Referral', value: 12, color: '#10b981' },
  { name: 'Email', value: 7, color: '#f59e0b' },
];

// ─── Conversion Funnel ────────────────────────────────────────────────────────

export const FUNNEL_DATA: FunnelStage[] = [
  { stage: 'Visitors', users: 100_000, conversionRate: 100 },
  { stage: 'Leads', users: 42_000, conversionRate: 42 },
  { stage: 'Qualified', users: 18_500, conversionRate: 18.5 },
  { stage: 'Trial', users: 7_200, conversionRate: 7.2 },
  { stage: 'Paid', users: 4_730, conversionRate: 4.73 },
];

// ─── Server Nodes ─────────────────────────────────────────────────────────────

export const SERVER_NODES: ServerNode[] = [
  { id: 's1', name: 'us-east-1a', region: 'N. Virginia', status: 'online', cpu: 62, memory: 71, latency: 12 },
  { id: 's2', name: 'us-west-2b', region: 'Oregon', status: 'online', cpu: 45, memory: 58, latency: 18 },
  { id: 's3', name: 'eu-west-1c', region: 'Ireland', status: 'online', cpu: 78, memory: 83, latency: 34 },
  { id: 's4', name: 'ap-south-1a', region: 'Mumbai', status: 'degraded', cpu: 91, memory: 89, latency: 87 },
  { id: 's5', name: 'ap-east-1b', region: 'Tokyo', status: 'online', cpu: 38, memory: 44, latency: 52 },
  { id: 's6', name: 'sa-east-1a', region: 'São Paulo', status: 'offline', cpu: 0, memory: 0, latency: 999 },
];

// ─── Top Products ─────────────────────────────────────────────────────────────

export const TOP_PRODUCTS: TopProduct[] = [
  { id: 'p1', name: 'Enterprise Suite', category: 'SaaS', revenue: 984_200, units: 412, growth: 23.4, imageIndex: 1 },
  { id: 'p2', name: 'Pro Annual Plan', category: 'SaaS', revenue: 758_100, units: 1_893, growth: 18.7, imageIndex: 2 },
  { id: 'p3', name: 'API Access Bundle', category: 'Developer', revenue: 521_800, units: 2_341, growth: 31.2, imageIndex: 3 },
  { id: 'p4', name: 'Analytics Add-on', category: 'Add-on', revenue: 284_500, units: 3_102, growth: -4.8, imageIndex: 4 },
  { id: 'p5', name: 'Starter Pack', category: 'SaaS', revenue: 178_400, units: 8_920, growth: 12.1, imageIndex: 5 },
];
