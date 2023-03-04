import React, { useState, useEffect } from 'react';

function MaterialForm({ onAdd, onUpdate, onCancel, materialToUpdate, isUpdateForm }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);

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
      onAdd(newMaterial);
    }
    setName('');
    setQuantity(0);
    setPrice(0);
  };

  return (
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
  );
}

export default MaterialForm;
