import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect, useRef } from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import ProductList from './components/ProductList';
import fetchProducts from './api';

const fetchTimeInterval = 300000;
const ProductTypes = {
  JACKETS: 'Jackets',
  SHIRTS: 'Shirts',
  ACCESSORIES: 'Accessories',
  GLOVES: 'Gloves',
  FACEMASKS: 'Facemasks',
  BEANIES: 'Beanies',
  DEFAULT: 'Gloves',
};

const App = () => {
  const [isFetchingList, setIsFetchingList] = useState(true);
  const [isCreatingList, setIsCreatingList] = useState(true);
  const [allProductData, setAllProductData] = useState([]);
  const [showError, setShowError] = useState(false);
  const [errorInfo, setErrorInfo] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(ProductTypes.DEFAULT);
  const successRef = useRef(false);

  const handleFetchResults = (result) => {
    // console.log(result);
    setAllProductData(result);
    setIsFetchingList(false);
    setShowError(false);
    successRef.current = true;
  };

  const handleFetchErrors = (err) => {
    // console.log(err);
    if (!successRef.current) {
      setErrorInfo(err.message);
      setShowError(true);
      setIsFetchingList(false);
    }
  };

  const request = () => fetchProducts(['gloves', 'facemasks', 'beanies'])
    .then(handleFetchResults)
    .catch(handleFetchErrors);

  useEffect(() => {
    request();
    setInterval(() => {
      request();
    }, fetchTimeInterval);
  }, []);

  const handleProductChange = (type) => {
    if (selectedCategory !== type) {
      setIsCreatingList(true);
      setSelectedCategory(type);
    }
  };

  const NavigationBar = () => (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>Bad-Api</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Nav className="mr-auto">
        <Nav.Link onClick={() => handleProductChange(ProductTypes.GLOVES)}>
          {ProductTypes.GLOVES}
        </Nav.Link>
        <Nav.Link onClick={() => handleProductChange(ProductTypes.FACEMASKS)}>
          {ProductTypes.FACEMASKS}
        </Nav.Link>
        <Nav.Link onClick={() => handleProductChange(ProductTypes.BEANIES)}>
          {ProductTypes.BEANIES}
        </Nav.Link>
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

  const reload = () => {
    setShowError(false);
    setIsFetchingList(true);
    setIsCreatingList(true);
    request();
  };

  const ErrorInfo = () => (
    <div className="content_center_screen align-text-left">
      <h1>Oops! Something went wrong.</h1>
      <p>{'Error: '.concat(errorInfo)}</p>
      <p>
        The API has a built-in intentional failure casewhich might be causing these.
      </p>
      <p>
        If the message shows Network Error, disable CORS policy on browser since the server
        does not have cross-origin header set yet.
      </p>
      <Button variant="primary" onClick={reload}>Try Again</Button>
    </div>
  );

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
