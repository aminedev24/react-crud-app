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

  const addProduct = (newProduct) => {
    const updatedProducts = [...productsList, newProduct];
    setProductsList(updatedProducts);
  };

  const handleDelete = (productToDelete) => {
    onDelete(productToDelete);
  };

  const getPriceForMaterials = (materialNames) => {
    const selectedMaterials = materials.filter((material) =>
      materialNames.includes(material.name)
    );
    const price = selectedMaterials.reduce((total, material) => {
      return total + material.price * material.quantity;
    }, 0);
    return price;
  };

  const getMaterialsAsString = (materialNames) => {
    return materialNames.join(', ');
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
          {productsList.map((product) => (
            <tr key={product.name}>
              <td>{product.name}</td>
              <td>{getMaterialsAsString(product.materials)}</td>
              <td>${getPriceForMaterials(product.materials)}</td>
              <td>
                <button onClick={() => handleDelete(product)}>Delete</button>
                <button onClick={() => handleEdit(product)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ProductForm
        materials={materials}
        onAdd={addProduct}
        onUpdate={handleProductUpdate}
        productToUpdate={productToUpdate}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default ProductList;
