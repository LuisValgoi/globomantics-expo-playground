import { REACT_APP_FIREBASE_AUTH_DOMAIN } from '@env';
import { REACT_APP_FIREBASE_PROJECT_ID } from '@env';
import { REACT_APP_FIREBASE_MESSAGING_SENDERID } from '@env';
import { REACT_APP_FIREBASE_MEASUREMENT_ID } from '@env';
import { REACT_APP_FIREBASE_APP_ID } from '@env';
import { REACT_APP_FIREBASE_STORAGE_BUCKET } from '@env';
import { REACT_APP_FIREBASE_API_KEY } from '@env';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDERID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

const storage = getStorage(app);

const auth = getAuth(app);

export {
  firestore,
  storage,
  auth
};
