import React, { useState } from 'react';
import ProductForm from './productForm';

function ProductList({ products, onDelete, onUpdate, materials }) {
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [productsList, setProductsList] = useState(products);

  const handleEdit = (product) => {
    setProductToUpdate(product);
  };

  const handleCancel = () => {
    setProductToUpdate(null);
  };

  const handleProductUpdate = (productToUpdate, updatedProduct) => {
    const updatedProducts = productsList.map((product) =>
      product === productToUpdate ? updatedProduct : product
    );
    onUpdate(updatedProducts);
    setProductToUpdate(null);
    setProductsList(updatedProducts);
  };

  const addProduct = (newProduct, selectedMaterials) => {
    const updatedProduct = { ...newProduct, materials: selectedMaterials };
    const updatedProducts = [...productsList, updatedProduct];
    setProductsList(updatedProducts);
  };
  

  const handleDelete = (productToDelete) => {
    onDelete(productToDelete);
  };

  const getPriceForMaterials = (materialNames) => {
    if (!Array.isArray(materialNames)) {
      return 0;
    }
  
    const selectedMaterials = materials.filter((material) =>
      materialNames.includes(material.name)
    );
    const price = selectedMaterials.reduce((total, material) => {
      return total + material.price * material.quantity;
    }, 0);
    return price;
  };

  const getMaterialsAsString = (selectedMaterials) => {
    if (!selectedMaterials) {
      return products;
    }
  
    const selectedMaterialNames = Object.keys(selectedMaterials).filter(
      (materialName) => selectedMaterials[materialName]
    );
  
    if (!Array.isArray(selectedMaterialNames) || selectedMaterialNames.length === 0) {
      return ;
    }
  
    return selectedMaterialNames.join(', ');
  };
  
  
  
  
  
  
  return (
    <div>
      <h2>Products:</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Materials</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {productsList.map((product) => {
  const allMaterials = [...initialMaterials, ...product.materials];
  const selectedMaterialIds = Object.keys(product.selectedMaterials).filter(
    (materialId) => product.selectedMaterials[materialId]
  );
  const selectedMaterials = selectedMaterialIds.map(
    (materialId) => allMaterials.find((material) => material.id === materialId)
  );
  return (
    <tr key={product.name}>
      <td>{product.name}</td>
      <td>{getMaterialsAsString(allMaterials, selectedMaterials)}</td>
      <td>${getPriceForMaterials(allMaterials)}</td>
      <td>
        <button onClick={() => handleDelete(product)}>Delete</button>
        <button onClick={() => handleEdit(product)}>Edit</button>
      </td>
    </tr>
  );
})}

        </tbody>
      </table>

      <ProductForm
        materials={materials}
        onAdd={(newProduct, selectedMaterials) => addProduct(newProduct, selectedMaterials)}
        onUpdate={handleProductUpdate}
        productToUpdate={productToUpdate}
        onCancel={handleCancel}
      />

    </div>
  );
}

export default ProductList;
