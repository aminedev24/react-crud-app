import React, { useState, useEffect } from "react";

function ProductForm({ materials, onAdd, onUpdate, productToUpdate, onCancel,isUpdateForm }) {
   const [productName, setProductName] = useState("");
   const [selectedOptions, setSelectedOptions] = useState([]);
   const [productQuantity, setProductQuantity] = useState("");
   const [selectedMaterials, setSelectedMaterials] = useState([]);
   const [materialQuantities, setMaterialQuantities] = useState({});
   const [materialInputs, setMaterialInputs] = useState({});
   const [formErrors, setFormErrors] = useState({});
   
   useEffect(() => {
      if (productToUpdate) {
        setName(productToUpdate.name);
        setQuantity(productToUpdate.quantity);
        setPrice(productToUpdate.price);
      }
    }, [productToUpdate]);

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
      setMaterialInputs({});
    };
    
   
    

    

   useEffect(() => {
      setFormErrors({});
   }, [selectedMaterials, materialQuantities]);

   const validateForm = () => {
      const errors = {};

      if (productName.trim() === "") {
         errors.productName = "Product name is required";
      }

      if (productQuantity === "") {
         errors.productQuantity = "Quantity is required";
      } else if (isNaN(productQuantity)) {
         errors.productQuantity = "Quantity must be a number";
      } else if (Number(productQuantity) <= 0) {
         errors.productQuantity = "Quantity must be greater than 0";
      }

      if (selectedMaterials.length === 0) {
         errors.materials = "At least one material must be selected";
      }

      let materialErrors = {};

      selectedMaterials.forEach((materialName) => {
         if (materialQuantities[materialName] === "") {
            materialErrors[materialName] = "Quantity is required";
         } else if (isNaN(materialQuantities[materialName])) {
            materialErrors[materialName] = "Quantity must be a number";
         } else if (Number(materialQuantities[materialName]) <= 0) {
            materialErrors[materialName] = "Quantity must be greater than 0";
         }
      });

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
    
        onAdd(newProduct);
    
        setProductName("");
    
        setProductQuantity("");
    
        setSelectedMaterials([]);
    
        setMaterialQuantities({});
      }
    };
    

   return (
      <form className="add-product-form" onSubmit={handleAddProduct}>
         <h3>{isUpdateForm ? 'Update Product' : 'Add Product'}</h3>
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

            <select className="form-control"  id="materials" multiple={true} value={selectedMaterials} onChange={handleMaterialSelect}>
               {materials.map((material) => (
                  <option key={material.name} value={material.name}>
                     {material.name}
                  </option>
               ))}
            </select>

            {formErrors.materials && typeof formErrors.materials === "string" && 
            <p className='error-message'>{formErrors.materials}</p>}

            {formErrors.materials && typeof formErrors.materials === "object" && (
               <ul>
                  {selectedMaterials.map((materialName) => (
                     <li className='error-message' key={materialName}>
                        {materialName}: {formErrors.materials[materialName]}
                     </li>
                  ))}
               </ul>
            )}
         </div>

         {selectedMaterials.map((materialName) => (
  <div key={materialName}>
    <label htmlFor={`quantity-${materialName}`}>{materialName} Quantity:</label>
    <input
      type="text"
      id={`quantity-${materialName}`}
      value={materialQuantities[materialName] || ""}
      onChange={(event) => handleQuantityChange(event, materialName)}
    />
    {formErrors.materials && formErrors.materials[materialName] && (
      <p className="error-message">{formErrors.materials[materialName]}</p>
    )}
  </div>
))}



         <div>
            <button type="submit">Add Product</button>
         </div>
      </form>
   );
}

export default ProductForm;