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

<<<<<<< Updated upstream
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

 
=======
   const [formErrors, setFormErrors] = useState({});

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
        const materialName = option.value;
    
        if (option.selected) {
          newSelectedMaterials.push(materialName);
    
          if (!newMaterialQuantities[materialName]) {
            newMaterialQuantities[materialName] = materials.find((m) => m.name === materialName).defaultQuantity;
          }
        } else {
          const index = newSelectedMaterials.indexOf(materialName);
    
          if (index > -1) {
            newSelectedMaterials.splice(index, 1);
            delete newMaterialQuantities[materialName];
          }
        }
      }
    
      // Get all the selected material objects
      const selectedMaterialObjects = newSelectedMaterials.map((materialName) => {
        const material = materials.find((m) => m.name === materialName);
        return { ...material, quantity: Number(newMaterialQuantities[materialName]) };
      });
    
      setSelectedMaterials(newSelectedMaterials);
      setMaterialQuantities(newMaterialQuantities);
      setSelectedMaterialObjects(selectedMaterialObjects);
    };
    
    
>>>>>>> Stashed changes

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
    console.log(totalQuantity)
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

<<<<<<< Updated upstream
console.log(materials,'productform')
  return (
    <div className="add-product-form">
      <h2>Create a new product:</h2>
      <label>
        Product name:
        <input required type="text" value={productName} onChange={handleProductNameChange} />
      </label>
      <br />
      <label>
        Quantity:
        <input required type="number" value={productQuantity} onChange={handleProductQuantityChange} />
      </label>
      <br />
      <label>
        Materials:
        <select multiple={true} value={selectedMaterials} onChange={handleMaterialSelect}>
          {materials.map((material) => (
            <option required key={material.name} value={material.name}>
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
=======
      if (Object.keys(materialErrors).length > 0) {
         errors.materials = materialErrors;
      }

      setFormErrors(errors);

      return Object.keys(errors).length === 0;
   };

   const handleAddProduct = (event) => {
      event.preventDefault();
    
      const isValid = validateForm();
    
      if (isValid) {
        const selectedMaterialObjects = selectedMaterials.map((materialName) => {
          const material = materials.find((m) => m.name === materialName);
    
          return { ...material, quantity: Number(materialQuantities[materialName]) };
        });
    
        const materialsCost = selectedMaterialObjects.reduce(
          (total, material) => total + material.quantity * material.price,
          0
        );
    
        const price = (materialsCost / Number(productQuantity)).toFixed(2);
    
        const newProduct = {
          name: productName,
          quantity: Number(productQuantity),
          materials: selectedMaterialObjects,
          price: price,
        };
        console.log(newProduct.materials);
        onAdd(newProduct);
    
        setProductName("");
    
        setProductQuantity("");
    
        setSelectedMaterials([]);
    
        setMaterialQuantities({});
      }
    };
    

   return (
      <form className="add-product-form" onSubmit={handleAddProduct}>
         <div>
            <label htmlFor="productName">Product Name:</label>

            <input type="text" id="productName" value={productName} onChange={handleProductNameChange} />

            {formErrors.productName && <p className='error-message'>{formErrors.productName}</p>}
         </div>

         <div>
            <label htmlFor="productQuantity">Quantity:</label>

            <input type="text" id="productQuantity" value={productQuantity} onChange={handleProductQuantityChange} />

            {formErrors.productQuantity && <p className='error-message'>{formErrors.productQuantity}</p>}
         </div>

         <div>
            <label htmlFor="materials">Materials:</label>

            <select id="materials" multiple={true} value={selectedMaterials} onChange={handleMaterialSelect}>
               {materials.map((material) => (
                  <option key={material.name} value={material.name}>
                     {material.name}
                  </option>
               ))}
            </select>

            {formErrors.materials && typeof formErrors.materials === "string" && <p  className='error-message'>{formErrors.materials}</p>}

            {formErrors.materials && typeof formErrors.materials === "object" && (
               <ul>
                  {selectedMaterials.map((materialName) => (
                     <li key={materialName}>
                        {materialName}: {formErrors.materials[materialName]}
                     </li>
                  ))}
               </ul>
            )}
         </div>

         {selectedMaterials.map((materialName) => (
            <div key={materialName}>
               <label htmlFor={`quantity-${materialName}`}>{materialName} Quantity:</label>

               <input type="text" id={`quantity-${materialName}`} value={materialQuantities[materialName] || ""} onChange={(event) => handleQuantityChange(event, materialName)} />

               {formErrors.materials && formErrors.materials[materialName] && <p className='error-message'>{formErrors.materials[materialName]}</p>}
            </div>
         ))}

         <div>
            <button type="submit">Add Product</button>
         </div>
      </form>
   );
>>>>>>> Stashed changes
}

export default ProductForm;
