import {getApp, getApps, initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDRBwVazTTLDaveOTxlW-ZTI3EV2inPAGs",
    authDomain: "food-199a3.firebaseapp.com",
    projectId: "food-199a3",
    storageBucket: "food-199a3.appspot.com",
    messagingSenderId: "318133090273",
    appId: "1:318133090273:web:ee0c74eb647511f01d84a0"
  };
  
  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

  const firebaseAuth = getAuth(app);
  const firestoreDB = getFirestore(app);

  export {app, firebaseAuth, firestoreDB};