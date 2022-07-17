import { getFirestore } from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC-qWb7S1_UEL0NfhiimZsrnM4oJk4AdDo',
  authDomain: 'end-cool-firebase.firebaseapp.com',
  projectId: 'end-cool-firebase',
  storageBucket: 'end-cool-firebase.appspot.com',
  messagingSenderId: '492252592516',
  appId: '1:492252592516:web:7302549bad14988e7345d1',
  measurementId: 'G-P20PTLZ7E2',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
