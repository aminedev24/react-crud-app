import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import MaterialForm from './materialForm';
import MaterialList from './materialList';
import ProductForm from './productForm';
import ProductList from './productList';
import ProductQuantityForm from './productQuantityForm';
import LocalStorageHandler from './save';
import SellProduct from './sell'

const initialMaterials = [
  { name: 'Water', quantity: 100, price: 5 },
  { name: 'Sugar', quantity: 500, price: 20 },
  { name: 'Lemon Juice', quantity: 250, price: 15 },
];

const initialProducts = [
  {
    name: 'Lemonade',
    id: 0,
    materials: [
      { name: 'Water', quantity: 100, price: 300},
      { name: 'Sugar', quantity: 50, price: 20 },
      { name: 'Lemon Juice', quantity: 25, price: 15 }
    ],
    quantity :10,
    price: 0,
    mcu: 0,
    
  },
  {
    name: 'Ice Tea',
    id: 1,
    materials: [
      { name: 'Water', quantity: 100, price: 50 },
      { name: 'Tea Leaves', quantity: 50, price: 30 },
      { name: 'Sugar', quantity: 25, price: 20 }
    ],
    quantity: 20,
    price: 0,
    mcu: 0,
   
  }
];
//console.log(initialProducts)
// calculate the product prices based on the materials' prices and quantities
initialProducts.forEach(product => {
  let totalPrice = 0;
  let mcuObj = {};
  
  product.materials.forEach(material => {
    const materialCost = material.quantity * material.price;
    totalPrice += materialCost;
    
    const mcu = material.price * material.quantity /product.quantity;
    mcuObj[material.name] = mcu;
  });

  product.price = totalPrice;
  product.mcu = mcuObj;
  //console.log(product.mcu)
});



function App() {
  const [materials, setMaterials] = useState(() => {
    const storedMaterials = localStorage.getItem('materials');
    return storedMaterials ? JSON.parse(storedMaterials) : initialMaterials;
  });
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : initialProducts;
  });
  const [showMaterialList, setShowMaterialList] = useState(true);

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

ReactDOM.render(<App />, document.getElementById('react-app'));
