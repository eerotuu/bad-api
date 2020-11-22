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
    // console.log(result);
    setAllProductData(result);
    setIsFetchingList(false);
  };

  // eslint-disable-next-line no-unused-vars
  const handleFetchError = (err) => {
    // console.log(err);
    setShowError(true);
    setIsFetchingList(false);
  };

  const request = () => fetchProducts(['jackets', 'shirts', 'accessories'])
    .then((result) => handleFetchCallback(result))
    .catch((err) => handleFetchError(err));

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
    <div className="content_center_screen">
      <Spinner
        animation="border"
        style={{ width: '10rem', height: '10rem' }}
      />
      <h4 style={{ marginTop: '1rem' }}>Finding Products...</h4>
    </div>
  );

  const ErrorInfo = () => {
    const info = "This page didn't load product data correctly, please try again.";
    return (
      <div className="content_center_screen">
        <h1>Oops! Something went wrong.</h1>
        <p>{info}</p>
        <p>The API has a built-in intentional failure case which might be causing these.</p>
      </div>
    );
  };

  const ComponentHandler = () => {
    if (showError) return <ErrorInfo />;
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
