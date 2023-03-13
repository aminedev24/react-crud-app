import React, { useState } from 'react';
import './App.css';
import MaterialList from './components/MaterialList';
import ProductList from './components/ProductList';
import LocalStorageHandler from './components/LocalStorageHandler';

function App() {
  const [showMaterialList, setShowMaterialList] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [products, setProducts] = useState([]);

  const handleDelete = (id) => {
    const updatedMaterials = materials.filter((material) => material.id !== id);
    setMaterials(updatedMaterials);
  };

  const handleUpdate = (id, newName) => {
    const updatedMaterials = materials.map((material) =>
      material.id === id ? { id, name: newName } : material
    );
    setMaterials(updatedMaterials);
  };

  const handleAdd = (name) => {
    const newMaterial = { id: Math.random(), name };
    setMaterials([...materials, newMaterial]);
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const handleUpdateProduct = (id, newName, newMaterials) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { id, name: newName, materials: newMaterials } : product
    );
    setProducts(updatedProducts);
  };

  const handleAddProduct = (name, materials) => {
    const newProduct = { id: Math.random(), name, materials };
    setProducts([...products, newProduct]);
  };

  return (
    <div className='app-container'>
      <LocalStorageHandler materials={materials} products={products} />
      <div className='menu-container'>
        <div
          className={`menu-item ${showMaterialList ? 'active' : ''}`}
          onClick={() => setShowMaterialList(true)}
        >
          <i className="fas fa-box-open"></i>
          <span>Materials</span>
        </div>
        <div
          className={`menu-item ${!showMaterialList ? 'active' : ''}`}
          onClick={() => setShowMaterialList(false)}
        >
          <i className="fas fa-shopping-cart"></i>
          <span>Products</span>
        </div>
      </div>
      {showMaterialList && (
        <MaterialList
          materials={materials}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onAdd={handleAdd}
        />
      )}
      {!showMaterialList && (
        <ProductList
          products={products}
          onDelete={handleDeleteProduct}
          onUpdate={handleUpdateProduct}
          onAdd={handleAddProduct}
          materials={materials}
        />
      )}
    </div>
  );
}

export default App;
