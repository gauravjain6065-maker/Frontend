import React, { useState } from 'react';
import { Bell, CheckCircle, RefreshCw } from 'lucide-react';
import { PageContainer, PageHeader, Card, Stack } from '../../../components/layout';
import { NotificationCard, Button, FilterBar } from '../../../components/ui';
import { NOTIFICATIONS } from '../../../mock/dashboard/dashboardMock';

export default function Notifications() {
  const [alerts, setAlerts] = useState(NOTIFICATIONS);
  const [search, setSearch] = useState('');

  const breadcrumbs = [
    { label: 'Dashboard', href: '/company-admin/dashboard' },
    { label: 'Notifications' }
  ];

  // Filtering
  const filteredAlerts = alerts.filter(n => {
    return n.title.toLowerCase().includes(search.toLowerCase()) || 
           n.description.toLowerCase().includes(search.toLowerCase());
  });

  const handleMarkAllRead = () => {
    setAlerts(alerts.map(n => ({ ...n, unread: false })));
    alert('All notifications marked as read.');
  };

  const handleNotificationClick = (id) => {
    setAlerts(alerts.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  return (
    <PageContainer>
      <Stack space={6}>
        <PageHeader
          title="System Alerts Inbox"
          description="View and administer alert logs, pipeline updates, and database sync status."
          breadcrumbs={breadcrumbs}
          actions={
            <Button
              variant="secondary"
              size="sm"
              leadingIcon={CheckCircle}
              onClick={handleMarkAllRead}
            >
              Mark All Read
            </Button>
          }
        />

        <Card>
          <FilterBar
            searchQuery={search}
            onSearchChange={(e) => setSearch(e.target.value)}
            onSearchClear={() => setSearch('')}
            placeholder="Search notifications..."
          />
        </Card>

        <Card>
          <Stack space={3}>
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((item) => {
                const NoteIcon = item.iconName === 'Mail' ? MailMock : item.iconName === 'CheckCircle' ? CheckCircle : Bell;
                return (
                  <NotificationCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    time={item.time}
                    unread={item.unread}
                    icon={NoteIcon}
                    variant={item.variant}
                    onClick={() => handleNotificationClick(item.id)}
                  />
                );
              })
            ) : (
              <div className="text-center py-10 text-xs text-neutral-400">
                No notifications match your search query.
              </div>
            )}
          </Stack>
        </Card>
      </Stack>
    </PageContainer>
  );
}

// Simple internal mock icon component to avoid import resolution issues
const MailMock = (props) => <Bell {...props} />;
