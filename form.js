import React, { useState, useEffect } from 'react';

function ProductMaterialForm({ 
  onAdd, 
  onUpdate, 
  onCancel, 
  dataToUpdate, 
  isUpdateForm, 
  isProductForm ,
  className
}) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (dataToUpdate) {
      setName(dataToUpdate.name);
      setQuantity(dataToUpdate.quantity);
      setPrice(dataToUpdate.price);
      if (isProductForm) {
        setDescription(dataToUpdate.description);
      }
    }
  }, [dataToUpdate]);

  useEffect(() => {
    const isValid = name !== '' && quantity > 0 && price > 0 && (isProductForm ? description !== '' : true);
    setIsFormValid(isValid);
  }, [name, quantity, price, description, isProductForm]);

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

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newData = { name, quantity, price };
    if (isProductForm) {
      newData.description = description;
    }
    
    if (isUpdateForm) {
      onUpdate(dataToUpdate, newData);
    } else {
      onAdd(newData);
    }
    setName('');
    setQuantity(0);
    setPrice(0);
    if (isProductForm) {
      setDescription('');
    }
  };

  return (
    <form className={{className} ? 'add-material-form' : 'add-product-form'} onSubmit={handleFormSubmit}>

      <h3>{isUpdateForm ? `Update ${isProductForm ? 'Product' : 'Material'}` : `Add ${isProductForm ? 'Product' : 'Material'}`}</h3>
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
      {isProductForm && (
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={handleDescriptionChange} required />
        </div>
      )}
      <div>
        <button className='btn btn-info ' type="submit" disabled={!isFormValid}>
          {isUpdateForm ? 'Update' : 'Add'}
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ProductMaterialForm;
