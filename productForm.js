import React, { useState, useEffect } from "react";

function ProductForm({ materials, onAdd }) {
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [materialQuantities, setMaterialQuantities] = useState({});

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductQuantityChange = (event) => {
    const value = Number(event.target.value);
    setProductQuantity(value);
  };

  const handleQuantityChange = (event, materialName) => {
    const quantity = event.target.value;
    setMaterialQuantities((prevMaterialQuantities) => ({
      ...prevMaterialQuantities,
      [materialName]: quantity,
    }));
  };

  const handleMaterialSelect = (event) => {
    const options = event.target.options;
    const newSelectedMaterials = [];
    const newMaterialQuantities = { ...materialQuantities };
  
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (option.selected) {
        const materialName = option.value;
        newSelectedMaterials.push(materialName);
        if (!newMaterialQuantities[materialName]) {
          newMaterialQuantities[materialName] = materials.find((m) => m.name === materialName).defaultQuantity;
        }
      } else {
        const materialName = option.value;
        const index = newSelectedMaterials.indexOf(materialName);
        if (index > -1) {
          newSelectedMaterials.splice(index, 1);
          delete newMaterialQuantities[materialName];
        }
      }
    }
  
    setSelectedMaterials(newSelectedMaterials);
    setMaterialQuantities(newMaterialQuantities);
  };
  

  useEffect(() => {
  }, [selectedMaterials, materialQuantities]);

 

  const handleAddProduct = () => {
    const selectedMaterialObjects = selectedMaterials.map((materialName) => {
    const material = materials.find((m) => m.name === materialName);
    const quantity = materialQuantities[materialName];
    return { ...material, quantity };
  });


    // Create a new array with updated material quantities
    const updatedMaterials = materials.map((material) => {
      if (selectedMaterials.includes(material.name)) {
        const quantity = materialQuantities[material.name];
        return {
          ...material,
          quantity: material.quantity - quantity,
        };
      } else {
        return material;
      }
    });

    const selectedMaterialCost = selectedMaterialObjects.reduce((total, material) => {
      const quantity = materialQuantities[material.name];
      return total + material.price * quantity;
    }, 0);

    const totalQuantity = Object.values(materialQuantities).reduce((total, quantity) => total + Number(quantity), 0);

    const costPerUnit = selectedMaterialCost / productQuantity;

    if (typeof onAdd === "function") {
      onAdd(
        {
          name: productName,
          price: costPerUnit.toFixed(2),
          quantity: productQuantity,
          materials: selectedMaterialObjects,
          materialQuantities: materialQuantities,
        },
        selectedMaterialObjects
      );
    }

    setProductName("");
    setProductQuantity("");
    setSelectedMaterials([]);
    setMaterialQuantities({});
  };

  return (
    <div className="add-product-form">
      <h2>Create a new product:</h2>
      <label>
        Product name:
        <input type="text" value={productName} onChange={handleProductNameChange} />
      </label>
      <br />
      <label>
        Quantity:
        <input type="number" value={productQuantity} onChange={handleProductQuantityChange} />
      </label>
      <br />
      <label>
        Materials:
        <select multiple={true} value={selectedMaterials} onChange={handleMaterialSelect}>
          {materials.map((material) => (
            <option key={material.name} value={material.name}>
              {material.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      {selectedMaterials.map((materialName) => (
        <label key={materialName}>
          {materialName} quantity:
          <input type="number" value={materialQuantities[materialName] || ""} onChange={(event) => handleQuantityChange(event, materialName)} />
        </label>
      ))}
      <br />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
}

export default ProductForm;
