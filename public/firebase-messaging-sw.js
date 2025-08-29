importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAmVoqH24BbYB83Sq6YdzN9151fhflobEw",
  authDomain: "richlist-1a67e.firebaseapp.com",
  projectId: "richlist-1a67e",
  storageBucket: "richlist-1a67e.appspot.com",
  messagingSenderId: "758330518705",
  appId: "1:758330518705:web:6f10e52b92ecdfcfb94690",
  measurementId: "G-F1YNR4YQ4S",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./png/richlist.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
