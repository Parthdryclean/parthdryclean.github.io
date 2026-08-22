importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCmVME9gp1a-jI_82knnJ-ZIkFZvTLzp2w",
  authDomain: "parth-dry-clean.firebaseapp.com",
  databaseURL: "https://parth-dry-clean-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "parth-dry-clean",
  storageBucket: "parth-dry-clean.firebasestorage.app",
  messagingSenderId: "673481985335",
  appId: "1:673481985335:web:eb4194b4860cf979b21eb2"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || 'Parth Dry Clean';
  const notificationOptions = {
    body: payload.notification?.body || 'Your order status has been updated.',
    icon: '/assets/icon-192.png',
    badge: '/assets/icon-192.png',
    data: payload.data || {}
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || '/index.html';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url.includes(urlToOpen) && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(urlToOpen);
    })
  );
});