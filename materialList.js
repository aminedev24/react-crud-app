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
      material === materialToUpdate ? updatedMaterial : material
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

  return (
    <div>
      <h2>Materials:</h2>
      <ul>
        {materials.map((material) => (
          <li key={material.name}>
            {material.name} - {material.quantity} ml - ${material.price}
            <button onClick={() => onDelete(material)}>Delete</button>
            <button onClick={() => handleEdit(material)}>Edit</button>
          </li>
        ))}
      </ul>
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
