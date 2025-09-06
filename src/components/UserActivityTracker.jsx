import { useEffect } from 'react';

// This component tracks user activity and stores it in localStorage
export function UserActivityTracker() {
  useEffect(() => {
    // Track session start
    const sessionStart = new Date().toISOString();
    const sessionId = Date.now().toString();

    // Store session info
    const sessionData = {
      id: sessionId,
      start: sessionStart,
      lastActivity: sessionStart,
      duration: 0,
      actions: [],
    };

    localStorage.setItem('currentSession', JSON.stringify(sessionData));

    // Track user activity
    const trackActivity = () => {
      const session = localStorage.getItem('currentSession');
      if (session) {
        try {
          const sessionData = JSON.parse(session);
          const now = new Date().toISOString();
          sessionData.lastActivity = now;
          sessionData.duration = new Date(now) - new Date(sessionData.start);
          localStorage.setItem('currentSession', JSON.stringify(sessionData));
        } catch (error) {
          console.error('Error tracking activity:', error);
        }
      }
    };

    // Add activity listeners
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
    ];
    events.forEach(event => {
      document.addEventListener(event, trackActivity, true);
    });

    // Update session end time periodically
    const sessionInterval = setInterval(() => {
      const session = localStorage.getItem('currentSession');
      if (session) {
        try {
          const sessionData = JSON.parse(session);
          const now = new Date().toISOString();
          sessionData.lastActivity = now;
          sessionData.duration =
            (new Date(now) - new Date(sessionData.start)) / 1000; // in seconds
          localStorage.setItem('currentSession', JSON.stringify(sessionData));
        } catch (error) {
          console.error('Error updating session:', error);
        }
      }
    }, 30000); // Update every 30 seconds

    // Clean up
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, trackActivity, true);
      });
      clearInterval(sessionInterval);

      // Save session to history when component unmounts
      const session = localStorage.getItem('currentSession');
      if (session) {
        try {
          const sessionData = JSON.parse(session);
          const now = new Date().toISOString();
          sessionData.end = now;
          sessionData.duration =
            (new Date(now) - new Date(sessionData.start)) / 1000; // in seconds

          // Save to session history
          const sessionHistory = localStorage.getItem('sessionHistory');
          const history = sessionHistory ? JSON.parse(sessionHistory) : [];
          history.push(sessionData);
          localStorage.setItem(
            'sessionHistory',
            JSON.stringify(history.slice(-50))
          ); // Keep last 50 sessions

          // Clear current session
          localStorage.removeItem('currentSession');
        } catch (error) {
          console.error('Error saving session:', error);
        }
      }
    };
  }, []);

  return null; // This component doesn't render anything
}
