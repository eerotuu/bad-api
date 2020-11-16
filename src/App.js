import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
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
  const [selectedCategory, setSelectedCategory] = useState(ProductTypes.DEFAULT);

  const handleFetchCallback = (result) => {
    setAllProductData(result);
    setIsFetchingList(false);
  };

  useEffect(() => {
    fetchProducts(handleFetchCallback);
    setInterval(() => {
      fetchProducts(handleFetchCallback);
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
    <div>
      <Spinner
        animation="border"
        style={{ width: '10rem', height: '10rem' }}
      />
      <h4 style={{ marginTop: '1rem' }}>Finding Products...</h4>
    </div>
  );

  return (
    <div className="App">
      <NavigationBar />
      <Container>
        <Row className="justify-content-center" style={{ margin: '1rem' }}>
          <h1>{selectedCategory}</h1>
        </Row>

        <Row className="justify-content-center">
          {isFetchingList
            ? (<LoadingInfo />)
            : (
              <ProductList
                productCategoryData={allProductData[selectedCategory.toLowerCase()]}
                isLoading={isCreatingList}
                setIsLoading={setIsCreatingList}
              />
            )}
        </Row>
      </Container>
    </div>
  );
};

export default App;
