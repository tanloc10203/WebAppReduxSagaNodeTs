import { getFirestore } from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCZqYLBkIf0mEzqj2kAsu5eGS0AjQtkDmA',
  authDomain: 'endcool-f4ef7.firebaseapp.com',
  projectId: 'endcool-f4ef7',
  storageBucket: 'endcool-f4ef7.appspot.com',
  messagingSenderId: '291167480402',
  appId: '1:291167480402:web:05d99ef6ab163a96704d8b',
  measurementId: 'G-V1V7EP3YNP',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
