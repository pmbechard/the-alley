import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
  authDomain: 'the-alley-shop.firebaseapp.com',
  projectId: 'the-alley-shop',
  storageBucket: 'the-alley-shop.appspot.com',
  messagingSenderId: '44610786686',
  appId: '1:44610786686:web:8fb39f21db2610cbb64f2f',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
