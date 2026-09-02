import { useState, useMemo } from "react";
import {
  CollaboratorNotificationHeader,
  CollaboratorNotificationList,
  COLLABORATOR_NOTIFICATIONS_DATA,
} from "./sections";

const CollaboratorNotificationsView = () => {
  const [notifications, setNotifications] = useState(
    COLLABORATOR_NOTIFICATIONS_DATA
  );

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => n.unread).length;
  }, [notifications]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleToggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
    );
  };

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      {/* 1. Header with Title, Unread Count & Mark All Read Button */}
      <CollaboratorNotificationHeader
        unreadCount={unreadCount}
        onMarkAllRead={handleMarkAllRead}
      />

      {/* 2. Notifications List Card Container */}
      <CollaboratorNotificationList
        notifications={notifications}
        onToggleRead={handleToggleRead}
      />
    </div>
  );
};

export default CollaboratorNotificationsView;
