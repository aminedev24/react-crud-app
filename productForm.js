import React, { useState, useEffect } from 'react';
import MaterialList from './materialList';

function ProductForm({ materials, onAdd }) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState({});
  const [materialQuantities, setMaterialQuantities] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductPriceChange = (event) => {
    const value = Number(event.target.value);
    setProductPrice(value);
  };

  const handleMaterialSelect = (event) => {
  const options = event.target.options;
  const selectedMaterials = {};
  const selectedQuantities = {};
  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    if (option.selected) {
      const materialName = option.value;
      selectedMaterials[materialName] = true;
      selectedQuantities[materialName] = 1;
    }
  }
  setSelectedMaterials(selectedMaterials);
  setMaterialQuantities(selectedQuantities);
};


  useEffect(() => {
    console.log('Selected Materials:', selectedMaterials);
  }, [selectedMaterials]);

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
    console.log(
      `selectedMaterialNames handleAddProduct - productForm: ${selectedMaterialNames}`
    );
    const selectedMaterialCost = selectedMaterialNames.reduce(
      (total, materialName) => {
        const material = materials.find((m) => m.name === materialName);
        const quantity = materialQuantities[materialName];
        return total + material.price * quantity;
      },
      0
    );

    const totalPrice = selectedMaterialCost + Number(productPrice);

    if (typeof onAdd === 'function') {
      onAdd(
        {
          name: productName,
          price: totalPrice,
          materials: selectedMaterials,
        },
        selectedMaterials
      );
    }

    setProductName('');
    setProductPrice('');
    setSelectedMaterials({});
    setMaterialQuantities({});
    setSelectedOptions([]);
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
        <select
          multiple
          onChange={(event) => {
            handleMaterialSelect(event);
            setSelectedOptions(Array.from(event.target.selectedOptions, (option) => option.value));
          }}
          value={selectedOptions}
        >
          {materials.map((material) => (
            <option key={material.name} value={material.name}>
              {material.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      {Object.keys(selectedMaterials).map((materialName) =>
        selectedMaterials[materialName] && (
          <div key={materialName}>
            <label>
              {materialName} quantity:
              <input
                type="number"
                value={materialQuantities[materialName]}
                onChange={(event) => handleQuantityChange(event, materialName)}
              min="1"
              max="10"
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

