importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-messaging.js');

// import config from '../src/config/config.json';
var config = {
    apiKey: "AIzaSyCKnVf-0iTWFpynTkh_rgArcvMdO0Qyf68",
    authDomain: "final-project-togethers-app.firebaseapp.com",
    databaseURL: "https://final-project-togethers-app.firebaseio.com",
    projectId: "final-project-togethers-app",
    storageBucket: "final-project-togethers-app.appspot.com",
    messagingSenderId: "820850153235",
    appId: "1:820850153235:web:ece10e7e97de73d046ece6",
    measurementId: "G-R14TF84D1H"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    // const notificationTitle = 'Đã tìm thầy người match.';
    // const notificationOptions = {
    //   body: 'matched',
    //   icon: '/firebase-logo.png'
    // };
  
    // self.registration.showNotification(notificationTitle,
    //   notificationOptions);
});