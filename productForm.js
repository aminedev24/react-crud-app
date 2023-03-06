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
    //console.log('Selected Materials:', selectedMaterials);
  }, [selectedMaterials]);

  const handleQuantityChange = (event, materialName) => {
  const quantity = event.target.value;
  if (quantity === '') { // if the value is empty, set the quantity to null
    setMaterialQuantities(prevMaterialQuantities => ({
      ...prevMaterialQuantities,
      [materialName]: ''
    }));
  } else { // otherwise, set the quantity to the entered value
    setMaterialQuantities(prevMaterialQuantities => ({
      ...prevMaterialQuantities,
      [materialName]: Number(quantity)
    }));
  }
};



  const handleAddProduct = () => {
  const selectedMaterialNames = Object.keys(selectedMaterials).filter(
    (materialName) => selectedMaterials[materialName]
  );
  //onsole.log(`selectedMaterialNames handleAddProduct - productForm: ${selectedMaterialNames}`);
  const selectedMaterialCost = selectedMaterialNames.reduce(
    (total, materialName) => {
      const material = materials.find((m) => m.name === materialName);
      const quantity = materialQuantities[materialName];
      return total + material.price * quantity;
    },
    0
  );

  const totalQuantity = Object.values(materialQuantities).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const costPerUnit = selectedMaterialCost / totalQuantity;
 
  const totalPrice = costPerUnit * totalQuantity;
  //console.log(totalPrice)
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
  setSelectedMaterials({});
  setMaterialQuantities({});
  setSelectedOptions([]);
};

  return (
    <div className='add-product-form'>
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

