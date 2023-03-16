import React, { useState } from 'react';
import MaterialForm from './materialForm';
import MaterialActions from './materialActions';
//import {StyleSheet} from 'react-native'
//import './materialList.css';

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
          <div className='material-name'>{material.name}</div>
          <div className='material-quantity'>
            <strong>Qty:</strong> {material.quantity}
          </div>
          <div className='material-price'>
            <strong>Price:</strong> {material.price}
          </div>
          <div className='material-ptu'>
            <strong>PTU:</strong> {getPriceForMaterial(material)}
          </div>
          <MaterialActions onDelete={onDelete} onEdit={handleEdit} material={material} />
        </div>
      ))}

      {materialToUpdate && (
        <div className='material-container'>
          <div className='material-name'>{materialToUpdate.name}</div>
          <div className='material-quantity'>
            <strong>Qty:</strong>{' '}
            <input
              type='number'
              value={materialToUpdate.quantity}
              onChange={(event) => {
                const value = Number(event.target.value);
                const updatedMaterial = { ...materialToUpdate, quantity: value };
                setMaterialToUpdate(updatedMaterial);
              }}
            />
          </div>
          <div className='material-price'>
            <strong>Price:</strong>{' '}
            <input
              type='number'
              value={materialToUpdate.price}
              onChange={(event) => {
                const value = Number(event.target.value);
                const updatedMaterial = { ...materialToUpdate, price: value };
                setMaterialToUpdate(updatedMaterial);
              }}
            />
          </div>
          <div className='material-ptu'>
            <strong>PTU:</strong> {getPriceForMaterial(materialToUpdate)}
          </div>
          <div className='material-actions'>
            <button className='btn btn-info' onClick={() => handleMaterialUpdate(materialToUpdate, materialToUpdate)}>
              Save
            </button>
            <button className='btn btn-secondary' onClick={handleCancel}>
              Cancel
            </button>
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
