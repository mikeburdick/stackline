import logo from './stackline_logo.svg';
import './App.css';
import ProductDetails from './ProductDetails';
import ProductSales from './ProductSales';
import ProductGrid from './ProductGrid';

function App() {
  return (
    <div className="App">
      <div className="ImageContainer">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div className="PanelContainer">
        <div className="InnerPanels">
          <div className="LeftPanel">
            <ProductDetails />
          </div>
          <div className="RightPanel">
            <div className='InnerRightPanels'>
              <div className="RightGraphPanel">
                <ProductSales />
              </div>
              <div className="RightGridPanel">
                <ProductGrid />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;