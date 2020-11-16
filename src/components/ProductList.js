import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

const ProductList = ({ productCategoryData, isLoading, setIsLoading }) => {
  const [data, setData] = useState([]);

  const createList = () => {
    const products = productCategoryData.map((product) => (
      <tr key={product.id}>
        <td style={{ textAlign: 'left' }}>{product.name}</td>
        <td>{product.color.join(', ')}</td>
        <td>{product.manufacturer}</td>
        <td>{product.price}</td>
        <td>{product.DATAPAYLOAD}</td>
      </tr>
    ));
    setData(products);
    setIsLoading(false);
  };

  useEffect(() => {
    createList();
  }, [productCategoryData]);

  return (
    <div style={{ width: '100%' }}>
      {isLoading ? (
        <div>
          <Spinner
            animation="border"
            style={{ width: '10rem', height: '10rem' }}
          />
          <h4 style={{ marginTop: '1rem' }}>
            Creating List...
          </h4>
        </div>
      )
        : (
          <Table responsive size="sm">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Product name</th>
                <th>Available colors</th>
                <th>Manufacturer</th>
                <th>Price</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>{data}</tbody>
          </Table>
        )}
    </div>

  );
};

ProductList.propTypes = {
  productCategoryData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.arrayOf(PropTypes.string).isRequired,
    manufacturer: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    DATAPAYLOAD: PropTypes.string.isRequired,
  })).isRequired,
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default ProductList;
