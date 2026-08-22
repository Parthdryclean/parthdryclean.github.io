// firebase-messaging-sw.js (v1.0)
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

  const notification = payload.notification;
  const data = payload.data || {};

  const title = notification?.title || data?.title || 'Parth Dry Clean';
  const body = notification?.body || data?.body || 'Live order update';

  const options = {
    body: body,
    icon: '/assets/icon-192.png',
    badge: '/assets/icon-192.png',
    data: data,
    tag: data?.orderId || 'parth-dc-notification',
    renotify: true,
    requireInteraction: data?.requireInteraction === 'true',
    actions: data?.actions ? JSON.parse(data.actions) : []
  };

  self.registration.showNotification(title, options);
});

// Optional: Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const data = event.notification.data || {};
  let url = '/';

  if (data.orderId) {
    url = `/index.html#active-orders`;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if ('focus' in client && client.url.includes(url)) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});