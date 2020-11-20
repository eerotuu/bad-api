import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Spinner from 'react-bootstrap/Spinner';
import ProductList from './components/ProductList';
import fetchProducts from './api';

const fetchTimeInterval = 300000;
const ProductTypes = {
  JACKETS: 'Jackets',
  SHIRTS: 'Shirts',
  ACCESSORIES: 'Accessories',
  DEFAULT: 'Jackets',
};

const App = () => {
  const [isFetchingList, setIsFetchingList] = useState(true);
  const [isCreatingList, setIsCreatingList] = useState(true);
  const [allProductData, setAllProductData] = useState([]);
  const [showError, setShowError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(ProductTypes.DEFAULT);

  const handleFetchCallback = (result) => {
    setAllProductData(result);
    setIsFetchingList(false);
  };

  const handleFetchError = () => {
    setShowError(true);
    setIsFetchingList(false);
  };

  const request = () => fetchProducts()
    .then((result) => handleFetchCallback(result))
    .catch(() => handleFetchError());

  useEffect(() => {
    request();
    setInterval(() => {
      request();
    }, fetchTimeInterval);
  }, []);

  const handleJacketClick = () => {
    if (selectedCategory !== ProductTypes.JACKETS) {
      setIsCreatingList(true);
      setSelectedCategory(ProductTypes.JACKETS);
    }
  };

  const handleShirtClick = () => {
    if (selectedCategory !== ProductTypes.SHIRTS) {
      setIsCreatingList(true);
      setSelectedCategory(ProductTypes.SHIRTS);
    }
  };

  const handleAccessoriesClick = () => {
    if (selectedCategory !== ProductTypes.ACCESSORIES) {
      setIsCreatingList(true);
      setSelectedCategory(ProductTypes.ACCESSORIES);
    }
  };

  const NavigationBar = () => (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Bad-Api</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link onClick={handleJacketClick}>{ProductTypes.JACKETS}</Nav.Link>
        <Nav.Link onClick={handleShirtClick}>{ProductTypes.SHIRTS}</Nav.Link>
        <Nav.Link onClick={handleAccessoriesClick}>{ProductTypes.ACCESSORIES}</Nav.Link>
      </Nav>
    </Navbar>
  );

  const LoadingInfo = () => (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    }}
    >
      <Spinner
        animation="border"
        style={{ width: '10rem', height: '10rem' }}
      />
      <h4 style={{ marginTop: '1rem' }}>Finding Products...</h4>
    </div>
  );

  const ComponentHandler = () => {
    if (showError) return <div>error</div>;
    if (isFetchingList) return <LoadingInfo />;
    return (
      <ProductList
        productType={selectedCategory}
        productCategoryData={allProductData[selectedCategory.toLowerCase()]}
        isLoading={isCreatingList}
        setIsLoading={setIsCreatingList}
      />
    );
  };

  return (
    <div className="App">
      <NavigationBar />
      <Container>
        <ComponentHandler />
      </Container>
    </div>
  );
};

export default App;
