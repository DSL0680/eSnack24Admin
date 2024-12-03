importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);


const firebaseConfig = {
    apiKey: "AIzaSyChFf6OwYtCwl_vX0Wzw5sSXISqdRfBc1A",
    authDomain: "esnack24-e3428.firebaseapp.com",
    projectId: "esnack24-e3428",
    storageBucket: "esnack24-e3428.firebasestorage.app",
    messagingSenderId: "271796527189",
    appId: "1:271796527189:web:fac8921ec0fd74e79574dc",
    measurementId: "G-T42R2J0262"
};


firebase.initializeApp(firebaseConfig);


// Retrieve firebase messaging
const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };


    self.registration.showNotification(notificationTitle, notificationOptions);
});













