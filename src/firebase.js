import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: 'AIzaSyDyF52x_PkBc9GJbKLUxNdS0qqgKQMJO9c',
    authDomain: 'ecommerce-d2414.firebaseapp.com',
    projectId: 'ecommerce-d2414',
    storageBucket: 'ecommerce-d2414.appspot.com',
    messagingSenderId: '835369236333',
    appId: '1:835369236333:web:75211eaa6ec0ac98a78c64',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
