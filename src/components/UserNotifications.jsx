import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserNotifications() {
  const { language } = useLanguage();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Load notifications from localStorage
    const loadNotifications = () => {
      try {
        const savedNotifications = localStorage.getItem('userNotifications');
        if (savedNotifications) {
          const parsedNotifications = JSON.parse(savedNotifications);
          setNotifications(parsedNotifications);
          setUnreadCount(parsedNotifications.filter(n => !n.read).length);
        } else {
          // Create some initial notifications
          const initialNotifications = [
            {
              id: 1,
              title: language === 'id' ? 'Selamat Datang!' : 'Welcome!',
              message: language === 'id' 
                ? 'Terima kasih telah menggunakan Kalkulator Terlengkap. Mulai dengan menjelajahi berbagai kalkulator yang tersedia.' 
                : 'Thank you for using the Complete Calculator. Start by exploring the various calculators available.',
              timestamp: new Date().toISOString(),
              read: false,
              type: 'info'
            },
            {
              id: 2,
              title: language === 'id' ? 'Tantangan Baru' : 'New Challenge',
              message: language === 'id' 
                ? 'Anda memiliki tantangan baru: Lakukan 5 perhitungan menggunakan berbagai kalkulator.' 
                : 'You have a new challenge: Perform 5 calculations using various calculators.',
              timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
              read: false,
              type: 'challenge'
            }
          ];
          setNotifications(initialNotifications);
          setUnreadCount(initialNotifications.length);
          localStorage.setItem('userNotifications', JSON.stringify(initialNotifications));
        }
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    };

    loadNotifications();
  }, [language]);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userNotifications', JSON.stringify(notifications));
  }, [notifications]);

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

  const addNotification = (title, message, type = 'info') => {
    const newNotification = {
      id: Date.now(),
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      type
    };
    
    setNotifications([newNotification, ...notifications]);
    setUnreadCount(unreadCount + 1);
  };

  // Function to add achievement notifications
  const addAchievementNotification = (achievementTitle) => {
    addNotification(
      language === 'id' ? 'Pencapaian Baru!' : 'New Achievement!',
      `${language === 'id' ? 'Anda telah membuka' : 'You have unlocked'}: ${achievementTitle}`,
      'achievement'
    );
  };

  // Function to add level up notifications
  const addLevelUpNotification = (level) => {
    addNotification(
      language === 'id' ? 'Naik Level!' : 'Level Up!',
      `${language === 'id' ? 'Selamat! Anda sekarang berada di level' : 'Congratulations! You are now at level'} ${level}`,
      'level'
    );
  };

  // Function to add streak notifications
  const addStreakNotification = (streak) => {
    addNotification(
      language === 'id' ? 'Rangkaian Harian!' : 'Daily Streak!',
      `${language === 'id' ? 'Hebat! Anda telah mencapai' : 'Great! You have reached'} ${streak} ${language === 'id' ? 'hari berturut-turut' : 'consecutive days'}!`,
      'streak'
    );
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

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearAll,
    addNotification,
    addAchievementNotification,
    addLevelUpNotification,
    addStreakNotification
  };
}