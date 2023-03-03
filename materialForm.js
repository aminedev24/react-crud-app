import React, { useState, useEffect } from 'react';

function MaterialForm({ onAdd, onUpdate, onCancel, materialToUpdate }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (materialToUpdate) {
      setName(materialToUpdate.name);
      setQuantity(materialToUpdate.quantity);
      setPrice(materialToUpdate.price);
    }
  }, [materialToUpdate]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMaterial = {
      name: name.trim(),
      quantity: parseInt(quantity),
      price: parseFloat(price),
    };
    if (materialToUpdate) {
      onUpdate(materialToUpdate, newMaterial);
    } else {
      onAdd(newMaterial);
    }
    setName('');
    setQuantity('');
    setPrice('');
  };

  const handleCancel = () => {
    onCancel();
  };

  const formTitle = materialToUpdate ? 'Update Material' : 'Add Material';

  return (
    <div>
      <h2>{formTitle}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            step="0.01"
            value={price}
            onChange={handlePriceChange}
            required
          />
        </div>
        <div>
          <button type="submit">{formTitle}</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default MaterialForm;
