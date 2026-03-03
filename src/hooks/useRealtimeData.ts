import { useState, useEffect, useCallback, useRef } from 'react';
import type { KPIMetric, TrafficDataPoint, ServerNode, ActivityEvent } from '../types';
import { INITIAL_KPI_METRICS, TRAFFIC_DATA, SERVER_NODES, ACTIVITY_EVENTS } from '../data/mockData';
import { nudge, randomInt } from '../utils/formatters';

const TICK_INTERVAL_MS = 2000;

interface RealtimeData {
  kpiMetrics: KPIMetric[];
  trafficData: TrafficDataPoint[];
  serverNodes: ServerNode[];
  recentActivity: ActivityEvent[];
  isLive: boolean;
  lastUpdated: Date;
  tickCount: number;
  toggleLive: () => void;
}

// ─── Update Helpers ───────────────────────────────────────────────────────────

function updateKPIs(metrics: KPIMetric[]): KPIMetric[] {
  return metrics.map((m) => {
    const newValue = nudge(m.value, 0.008);
    const changePercent = ((newValue - m.previousValue) / m.previousValue) * 100;
    const sparklineData = [...m.sparklineData.slice(1), (newValue / m.previousValue) * 80];
    return {
      ...m,
      previousValue: m.value,
      value: newValue,
      changePercent,
      trend: changePercent >= 0 ? 'up' : 'down',
      sparklineData,
    };
  });
}

function updateTraffic(data: TrafficDataPoint[]): TrafficDataPoint[] {
  return data.map((d) => ({
    ...d,
    desktop: Math.max(0, Math.round(nudge(d.desktop, 0.05))),
    mobile: Math.max(0, Math.round(nudge(d.mobile, 0.05))),
    tablet: Math.max(0, Math.round(nudge(d.tablet, 0.05))),
  }));
}

function updateServerNodes(nodes: ServerNode[]): ServerNode[] {
  return nodes.map((n) => {
    if (n.status === 'offline') return n;
    const cpu = Math.min(100, Math.max(0, nudge(n.cpu, 0.04)));
    const memory = Math.min(100, Math.max(0, nudge(n.memory, 0.02)));
    const latency = Math.max(1, nudge(n.latency, 0.06));
    const status: ServerNode['status'] = cpu > 95 ? 'degraded' : n.status;
    return { ...n, cpu, memory, latency, status };
  });
}

const ADJECTIVES = ['New', 'Returning', 'Premium', 'Trial', 'Enterprise'];
const NEW_ACTIONS: ActivityEvent['type'][] = ['purchase', 'signup', 'upgrade', 'refund', 'alert'];

function generateNewActivity(existing: ActivityEvent[]): ActivityEvent[] {
  if (Math.random() > 0.35) return existing;
  const adj = ADJECTIVES[randomInt(0, ADJECTIVES.length - 1)];
  const type = NEW_ACTIONS[randomInt(0, NEW_ACTIONS.length - 1)];
  const name = `${adj} User ${randomInt(1000, 9999)}`;
  const newEvent: ActivityEvent = {
    id: `event-${Date.now()}`,
    user: {
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      email: `user${randomInt(100, 999)}@example.com`,
    },
    action:
      type === 'purchase' ? 'completed a purchase' :
        type === 'signup' ? 'signed up for' :
          type === 'upgrade' ? 'upgraded to' :
            type === 'refund' ? 'requested a refund for' :
              'triggered alert on',
    target:
      type === 'purchase' ? 'Pro Annual Plan' :
        type === 'signup' ? 'Free Trial' :
          type === 'upgrade' ? 'Enterprise Tier' :
            type === 'refund' ? 'Starter Plan' :
              'API Rate Limit',
    timestamp: new Date(),
    type,
  };
  return [newEvent, ...existing.slice(0, 19)];
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useRealtimeData(): RealtimeData {
  const [kpiMetrics, setKpiMetrics] = useState<KPIMetric[]>(INITIAL_KPI_METRICS);
  const [trafficData, setTrafficData] = useState<TrafficDataPoint[]>(TRAFFIC_DATA);
  const [serverNodes, setServerNodes] = useState<ServerNode[]>(SERVER_NODES);
  const [recentActivity, setRecentActivity] = useState<ActivityEvent[]>(ACTIVITY_EVENTS);
  const [isLive, setIsLive] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [tickCount, setTickCount] = useState(0);

  const isLiveRef = useRef(isLive);
  isLiveRef.current = isLive;

  const tick = useCallback(() => {
    if (!isLiveRef.current) return;
    setKpiMetrics((prev) => updateKPIs(prev));
    setTrafficData((prev) => updateTraffic(prev));
    setServerNodes((prev) => updateServerNodes(prev));
    setRecentActivity((prev) => generateNewActivity(prev));
    setLastUpdated(new Date());
    setTickCount((c) => c + 1);
  }, []);

  useEffect(() => {
    const id = setInterval(tick, TICK_INTERVAL_MS);
    return () => clearInterval(id);
  }, [tick]);

  const toggleLive = useCallback(() => {
    setIsLive((prev) => !prev);
  }, []);

  return {
    kpiMetrics,
    trafficData,
    serverNodes,
    recentActivity,
    isLive,
    lastUpdated,
    tickCount,
    toggleLive,
  };
}
