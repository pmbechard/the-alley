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
import { collection, getFirestore, getDocs } from 'firebase/firestore';

import Header from './components/Static/Header';
import Navbar from './components/Static/Navbar';
import Home from './components/Pages/Home';
import Shop from './components/Pages/Shop';
import Footer from './components/Static/Footer';

import './App.css';
import { Product } from './components/Interfaces/ProductInterface';
import AdminPanel from './components/Admin/AdminPanel';

const App = () => {
  const [getUserInfo, setUserInfo] = useState<User | null>(null);
  const [getProducts, setProducts] = useState<Product[]>();
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    fetchProducts();
  });

  const fetchProducts = async () => {
    let products = await getDocs(collection(db, 'products'));
    let productsList: Product[] = [];
    products.forEach((product) => {
      let id = product.id;
      productsList.push({ id, ...product.data() } as Product);
    });
    setProducts(productsList);
  };

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
        showAdminPanel={showAdminPanel}
        setShowAdminPanel={setShowAdminPanel}
      />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop db={db} products={getProducts} />} />
      </Routes>
      <Footer />
      {showAdminPanel && <AdminPanel />}
    </BrowserRouter>
  );
};

export default App;
