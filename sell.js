import { useState } from 'react';

const SellProduct = ({ products }) => {
  const [productsList,setProductsList] = useState(products)
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sellPrice, setSellPrice] = useState(0);
  //console.log(products)
  const handleProductChange = (event) => {
    const productId = event.target.value;
    const product = products.find((p) => p.name === productId);
    setSelectedProduct(product);
  };

  const handleSellPriceChange = (event) => {
    const value = Number(event.target.value);
    setSellPrice(value);
  };

  const calculateProductPrice = () => {
    if (!selectedProduct) return 0;
    const { price } = selectedProduct;
    return price - sellPrice;
  };

  const handleSellProduct = () => {
    if (!selectedProduct) return;
    const updatedProduct = {
      ...selectedProduct,
      price: calculateProductPrice(),
    };
    // Find the index of the selected product in the products array
    const index = products.findIndex((p) => p.id === selectedproduct.name);
    // Create a new products array with the updated product at the correct index
    const updatedProducts = [
      ...products.slice(0, index),
      updatedProduct,
      ...products.slice(index + 1),
    ];
    // Update the products state
    setProducts(updatedProducts);
    // Reset the selected product and sell price
    setSelectedProduct(null);
    setSellPrice(0);
  };

  return (
    <div>
      <select onChange={handleProductChange}>
        <option value="">Select a product</option>
        {products.map((product) => (
          <option key={product.name} value={product.name}>
            {product.name}
          </option>
        ))}
      </select>
      <input type="number" value={sellPrice} onChange={handleSellPriceChange} />
      <button onClick={handleSellProduct}>Sell</button>
      <p>Product price: {calculateProductPrice()} p&p</p>
    </div>
  );
};

export default SellProduct;
