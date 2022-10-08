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
  DocumentData,
  deleteField,
} from 'firebase/firestore';

import Header from './components/Static/Header';
import Navbar from './components/Static/Navbar';
import Home from './components/Pages/Home';
import Shop from './components/Pages/Shop/Shop';
import Footer from './components/Static/Footer';
import AdminPanel from './components/Admin/AdminPanel';
import PageNotFound from './components/Pages/PageNotFound';
import ProductPage from './components/Pages/Shop/ProductPage';
import WarningModal from './components/WarningModal';

import './App.css';

import {
  ModifiedProduct,
  Product,
} from './components/Interfaces/ProductInterface';
import CartModal from './components/Pages/Shop/CartModal';
import CentralLoadingIcon from './components/CentralLoadingIcon';
import CheckoutPage from './components/Pages/Shop/CheckoutPage';

const App = () => {
  const [getUserInfo, setUserInfo] = useState<User | null>(null);
  const [getProducts, setProducts] = useState<Product[]>();
  const [productsInView, setProductsInView] = useState<Product[] | undefined>(
    getProducts
  );
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);
  const [getAdmins, setAdmins] = useState<string[]>([]);
  const [showWarningMsg, setWarningMsg] = useState<string>('');
  const userPersistence = getAuth().currentUser;
  const [getCartItems, setCartItems] = useState<Product[]>();
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const [getSortBy, setSortBy] = useState<string>('a-z');

  useEffect(() => {
    const fetchProducts = async () => {
      let products = await getDocs(collection(db, 'products'));
      let productsList: Product[] = [];
      products.forEach((product) => {
        productsList.push({ ...product.data() } as Product);
      });
      setProducts(productsList);
    };
    try {
      fetchProducts();
    } catch (e) {
      setWarningMsg('Check your connection and try again.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // FIXME:
  useEffect(() => {
    const sortProductsInView = (): Product[] | null => {
      let result;

      if (getSortBy === 'z-a') {
        result = productsInView?.sort((a: Product, b: Product) => {
          return a.name.toLowerCase() >= b.name.toLowerCase() ? -1 : 1;
        });
      } else if (getSortBy === 'price-l-h') {
        result = productsInView?.sort((a: Product, b: Product) => {
          return a.price >= b.price ? 1 : -1;
        });
      } else if (getSortBy === 'price-h-l') {
        result = productsInView?.sort((a: Product, b: Product) => {
          return a.price >= b.price ? -1 : 1;
        });
      } else {
        result = productsInView?.sort((a: Product, b: Product) => {
          return a.name.toLowerCase() >= b.name.toLowerCase() ? 1 : -1;
        });
      }
      return result || null;
    };
    let result = sortProductsInView();
    setProductsInView(result || undefined);
  });

  useEffect(() => {
    fetchAdmins();
    setUserInfo(userPersistence);
  }, [userPersistence]);

  useEffect(() => {
    fetchCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserInfo]);

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
    try {
      await updateDoc(doc(db, 'products', name), {
        ...modifiedProduct,
      });
    } catch (e) {
      setWarningMsg("Can't update. Check your connection and try again.");
    }
  };

  const deleteProduct = async (id: string): Promise<void> => {
    try {
      const productDoc = doc(db, 'products', id);
      await deleteDoc(productDoc);
    } catch (e) {
      setWarningMsg("Can't update. Check your connection and try again.");
    }
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
        setWarningMsg('Sign in failed. Check your connection and try again.');
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
    try {
      await setDoc(doc(db, 'admins', email), {
        email: email,
      });
    } catch (e) {
      setWarningMsg("Can't update. Check your connection and try again.");
    }
  };

  const removeAdmin = async (email: string) => {
    try {
      const adminDoc = doc(db, 'admins', email);
      await deleteDoc(adminDoc);
    } catch (e) {
      setWarningMsg("Can't update. Check your connection and try again.");
    }
  };

  const fetchCartItems = async () => {
    try {
      const itemsDoc = doc(db, 'cart', `${getUserInfo?.email}`);
      const itemRef = await getDoc(itemsDoc);
      const itemData: DocumentData | undefined = itemRef.data();
      setCartItems(Object.values(itemData ? itemData : {}));
    } catch (e) {
      console.log('Issue fetching cart items.');
    }
  };

  const addNewToCart = async (product: Product): Promise<void> => {
    setShowLoading(true);
    try {
      await updateDoc(doc(db, 'cart', `${getUserInfo?.email}`), {
        [product.name]: { ...product, quantity: 1 },
      });
    } catch (e) {
      setWarningMsg("Can't update. Check your connection and try again.");
    }
    await fetchCartItems();
    setShowLoading(false);
  };

  const modifyCartItem = async (
    product: Product,
    quantity: number
  ): Promise<void> => {
    setShowLoading(true);
    if (quantity === 0) {
      deleteCartItem(product);
    } else {
      try {
        await updateDoc(doc(db, 'cart', `${getUserInfo?.email}`), {
          [product.name]: { ...product, quantity: quantity },
        });
      } catch (e) {
        setWarningMsg("Can't update. Check your connection and try again.");
      }
    }
    await fetchCartItems();
    setShowLoading(false);
  };

  const deleteCartItem = async (product: Product) => {
    try {
      const productDoc = doc(db, 'cart', `${getUserInfo?.email}`);
      await updateDoc(productDoc, {
        [product.name]: deleteField(),
      });
    } catch (e) {
      setWarningMsg("Can't update. Check your connection and try again.");
    }
    fetchCartItems();
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
        setShowCart={setShowCart}
        getCartItems={getCartItems}
      />
      <Navbar getProducts={getProducts} setProductsInView={setProductsInView} />
      <Routes>
        <Route
          path='/shop/:name'
          element={
            <ProductPage
              getProducts={getProducts}
              getUserInfo={getUserInfo}
              setWarningMsg={setWarningMsg}
              addNewToCart={addNewToCart}
              getCartItems={getCartItems}
              modifyCartItem={modifyCartItem}
            />
          }
        />
        <Route
          path='/shop'
          element={
            <Shop
              db={db}
              productsInView={productsInView}
              setProductsInView={setProductsInView}
              getSortBy={getSortBy}
              setSortBy={setSortBy}
            />
          }
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
          getUserInfo={getUserInfo as User}
        />
      )}

      {showCart && (
        <CartModal
          getCartItems={getCartItems}
          setCartItems={setCartItems}
          setShowCart={setShowCart}
          modifyCartItem={modifyCartItem}
          setShowCheckout={setShowCheckout}
        />
      )}

      {showCheckout && (
        <CheckoutPage
          getCartItems={getCartItems}
          setShowCheckout={setShowCheckout}
        />
      )}

      {showLoading && <CentralLoadingIcon />}

      {showWarningMsg && (
        <WarningModal msg={showWarningMsg} setMsg={setWarningMsg} />
      )}
    </BrowserRouter>
  );
};

export default App;
