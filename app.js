import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import MaterialForm from './materialForm';
import MaterialList from './materialList';
import ProductForm from './productForm'
import ProductList from './productList';

const initialMaterials = [
  { name: 'Water', quantity: 1000, price: 5 },
  { name: 'Sugar', quantity: 500, price: 20 },
  { name: 'Lemon Juice', quantity: 250, price: 15 },
];

const initialProducts = [
  {
    name: 'Lemonade',
    materials: [
      { name: 'Water', quantity: 1000, price: 300},
      { name: 'Sugar', quantity: 50, price: 20 },
      { name: 'Lemon Juice', quantity: 25, price: 15 }
    ],
    quantity :10,
    price: 0 // add a price property with an initial value of 0
  },
  {
    name: 'Ice Tea',
    materials: [
      { name: 'Water', quantity: 100, price: 50 },
      { name: 'Tea Leaves', quantity: 50, price: 30 },
      { name: 'Sugar', quantity: 25, price: 20 }
    ],
    quantity: 20,
    price: 0 // add a price property with an initial value of 0
  }
];

// calculate the product prices based on the materials' prices and quantities
initialProducts.forEach(product => {
  const totalPrice = product.materials.reduce((acc, material) => {
    return acc + (material.quantity * material.price / product.quantity);
  }, 0);

  product.price = totalPrice;
});



function Main() {
  const [materials, setMaterials] = useState(initialMaterials);
  
  const [products, setProducts] = useState(initialProducts);

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
    //console.log(newProduct)
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
