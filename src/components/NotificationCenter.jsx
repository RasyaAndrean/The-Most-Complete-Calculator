import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { UserNotifications } from './UserNotifications';

export function NotificationCenter() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  // Load notifications from localStorage
  useEffect(() => {
    const loadNotifications = () => {
      try {
        const savedNotifications = localStorage.getItem('userNotifications');
        if (savedNotifications) {
          const parsedNotifications = JSON.parse(savedNotifications);
          setNotifications(parsedNotifications);
          setUnreadCount(parsedNotifications.filter(n => !n.read).length);
        }
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    };

    loadNotifications();
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userNotifications', JSON.stringify(notifications));
  }, [notifications]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    setUnreadCount(unreadCount - 1);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    setUnreadCount(0);
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
    localStorage.removeItem('userNotifications');
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'info': return 'ℹ️';
      case 'challenge': return '🎯';
      case 'achievement': return '🏅';
      case 'level': return '🏆';
      case 'streak': return '🔥';
      default: return '🔔';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'info': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'challenge': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'achievement': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'level': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'streak': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return language === 'id' ? 'baru saja' : 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes} ${language === 'id' ? 'menit' : 'minutes'} ${language === 'id' ? 'yang lalu' : 'ago'}`;
    if (diffInHours < 24) return `${diffInHours} ${language === 'id' ? 'jam' : 'hours'} ${language === 'id' ? 'yang lalu' : 'ago'}`;
    return `${diffInDays} ${language === 'id' ? 'hari' : 'days'} ${language === 'id' ? 'yang lalu' : 'ago'}`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <svg
          className="w-5 h-5 text-gray-700 dark:text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {language === 'id' ? 'Notifikasi' : 'Notifications'}
              </h3>
              <div className="flex space-x-2">
                {notifications.length > 0 && (
                  <>
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {language === 'id' ? 'Tandai semua dibaca' : 'Mark all as read'}
                    </button>
                    <button
                      onClick={clearAll}
                      className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      {language === 'id' ? 'Hapus semua' : 'Clear all'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                {language === 'id' ? 'Tidak ada notifikasi' : 'No notifications'}
              </div>
            ) : (
              <ul>
                {[...notifications].reverse().map((notification) => (
                  <li
                    key={notification.id}
                    className={`border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                      notification.read ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-blue-900/20'
                    }`}
                  >
                    <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <div className="flex items-start">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getTypeColor(notification.type)}`}>
                          {getTypeIcon(notification.type)}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {notification.message}
                          </p>
                          <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <span>{formatTimeAgo(notification.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                      {!notification.read && (
                        <div className="mt-2 flex justify-end">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                            className="text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            {language === 'id' ? 'Tandai dibaca' : 'Mark as read'}
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
              <button
                onClick={clearAll}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {language === 'id' ? 'Hapus semua notifikasi' : 'Clear all notifications'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}