import React, { useEffect } from 'react';
import logo from './stackline_logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { requestUsers } from './app/action';
import ProductDetails from './ProductDetails';
import ProductSales from './ProductSales';

function App() {
  return (
    <div className="App">
      <div className="ImageContainer">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div className="PanelContainer">
        <div className="Panels">
          <div className="LeftPanel">
            <ProductDetails />
          </div>
          <div className="RightPanel">
            <ProductSales />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;