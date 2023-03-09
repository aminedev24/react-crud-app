import React, { useState } from 'react';
import ProductForm from './productForm';

function ProductList({ products, onDelete, onUpdate, materials }) {
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [productsList, setProductsList] = useState(products);
  const [materialsList, setMaterialsList] = useState(materials);

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

  const handleProductDelete = (productToDelete) => {
    const updatedProducts = productsList.filter(
      (product) => product !== productToDelete
    );
    onDelete(updatedProducts);
    setProductsList(updatedProducts);
  };

  const handleProductAdd = (product, selectedMaterials) => {
   
  
    const newProduct = {
      id: productsList.length + 1,
      name: product.name,
      materials: product.materials,
      quantity: product.quantity,
      price: product.price,
    };
    setProductsList((prevProducts) => [...prevProducts, newProduct]);
  };

  const getMaterialsAsString = (selectedMaterials) => {
    if (!selectedMaterials || typeof selectedMaterials !== 'object') {
      return '';
    }
 
    const materialsArray = Object.values(selectedMaterials).map(
      (material) => `(${material.quantity}) ${material.name}`
    );
    
    if (materialsArray.length === 0) {
      return '';
    }

    const materialNames = materialsArray.join(', ');

    return <span className="material-list">{materialNames}</span>;
  };

  const renderProducts = () => {
    return (
      <tbody>
        {productsList.map((product, index) => (
          <tr key={`${product.name}-${index}`}>
            <td>{product.name}</td>
            <td>{getMaterialsAsString(product.materials)}</td>
            <td>{product.quantity}</td>
            <td>{product.price}</td>
            <td>
              <button className='btn btn-danger btn-sm' onClick={() => handleProductDelete(product)}>
                Delete
              </button>
              <button className='btn btn-info btn-sm' onClick={() => handleEdit(product)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className='table-responsive'>
      <h2>Products:</h2>
      <table className='table table-bordered'>
        <thead className='table-dark'>
          <tr>
            <th>Name</th>
            <th>Materials</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        {renderProducts()}
      </table>

      <ProductForm
        materials={materials}
        onAdd={handleProductAdd}
        onUpdate={handleProductUpdate}
        productToUpdate={productToUpdate}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default ProductList;
