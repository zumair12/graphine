import { clsx, type ClassValue } from 'clsx';

// ─── CSS Class Utility ────────────────────────────────────────────────────────

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

// ─── Number Formatters ────────────────────────────────────────────────────────

export function formatCurrency(value: number, compact = false): string {
  if (compact) {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
    return `$${value}`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, compact = false): string {
  if (compact) {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
    return String(value);
  }
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
}

// ─── Date Formatters ──────────────────────────────────────────────────────────

export function formatRelativeTime(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// ─── Random Utilities ─────────────────────────────────────────────────────────

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomInt(min: number, max: number): number {
  return Math.floor(randomBetween(min, max + 1));
}

export function nudge(value: number, percent = 0.03): number {
  const delta = value * percent;
  return Math.max(0, value + randomBetween(-delta, delta));
}

// ─── Color Utilities ──────────────────────────────────────────────────────────

export const COLOR_MAP = {
  indigo: { bg: 'var(--color-indigo-500)', glow: 'rgba(99,102,241,0.3)' },
  violet: { bg: 'var(--color-violet-500)', glow: 'rgba(139,92,246,0.3)' },
  cyan: { bg: 'var(--color-cyan-500)', glow: 'rgba(6,182,212,0.3)' },
  emerald: { bg: 'var(--color-emerald-500)', glow: 'rgba(16,185,129,0.3)' },
  rose: { bg: 'var(--color-rose-500)', glow: 'rgba(244,63,94,0.3)' },
  amber: { bg: 'var(--color-amber-500)', glow: 'rgba(245,158,11,0.3)' },
} as const;
