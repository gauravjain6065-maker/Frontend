import React, { useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Bell, CheckCheck, Target, UserPlus, AlertCircle, Clock } from 'lucide-react';

export function Notifications() {
  const [notificationsList, setNotificationsList] = useState([
    { id: 1, title: 'New Deal Closed by Sarah Jenkins', desc: 'Sarah closed deal with Acme Corporation ($45,000).', time: '10 mins ago', type: 'deal', read: false },
    { id: 2, title: 'Unassigned High-Priority Lead', desc: 'Lead #LD-4089 (Global Logistics Corp - $85,000) requires assignment.', time: '45 mins ago', type: 'alert', read: false },
    { id: 3, title: 'Quota Milestone Reached', desc: 'Enterprise Sales Team reached 90% of overall monthly target.', time: '2 hours ago', type: 'milestone', read: false },
    { id: 4, title: 'Employee Status Updated', desc: 'Emily Zhang status changed to On Leave.', time: 'Yesterday', type: 'info', read: true },
    { id: 5, title: 'Weekly Performance Report Ready', desc: 'Q3 Team Performance report has been compiled and is ready for download.', time: 'Jul 28, 2026', type: 'system', read: true },
  ]);

  const markAllRead = () => {
    setNotificationsList(notificationsList.map((n) => ({ ...n, read: true })));
  };

  const markSingleRead = (id) => {
    setNotificationsList(notificationsList.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const unreadCount = notificationsList.filter((n) => !n.read).length;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Notifications"
        subtitle="Stay updated on key sales milestones, team activities, and pending manager alerts."
        actions={
          <Button variant="secondary" icon={CheckCheck} onClick={markAllRead}>
            Mark All as Read
          </Button>
        }
      />

      <div className="space-y-4">
        {notificationsList.map((item) => (
          <Card key={item.id} className={!item.read ? 'border-l-4 border-l-blue-600' : ''}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg mt-0.5 ${!item.read ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                    {!item.read && <Badge variant="primary">Unread</Badge>}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                  <span className="text-[11px] text-gray-400 mt-2 block flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </span>
                </div>
              </div>

              {!item.read && (
                <button
                  onClick={() => markSingleRead(item.id)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer shrink-0"
                >
                  Mark as Read
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
