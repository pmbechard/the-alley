import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { db } from './firebase/firebase-config';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  signOut,
} from 'firebase/auth';
import {
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

import Header from './components/Static/Header';
import Navbar from './components/Static/Navbar';
import Home from './components/Pages/Home';
import Shop from './components/Pages/Shop';
import Footer from './components/Static/Footer';

import './App.css';
import {
  ModifiedProduct,
  Product,
} from './components/Interfaces/ProductInterface';
import AdminPanel from './components/Admin/AdminPanel';

const App = () => {
  const [getUserInfo, setUserInfo] = useState<User | null>(null);
  const [getProducts, setProducts] = useState<Product[]>();
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);
  const [getAdmins, setAdmins] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      let products = await getDocs(collection(db, 'products'));
      let productsList: Product[] = [];
      products.forEach((product) => {
        productsList.push({ ...product.data() } as Product);
      });
      setProducts(productsList);
    };
    fetchProducts();
  }, []);

  const addProductToFirebase = async (product: Product): Promise<void> => {
    try {
      await setDoc(doc(db, 'products', product.name), {
        name: product.name,
        price: product.price,
        description: product.description,
        img: product.img,
        tags: product.tags,
      });
    } catch (e) {
      console.log(e);
    }
    // TODO: Add Error/Success message on page
  };

  const getProductByName = async (name: string): Promise<Product | null> => {
    if (!name) return null;
    const docRef = doc(db, 'products', name);
    const docSnap = await getDoc(docRef);
    return { ...(docSnap.data() as Product) };
  };

  const updateProduct = async (
    modifiedProduct: ModifiedProduct,
    name: string
  ) => {
    await updateDoc(doc(db, 'products', name), {
      ...modifiedProduct,
    });
  };

  const deleteProduct = async (id: string): Promise<void> => {
    const productDoc = doc(db, 'products', id);
    await deleteDoc(productDoc);
  };

  const signIn = async () => {
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
    await fetchAdmins();
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

  const fetchAdmins = async () => {
    let admins = await getDocs(collection(db, 'admins'));
    let adminList: string[] = [];
    admins.forEach((admin) => {
      adminList.push(`${admin.data().email}`);
    });
    setAdmins(adminList);
  };

  return (
    <BrowserRouter>
      <Header
        signIn={signIn}
        signUserOut={signUserOut}
        getUserInfo={getUserInfo}
        showAdminPanel={showAdminPanel}
        setShowAdminPanel={setShowAdminPanel}
        getAdmins={getAdmins}
      />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop db={db} products={getProducts} />} />
      </Routes>
      <Footer />
      {showAdminPanel && (
        <AdminPanel
          setShowAdminPanel={setShowAdminPanel}
          addProductToFirebase={addProductToFirebase}
          getProducts={getProducts}
          setProducts={setProducts}
          getProductByName={getProductByName}
          updateProduct={updateProduct}
          deleteProduct={deleteProduct}
        />
      )}
    </BrowserRouter>
  );
};

export default App;
