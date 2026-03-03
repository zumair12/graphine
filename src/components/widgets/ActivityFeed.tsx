import React from 'react';
import type { ActivityEvent } from '../../types';
import { formatRelativeTime } from '../../utils/formatters';

const BADGE_CLASS: Record<ActivityEvent['type'], string> = {
  purchase: 'activity-badge--purchase',
  signup: 'activity-badge--signup',
  upgrade: 'activity-badge--upgrade',
  refund: 'activity-badge--refund',
  alert: 'activity-badge--alert',
};

const BADGE_LABEL: Record<ActivityEvent['type'], string> = {
  purchase: 'Sale',
  signup: 'New',
  upgrade: 'Up',
  refund: 'Refund',
  alert: 'Alert',
};

interface ActivityFeedProps {
  events: ActivityEvent[];
  maxItems?: number;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ events, maxItems = 10 }) => (
  <div className="activity-list scrollable fade-bottom">
    {events.slice(0, maxItems).map((event) => (
      <div key={event.id} className="activity-item">
        <div className="activity-item__avatar">
          <img
            src={event.user.avatar}
            alt={event.user.name}
            loading="lazy"
          />
        </div>

        <div className="activity-item__content">
          <p className="activity-item__text">
            <strong>{event.user.name}</strong>
            {' '}{event.action}{' '}
            <strong>{event.target}</strong>
          </p>
          <p className="activity-item__time">{formatRelativeTime(event.timestamp)}</p>
        </div>

        <span className={`activity-item__badge ${BADGE_CLASS[event.type]}`}>
          {BADGE_LABEL[event.type]}
        </span>
      </div>
    ))}
  </div>
);
