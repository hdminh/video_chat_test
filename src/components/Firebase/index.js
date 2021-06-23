import firebase from 'firebase/app';
import config from '../../config/config.json';
import 'firebase/auth';
import 'firebase/firebase-messaging';

if (!firebase.apps.length) {
  firebase.initializeApp(config.firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default firebase;
