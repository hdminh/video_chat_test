import firebase from '../components/Firebase/index';

// init firebase cloud message
const messaging = firebase.messaging();
messaging.requestPermission().then(() => {
    return messaging.getToken();
}).then(token => {
    localStorage.setItem("firebaseToken", token);
}).catch((error) => {
    console.log("Get firebase token error", error);
})