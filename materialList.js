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
<div className='table-responsive'>
  <h2>Materials:</h2>
  <table className='table table-bordered'>
    <thead className='table-dark'>
      <tr>
        <th>Name</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Ptu</th>
        <th>Actions</th>
        <th></th>
        
      </tr>
      <tr></tr>
    </thead>
    <tbody>
      {materials.map((material) => (
        <tr key={material.name}>
          <td>{material.name}</td>
          <td>{material.quantity}</td>
          <td>{material.price}</td>
          <td>{getPriceForMaterial(material)}</td>
          <td>
            <button className='btn btn-sm btn-danger' onClick={() => onDelete(material)}>Delete</button>
            <button className='btn btn-sm btn-info' onClick={() => handleEdit(material)}>Edit</button>
          </td>
        </tr>
      ))}
      
      {materialToUpdate && (
        <tr>
          <td>
            <input type="text" value={materialToUpdate.name} disabled />
          </td>
          <td>
            <input

              type="number"
              value={materialToUpdate.quantity}
              onChange={(event) => {
                const value = Number(event.target.value);
                const updatedMaterial = { ...materialToUpdate, quantity: value };
                setMaterialToUpdate(updatedMaterial);
              }}
            />
          </td>
          <td>
            <input
              type="number"
              value={materialToUpdate.price}
              onChange={(event) => {
                const value = Number(event.target.value);
                const updatedMaterial = { ...materialToUpdate, price: value };
                setMaterialToUpdate(updatedMaterial);
              }}
            />
          </td>
          
          <td>
            <button className='btn btn-info' onClick={() => handleMaterialUpdate(materialToUpdate, materialToUpdate)}>Save</button>
            <button className='btn btn-secondary' onClick={handleCancel}>Cancel</button>
          </td>
        </tr>
        
      )}
      <tr>
        <td></td>
        <td></td>
        <td></td>

      </tr>
    </tbody>
  </table>
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
