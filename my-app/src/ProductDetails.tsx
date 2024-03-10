import './App.css';
import myData from './data.json';

function ProductDetails() {
    const data = myData;
    var lines = data[0].tags.map(function (line, i) {
        return (
            <div className="TagDiv" key={i}>{line}</div>
        );
    });

    return (
        <div className="Detail">
            <div className="DetailTopContainer">
                <div className="ProductImageContainer">
                    <img src={data[0].image} className="ProductImage" alt="Product" />
                </div>
                <p><b>{data[0].title}</b></p>
                <p>{data[0].subtitle}</p>
            </div>
            <div className="DetailBottomContainer">
                <div className="TagContainer">
                    {lines}
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;