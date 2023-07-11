import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Header from './components/Header/Header';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Welcome from './components/Welcome/Welcome';
import CartModal from "./components/CartModal/CartModal"
import { CartProvider } from './context/CartContext';
import Footer from "./components/Footer/Footer"
import { Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import * as amplitude from '@amplitude/analytics-browser';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", background: "black" }}>
          <Spinner animation="border" variant="light" size="lg" />
        </div>
      ) : (
        <CartProvider>
          <Header />
          <ItemListContainer />
          <CartModal />
          <Footer />
        </CartProvider>
      )}
    </>
  );
}

export default App;
