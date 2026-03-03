import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Activity,
  Users,
  Server,
  Settings,
  Bell,
  HelpCircle,
  ShoppingCart,
  LogOut,
  LineChart,
} from 'lucide-react';
import type { NavSection } from '../../types';

interface SidebarProps {
  activeSection: NavSection;
  onSectionChange: (s: NavSection) => void;
}

interface NavItem {
  id: NavSection;
  label: string;
  icon: React.FC<{ className?: string; size?: number }>;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'performance', label: 'Performance', icon: Activity },
  { id: 'activity', label: 'Activity', icon: Users, badge: 3 },
];

const OTHER_ITEMS = [
  { label: 'Orders', icon: ShoppingCart },
  { label: 'Reports', icon: LineChart },
  { label: 'Servers', icon: Server },
  { label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => (
  <aside className="sidebar">
    {/* Logo */}
    <div className="sidebar__logo">
      <div className="sidebar__logo-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <polyline
            points="3,18 8,12 13,15 19,8 22,10"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="sidebar__logo-text">Graphine</span>
    </div>

    {/* Nav */}
    <nav className="sidebar__nav">
      <span className="sidebar__section-label">Main</span>
      {NAV_ITEMS.map(({ id, label, icon: Icon, badge }) => (
        <button
          key={id}
          className={`sidebar__nav-item${activeSection === id ? ' active' : ''}`}
          onClick={() => onSectionChange(id)}
        >
          <Icon className="sidebar__nav-icon" size={17} />
          {label}
          {badge && <span className="sidebar__badge">{badge}</span>}
        </button>
      ))}

      <span className="sidebar__section-label">Workspace</span>
      {OTHER_ITEMS.map(({ label, icon: Icon }) => (
        <button key={label} className="sidebar__nav-item">
          <Icon className="sidebar__nav-icon" size={17} />
          {label}
        </button>
      ))}

      <div style={{ flex: 1 }} />

      <button className="sidebar__nav-item" style={{ marginTop: 8 }}>
        <Bell className="sidebar__nav-icon" size={17} />
        Notifications
        <span className="sidebar__badge">5</span>
      </button>
      <button className="sidebar__nav-item">
        <HelpCircle className="sidebar__nav-icon" size={17} />
        Help &amp; Support
      </button>
    </nav>

    {/* Footer */}
    <div className="sidebar__footer">
      <div className="sidebar__profile">
        <div className="sidebar__avatar">AG</div>
        <div>
          <div className="sidebar__profile-name">Alex Graham</div>
          <div className="sidebar__profile-role">Super Admin</div>
        </div>
        <LogOut
          size={14}
          style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.25)', cursor: 'pointer' }}
        />
      </div>
    </div>
  </aside>
);
