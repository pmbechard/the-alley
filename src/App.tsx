import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { firebaseConfig } from './firebase/firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import Navbar from './components/Navbar';
import Home from './components/Pages/Home';
import Shop from './components/Pages/Shop';

import './App.css';

const App = () => {
  initializeApp(firebaseConfig);

  const signIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        let token;
        if (credential) {
          token = credential.accessToken;
        }
        // The signed-in user info.
        const user = result.user;
        // ...

        console.log(token, user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  return (
    <BrowserRouter>
      <Navbar signIn={signIn} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
