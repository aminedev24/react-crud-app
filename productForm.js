import React, { useState } from 'react';
import MaterialList from './materialList';

function ProductForm({ materials, onAdd }) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState({});
  const [materialQuantities, setMaterialQuantities] = useState({});

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductPriceChange = (event) => {
    const value = Number(event.target.value);
    setProductPrice(value);
  };

  const handleMaterialSelect = (event) => {
    const selectedMaterial = event.target.value;
    setSelectedMaterials((prevSelectedMaterials) => ({
      ...prevSelectedMaterials,
      [selectedMaterial]: true,
    }));
    setMaterialQuantities((prevMaterialQuantities) => ({
      ...prevMaterialQuantities,
      [selectedMaterial]: 1,
    }));
  };
  

  const handleMaterialQuantityChange = (event, materialName) => {
    const quantity = Number(event.target.value);
    setMaterialQuantities((prevMaterialQuantities) => ({
      ...prevMaterialQuantities,
      [materialName]: quantity,
    }));
  };
  const handleAddProduct = () => {
    const selectedMaterialNames = Object.keys(selectedMaterials).filter(
      (materialName) => selectedMaterials[materialName]
    );
    console.log(selectedMaterialNames)
    const selectedMaterialCost = selectedMaterialNames.reduce((total, materialName) => {
      const material = materials.find((m) => m.name === materialName);
      const quantity = materialQuantities[materialName];
      return total + material.price / quantity;
    }, 0);
  
    const totalPrice = selectedMaterialCost + Number(productPrice);
  
    if (typeof onAdd === "function") {
      // Reset the selectedMaterials object before updating it with the new selected materials
      const newSelectedMaterials = {};
      selectedMaterialNames.forEach((materialName) => {
        newSelectedMaterials[materialName] = true;
      });
      console.log(newSelectedMaterials)
      onAdd({
        name: productName,
        price: totalPrice,
        materials: newSelectedMaterials,
      }, materials, newSelectedMaterials);
    }
   
    
  }
  
  
  

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
        <select defaultValue={[]} multiple onChange={handleMaterialSelect}>
          {materials.map((material) => (
            <option key={material.name} value={material.name}>
              {material.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      {Object.keys(selectedMaterials).map((materialName) => (
        <div key={materialName}>
          <label>
            Quantity for {materialName}:
            <input
              type="number"
              value={materialQuantities[materialName] || ''}
              onChange={(e) => handleMaterialQuantityChange(e, materialName)}
            />
          </label>
        </div>
      ))}
      <br />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
}

export default ProductForm;
