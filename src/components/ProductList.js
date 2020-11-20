/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';

const ProductList = ({
  productType, productCategoryData, isLoading, setIsLoading,
}) => {
  const [tableRows, setTableRows] = useState([]);

  const createList = () => {
    const rows = productCategoryData.map((product) => (
      <tr key={product.id}>
        <td style={{ textAlign: 'left' }}>{product.name}</td>
        <td>{product.color.join(', ')}</td>
        <td>{product.manufacturer}</td>
        <td>{product.price}</td>
        <td>{product.DATAPAYLOAD}</td>
      </tr>
    ));
    setTableRows(rows);
    setIsLoading(false);
  };

  useEffect(() => {
    createList();
  }, [productCategoryData]);

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
    </div>
  );

  const ProductTable = () => (
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
      <tbody>{tableRows}</tbody>
    </Table>
  );

  return (
    <div style={{ width: '100%' }}>
      <Row className="justify-content-center" style={{ margin: '1rem' }}>
        <h1>{productType}</h1>
      </Row>
      {isLoading ? (<LoadingInfo />) : (<ProductTable />)}
    </div>
  );
};

ProductList.propTypes = {
  productType: PropTypes.string.isRequired,
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
