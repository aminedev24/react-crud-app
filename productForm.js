import React, { useState } from 'react';
import MaterialList from './materialList';

function ProductForm({ materials, onAdd ,productToUpdate = null}) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(0);

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductPriceChange = (event) => {
    setProductPrice(event.target.value);
  };

  const handleAddProduct = () => {
  const totalMaterialCost = materials.reduce((acc, cur) => acc + cur.price, 0);
  const totalProductPrice = totalMaterialCost + Number(productPriceInput);
  onAdd({ name: productName, price: totalProductPrice });
  setProductName('');
  setProductPrice(0);
};


  return (
    <div>
      <h2>Create a new product:</h2>
      <label>
        Product name:
        <input type="text" value={productName} onChange={handleProductNameChange} />
      </label>
      <br />
      <label>
        Product price:
        <input type="number" value={productPrice} onChange={handleProductPriceChange} />
      </label>
      <br />

      <br />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
}

export default ProductForm;
