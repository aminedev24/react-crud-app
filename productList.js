import React, { useState } from 'react';
import ProductForm from './productForm';

function ProductList({ products, onDelete, onUpdate, onAdd, materials }) {
  const [productToUpdate, setProductToUpdate] = useState(null);

  const handleEdit = (product) => {
    setProductToUpdate(product);
  };

  const handleCancel = () => {
    setProductToUpdate(null);
  };

  const handleProductUpdate = (productToUpdate, updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product === productToUpdate ? updatedProduct : product
    );
    onUpdate(updatedProducts);
    setProductToUpdate(null);
  };

  const handleProductAdd = (newProduct) => {
  console.log("Adding new product:", newProduct);
  const isDuplicate = products.some((product) => product.name === newProduct.name);
  if (isDuplicate) {
    alert('Product already exists!');
    return;
  }
  onAdd(newProduct);
  setProductToUpdate(null);
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

  const getProductName = (materialNames) => {
    const name = materialNames.join(', ');
    return name;
  };

  return (
    <div>
      <h2>Products:</h2>
      <ul>
        {products.map((product) => (
          <li key={product.name}>
            {product.name} - ${getPriceForMaterials(product.materials)}
            <button onClick={() => handleDelete(product)}>Delete</button>
            <button onClick={() => handleEdit(product)}>Edit</button>
          </li>
        ))}
      </ul>
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
