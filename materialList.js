import React, { useState } from 'react';
import MaterialForm from './materialForm';

function MaterialList({ materials, onDelete, onUpdate, onAdd }) {
  const [materialToUpdate, setMaterialToUpdate] = useState(null);
  const [key, setKey] = useState(0);

  const handleEdit = (material) => {
    setMaterialToUpdate(material);
  };

  const handleCancel = () => {
    setMaterialToUpdate(null);
    setKey(key + 1);
  };

  const handleMaterialUpdate = (materialToUpdate, updatedMaterial) => {
    const updatedMaterials = materials.map((material) =>
      material.name === materialToUpdate.name ? updatedMaterial : material
    );
    onUpdate(updatedMaterials);
    setMaterialToUpdate(null);
    setKey(key + 1);
  };
  

  const handleMaterialAdd = (newMaterial) => {
    onAdd(newMaterial);
    setMaterialToUpdate(null);
    setKey(key + 1);
  };

  const getPriceForMaterial = (material) => {
    return material.quantity * material.price;
  };



  return (
<div className='materials-container'>
  {materials.map((material) => (
    <div className='material-container' key={material.name}>
      <div className='material-number'>{material.id}</div>
      <div className='material-name'><h4>{material.name}</h4></div>
      <div className='material-quantity'><strong>Qty: </strong> {material.quantity}</div>
      <div className='material-price'><strong>price: </strong> {material.price}</div>
      <div className='material-ptu'><strong>Ptu: </strong>{getPriceForMaterial(material)}</div>
      <div className='material-actions'>
        <button className='btn btn-sm btn-danger' onClick={() => onDelete(material)}><i className='fas fa-trash'/></button>
        <button className='btn btn-sm btn-info' onClick={() => handleEdit(material)}><i className='fas fa-pen'/></button>
      </div>
    </div>
  ))}
  
  {materialToUpdate && (
    <div className='material-container'>
      <div className='material-number'>{materialToUpdate.number}</div>
      <div className='material-name'>{materialToUpdate.name}</div>
      <div className='material-quantity'>
        <input
          type="number"
          value={materialToUpdate.quantity}
          onChange={(event) => {
            const value = Number(event.target.value);
            const updatedMaterial = { ...materialToUpdate, quantity: value };
            setMaterialToUpdate(updatedMaterial);
          }}
        />
      </div>
      <div className='material-price'>
        <input
          type="number"
          value={materialToUpdate.price}
          onChange={(event) => {
            const value = Number(event.target.value);
            const updatedMaterial = { ...materialToUpdate, price: value };
            setMaterialToUpdate(updatedMaterial);
          }}
        />
      </div>
      <div className='material-ptu'>{getPriceForMaterial(materialToUpdate)}</div>
      <div className='material-actions'>
        <button className='btn btn-info' onClick={() => handleMaterialUpdate(materialToUpdate, materialToUpdate)}>Save</button>
        <button className='btn btn-secondary' onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  )}

  <MaterialForm
    key={key}
    onAdd={handleMaterialAdd}
    onUpdate={handleMaterialUpdate}
    materialToUpdate={materialToUpdate}
    onCancel={handleCancel}
    isUpdateForm={!!materialToUpdate}
  />
</div>


  );
}

export default MaterialList;
