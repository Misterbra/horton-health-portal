import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, BellOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Type definitions
interface NotificationOptions {
  body?: string;
  icon?: string;
  badge?: string;
  image?: string;
  tag?: string;
  data?: any;
  requireInteraction?: boolean;
  renotify?: boolean;
  silent?: boolean;
  timestamp?: number;
}

interface Reminder {
  id: string;
  time: Date;
  message: string;
  type: 'medication' | 'appointment' | 'general';
}

interface NotificationsSystemProps {
  onPermissionChange?: (permission: NotificationPermission) => void;
}

const NotificationsSystem: React.FC<NotificationsSystemProps> = ({ onPermissionChange }) => {
  const [notifications, setNotifications] = useState<Reminder[]>([]);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState<boolean>(false);

  useEffect(() => {
    // Vérifier si les notifications sont supportées
    if ('Notification' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!isSupported) {
      console.error("Les notifications ne sont pas supportées");
      return;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      onPermissionChange?.(result);

      if (result === 'granted') {
        console.log("Notifications activées");
      } else {
        console.log("Notifications refusées");
      }
    } catch (error) {
      console.error('Erreur lors de la demande de permission:', error);
    }
  };

  const scheduleNotification = (
    title: string,
    options: NotificationOptions = {}
  ): Notification | null => {
    if (!isSupported || permission !== 'granted') {
      return null;
    }

    try {
      const notification = new Notification(title, {
        icon: '/notification-icon.png',
        badge: '/notification-badge.png',
        requireInteraction: false,
        ...options,
      });

      notification.onclick = function() {
        window.focus();
        notification.close();
      };

      return notification;
    } catch (error) {
      console.error('Erreur lors de la création de la notification:', error);
      return null;
    }
  };

  const scheduleReminder = (reminder: Reminder) => {
    const now = new Date().getTime();
    const scheduleTime = reminder.time.getTime();
    
    if (scheduleTime <= now) {
      console.warn('La date du rappel est dans le passé');
      return;
    }

    setNotifications(prev => [...prev, reminder]);

    // Programmer la notification
    const timeoutId = setTimeout(() => {
      const notificationOptions: NotificationOptions = {
        body: reminder.message,
        icon: '/icon.png',
        tag: reminder.id,
        requireInteraction: true,
        data: { type: reminder.type, id: reminder.id }
      };

      switch (reminder.type) {
        case 'medication':
          notificationOptions.badge = '/medication-badge.png';
          break;
        case 'appointment':
          notificationOptions.badge = '/appointment-badge.png';
          break;
        default:
          notificationOptions.badge = '/notification-badge.png';
      }

      const notification = scheduleNotification(
        'Rappel Maladie de Horton',
        notificationOptions
      );

      if (notification) {
        // Supprimer le rappel une fois qu'il a été déclenché
        setNotifications(prev => 
          prev.filter(n => n.id !== reminder.id)
        );
      }
    }, scheduleTime - now);

    // Stocker l'ID du timeout pour pouvoir l'annuler plus tard si nécessaire
    return timeoutId;
  };

  const cancelReminder = (reminderId: string): void => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== reminderId)
    );
  };

  return (
    <div className="fixed bottom-4 right-4 space-y-4">
      {!isSupported && (
        <Alert variant="destructive">
          <AlertDescription>
            Votre navigateur ne supporte pas les notifications.
          </AlertDescription>
        </Alert>
      )}
      
      {isSupported && permission === 'default' && (
        <Button 
          onClick={requestPermission}
          className="flex items-center gap-2"
        >
          <Bell className="h-4 w-4" />
          Activer les notifications
        </Button>
      )}

      {isSupported && permission === 'denied' && (
        <Alert>
          <BellOff className="h-4 w-4" />
          <AlertDescription>
            Les notifications sont désactivées. Modifiez les paramètres de votre navigateur pour les activer.
          </AlertDescription>
        </Alert>
      )}

      {notifications.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium mb-2">Rappels programmés</h3>
          <ul className="space-y-2">
            {notifications.map(notification => (
              <li 
                key={notification.id}
                className="flex items-center justify-between text-sm"
              >
                <span>{notification.message}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => cancelReminder(notification.id)}
                >
                  Annuler
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationsSystem;