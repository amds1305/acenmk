
// This file now re-exports from the new modular structure
// for backward compatibility
import { 
  AdminNotificationProvider, 
  useAdminNotification, 
  NotificationType,
  SaveStatus,
  AdminNotificationContextType
} from './admin-notification';

export { 
  AdminNotificationProvider, 
  useAdminNotification 
};

export type { 
  NotificationType,
  SaveStatus,
  AdminNotificationContextType
};
