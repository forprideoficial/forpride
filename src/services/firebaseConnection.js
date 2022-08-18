import { initializeApp} from 'firebase/app';
import { getStorage } from 'firebase/storage';
import 'firebase/compat/firestore';

let firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_APPID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_PROJECTID,
  appId: process.env.REACT_APP_FIREBASE_APPID
  };
  
// Use this to initialize the firebase App
const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);