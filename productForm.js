import React, { useState } from 'react';
import MaterialList from './materialList';

function ProductForm({ materials, onAdd }) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductPriceChange = (event) => {
  const value = Number(event.target.value);
  setProductPrice(value);
};



  const handleMaterialSelect = (event) => {
    const selected = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedMaterials(selected);
  };

  const handleAddProduct = () => {
  console.log('productPrice:', productPrice);
  const selectedMaterialCost = materials
    .filter(material => selectedMaterials.includes(material.name))
    .reduce((total, material) => {
      return total + (material.price * material.quantity);
    }, 0);
  console.log('selectedMaterialCost',selectedMaterialCost)
  const totalPrice = selectedMaterialCost + Number(productPrice);
  
  console.log('totalPrice',totalPrice)
  if (typeof onAdd === 'function') {
    console.log('onadd is a function')
    onAdd({ name: productName, price: totalPrice });
  }
  setProductName('');
  setProductPrice('');
  setSelectedMaterials([]);
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
      <label>
        Materials:
        <select multiple value={selectedMaterials} onChange={handleMaterialSelect}>
          {materials.map(material => (
            <option key={material.name} value={material.name}>{material.name}</option>
          ))}
        </select>
      </label>
      <br />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
}

export default ProductForm;
