import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { db } from './firebase/firebase-config';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  signOut,
  setPersistence,
  browserSessionPersistence,
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
import Shop from './components/Pages/Shop/Shop';
import Footer from './components/Static/Footer';

import './App.css';
import {
  ModifiedProduct,
  Product,
} from './components/Interfaces/ProductInterface';
import AdminPanel from './components/Admin/AdminPanel';
import PageNotFound from './components/Pages/PageNotFound';
import ProductPage from './components/Pages/Shop/ProductPage';
import WarningModal from './components/WarningModal';

const App = () => {
  const [getUserInfo, setUserInfo] = useState<User | null>(null);
  const [getProducts, setProducts] = useState<Product[]>();
  const [productsInView, setProductsInView] = useState<Product[]>();
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);
  const [getAdmins, setAdmins] = useState<string[]>([]);
  const userPersistence = getAuth().currentUser;
  const [showWarningMsg, setWarningMsg] = useState<string>('');

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
    setProductsInView(getProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setUserInfo(userPersistence);
  }, [userPersistence]);

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
      setWarningMsg("Product couldn't be added to database.");
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
    const auth = getAuth();

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider).then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          // const credential = GoogleAuthProvider.credentialFromResult(result);
          // let token;
          // if (credential) {
          //   token = credential.accessToken;
          // }
          // The signed-in user info.
          const user = result.user;
          setUserInfo(user);
        });
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        setUserInfo(null);
        setWarningMsg('Sign in failed.');
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

  const addAdmin = async (email: string) => {
    await setDoc(doc(db, 'admins', email), {
      email: email,
    });
  };

  const removeAdmin = async (email: string) => {
    const adminDoc = doc(db, 'admins', email);
    await deleteDoc(adminDoc);
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
        getProducts={getProducts}
        setProductsInView={setProductsInView}
      />
      <Navbar getProducts={getProducts} setProductsInView={setProductsInView} />
      <Routes>
        <Route
          path='/shop/:name'
          element={<ProductPage getProducts={getProducts} />}
        />
        <Route
          path='/shop'
          element={<Shop db={db} products={productsInView || getProducts} />}
        />
        <Route path='*' element={<PageNotFound />} />
        <Route
          path='/'
          element={
            <Home
              getProducts={getProducts}
              setProductsInView={setProductsInView}
            />
          }
        />
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
          getAdmins={getAdmins}
          addAdmin={addAdmin}
          removeAdmin={removeAdmin}
          setWarningMsg={setWarningMsg}
        />
      )}

      {showWarningMsg && (
        <WarningModal msg={showWarningMsg} setMsg={setWarningMsg} />
      )}
    </BrowserRouter>
  );
};

export default App;
