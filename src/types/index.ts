// ─── KPI Metric Types ────────────────────────────────────────────────────────

export type MetricTrend = 'up' | 'down' | 'neutral';

export interface KPIMetric {
  id: string;
  label: string;
  value: number;
  previousValue: number;
  unit: string;
  prefix?: string;
  trend: MetricTrend;
  changePercent: number;
  sparklineData: number[];
  color: 'indigo' | 'violet' | 'cyan' | 'emerald' | 'rose' | 'amber';
  icon: string;
}

// ─── Time Series Data ─────────────────────────────────────────────────────────

export interface TimeSeriesPoint {
  timestamp: string;
  value: number;
  label?: string;
}

export interface MultiSeriesPoint {
  timestamp: string;
  [key: string]: number | string;
}

// ─── Revenue Data ─────────────────────────────────────────────────────────────

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

// ─── Traffic Data ─────────────────────────────────────────────────────────────

export interface TrafficDataPoint {
  hour: string;
  desktop: number;
  mobile: number;
  tablet: number;
}

// ─── Geographic Data ─────────────────────────────────────────────────────────

export interface RegionData {
  region: string;
  sessions: number;
  revenue: number;
  users: number;
  fill: string;
}

// ─── User Activity ────────────────────────────────────────────────────────────

export interface ActivityEvent {
  id: string;
  user: {
    name: string;
    avatar: string;
    email: string;
  };
  action: string;
  target: string;
  timestamp: Date;
  type: 'purchase' | 'signup' | 'upgrade' | 'refund' | 'alert';
}

// ─── Performance Data ─────────────────────────────────────────────────────────

export interface PerformanceMetric {
  name: string;
  score: number;
  maxScore: number;
  unit: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

// ─── Pie / Donut Chart Data ───────────────────────────────────────────────────

export interface PieSegment {
  name: string;
  value: number;
  color: string;
}

// ─── Funnel Data ──────────────────────────────────────────────────────────────

export interface FunnelStage {
  stage: string;
  users: number;
  conversionRate: number;
}

// ─── Server Status ────────────────────────────────────────────────────────────

export interface ServerNode {
  id: string;
  name: string;
  region: string;
  status: 'online' | 'degraded' | 'offline';
  cpu: number;
  memory: number;
  latency: number;
}

// ─── Top Product ──────────────────────────────────────────────────────────────

export interface TopProduct {
  id: string;
  name: string;
  category: string;
  revenue: number;
  units: number;
  growth: number;
  imageIndex: number;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export type NavSection = 'overview' | 'analytics' | 'performance' | 'activity';

// ─── Date Range ───────────────────────────────────────────────────────────────

export type DateRange = '24h' | '7d' | '30d' | '90d' | '1y';

// ─── Real-time State ──────────────────────────────────────────────────────────

export interface RealTimeState {
  isLive: boolean;
  lastUpdated: Date;
  tickCount: number;
}
