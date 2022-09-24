import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { firebaseConfig } from './firebase/firebase-config';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  signOut,
} from 'firebase/auth';

import Header from './components/Header';
import Home from './components/Pages/Home';
import Shop from './components/Pages/Shop';

import './App.css';

const App = () => {
  const [getUserInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    initializeApp(firebaseConfig);
  }, []);

  const signIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // let token;
        // if (credential) {
        //   token = credential.accessToken;
        // }
        // The signed-in user info.
        const user = result.user;
        setUserInfo(user);
      })
      .catch((error) => {
        console.log(error);
        setUserInfo(null);
      });
  };

  const signUserOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUserInfo(null);
      })
      .catch((error) => {
        setUserInfo(null);
      });
  };

  return (
    <BrowserRouter>
      <Header
        signIn={signIn}
        signUserOut={signUserOut}
        getUserInfo={getUserInfo}
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
