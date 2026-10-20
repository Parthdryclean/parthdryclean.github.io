// firebase-messaging-sw.js (v2.0)
// Service Worker for Parth Dry Clean - Background Push Notifications

importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCmVME9gp1a-jI_82knnJ-ZIkFZvTLzp2w",
  authDomain: "parth-dry-clean.firebaseapp.com",
  databaseURL: "https://parth-dry-clean-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "parth-dry-clean",
  storageBucket: "parth-dry-clean.firebasestorage.app",
  messagingSenderId: "673481985335",
  appId: "1:673481985335:web:eb4194b4860cf979b21eb2"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Background notification handler
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Background message received:', payload);

  // If the browser already displays the standard notification payload, avoid duplicate popups
  if (payload && payload.notification && payload.notification.title) {
    return;
  }

  const data = (payload && payload.data) || {};
  const title = data.title || 'Parth Dry Clean';
  const body = data.body || 'Live order update';

  let parsedActions = [];
  if (data.actions) {
    try { parsedActions = JSON.parse(data.actions); } catch (e) { parsedActions = []; }
  }

  const options = {
    body: body,
    icon: '/assets/icon-192.png',
    badge: '/assets/icon-192.png',
    data: data,
    tag: data.orderId || data.eventId || 'parth-dc-notification',
    renotify: true,
    requireInteraction: data.requireInteraction === 'true',
    actions: Array.isArray(parsedActions) ? parsedActions : []
  };

  return self.registration.showNotification(title, options);
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const data = event.notification.data || {};
  const targetUrl = data.targetUrl || (data.orderId ? '/#active-orders' : '/');

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if ('focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});
