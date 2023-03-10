import React, { useState, useEffect } from 'react';
import ProductMaterialForm from './form';

function MaterialForm({ onAdd, onUpdate, onCancel, materialToUpdate, isUpdateForm, productToUpdate }) {
  const [initialValues, setInitialValues] = useState({
    name: '',
    quantity: 0,
    price: 0
  });

<<<<<<< Updated upstream
  useEffect(() => {
    if (materialToUpdate) {
      setName(materialToUpdate.name);
      setQuantity(materialToUpdate.quantity);
      setPrice(materialToUpdate.price);
    }
  }, [materialToUpdate]);

  useEffect(() => {
    const isValid = name !== '' && quantity > 0 && price > 0;
    setIsFormValid(isValid);
  }, [name, quantity, price]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleQuantityChange = (event) => {
    const value = Number(event.target.value);
    setQuantity(value);
  };

  const handlePriceChange = (event) => {
    const value = Number(event.target.value);
    setPrice(value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newMaterial = { name, quantity, price };
    if (isUpdateForm) {
      onUpdate(materialToUpdate, newMaterial);
    } else {
=======
  const handleAdd = (values) => {
    const newMaterial = {
      name: values.name,
      quantity: values.quantity,
      price: values.price
    };
  
    if (typeof onAdd === 'function') {
>>>>>>> Stashed changes
      onAdd(newMaterial);
    }
  };
  


  useEffect(() => {
    if (productToUpdate) {
      setInitialValues({
        name: productToUpdate.name,
        materials: productToUpdate.materials,
        price: productToUpdate.price
      });
    }
  }, [productToUpdate]);

  const handleFormSubmit = (values) => {
    if (isUpdateForm) {
      onUpdate(productToUpdate, values);
    } else {
      if (typeof onAdd === 'function') {
        onAdd(values);
      }
    }
  };

  const handleFormCancel = () => {
    onCancel();
  };
  
  const isMaterialForm = productToUpdate ? false : true;

  const formClassName = isMaterialForm ? 'add-material-form' : 'add-product-form';

  return (
<<<<<<< Updated upstream
    <form onSubmit={handleFormSubmit}>
      <h3>{isUpdateForm ? 'Update Material' : 'Add Material'}</h3>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} required />
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} required />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" value={price} onChange={handlePriceChange} required />
      </div>
      <div>
        <button type="submit" disabled={!isFormValid}>
          {isUpdateForm ? 'Update' : 'Add'}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
=======
    <ProductMaterialForm
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      onCancel={handleFormCancel}
      onAdd={handleAdd}
      className={formClassName} 
      title={isUpdateForm ? 'Update Material' : 'Add Material'}
      fields={[
        {
          name: 'name',
          label: 'Name:',
          type: 'text',
          required: true
        },
        {
          name: 'quantity',
          label: 'Quantity:',
          type: 'number',
          required: true,
          min: 0
        },
        {
          name: 'price',
          label: 'Price:',
          type: 'number',
          required: true,
          min: 0
        }
      ]}
      submitButtonText={isUpdateForm ? 'Update' : 'Add'}
      
    />
>>>>>>> Stashed changes
  );
}

export default MaterialForm;


