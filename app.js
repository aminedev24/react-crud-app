import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import MaterialForm from './materialForm';
import MaterialList from './materialList';
import ProductForm from './productForm'
import ProductList from './productList';
const initialMaterials = [
  { name: 'Water', quantity: 1000, price: 0.5 },
  { name: 'Sugar', quantity: 500, price: 1.2 },
  { name: 'Lemon Juice', quantity: 250, price: 2.5 },
];

function Main() {
  const [materials, setMaterials] = useState(initialMaterials);
  const [products, setProducts] = useState([]);

  const handleUpdate = (updatedMaterials) => {
    setMaterials(updatedMaterials);
  };

  const handleDelete = (materialToDelete) => {
    setMaterials(materials.filter((material) => material !== materialToDelete));
  };

  const handleAdd = (newMaterial) => {
    setMaterials([...materials, newMaterial]);
  };
  
  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };
  
  const handleUpdateProduct = (productToUpdate, updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product === productToUpdate ? updatedProduct : product
    );
    setProducts(updatedProducts);
  };
  
  const handleDeleteProduct = (productToDelete) => {
    setProducts(products.filter((product) => product !== productToDelete));
  };

  return (
    <div>
      <MaterialList
        materials={materials}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        onAdd={handleAdd}
      />
      <ProductList
        products={products}
        onDelete={handleDeleteProduct}
        onUpdate={handleUpdateProduct}
        onAdd={handleAddProduct}
        materials={materials}
      />
    </div>
  );
}



ReactDOM.render(<Main />, document.getElementById('react-app'));
