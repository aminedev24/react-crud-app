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

  const addProduct = (product, selectedMaterials) => {
  //console.log(`selectedMaterials addProduct - pl: ${JSON.stringify(selectedMaterials)} `);

  const selectedMaterialNames = Object.keys(selectedMaterials);
  const materials = selectedMaterialNames.map((materialName) => ({
    name: materialName,
    quantity: selectedMaterials[materialName]
  }));
  
  //console.log(`selectedMaterialNames - addProduct -pl: `)
  setProductsList((prevProducts) => [
    ...prevProducts,
    {
      ...product,
      id: prevProducts.length + 1,
      materials: materials,
    },
  ]);
};

  
  const getMaterialsAsString = (selectedMaterials) => {
    if (!selectedMaterials || typeof selectedMaterials !== 'object') {
      return '';
    }
    //console.log(`selectedMaterialsString: getMaterialsAsString - pl ${selectedMaterials}`)
    const materialNamesArray = Object.values(selectedMaterials).map((material) => material.name);
  
    //console.log(`materialsArray - getMaterialsAsString: ${materialNamesArray}`)
    if (materialNamesArray.length === 0) {
      return '';
    }
  
    const materialNames = materialNamesArray.join(', ');
  
    return materialNames;
  };
  
  
  
  const handleDelete = (productToDelete) => {
    onDelete(productToDelete);
  };

  const getPriceForProducts = () => {
  let total = 0;
  
  productsList.forEach((product) => {
    const selectedMaterials = materials.filter((material) =>
      product.materials.includes(material.name)
    );
    const price = selectedMaterials.reduce((materialTotal, material) => {
      return materialTotal + material.price * material.quantity;
    }, 0);
    const productPrice = price / product.quantity;
    total += productPrice;
  });
  return total.toFixed(2);
};



  
  
  
  
 
  const renderProducts = () => {
  return (
    <tbody>
      {productsList.map((product, index) => (
        <tr key={`${product.name}-${index}`}>
          <td>{product.name}</td>
          <td>{getMaterialsAsString(product.materials)}</td>
          <td>${getPriceForProducts(product.materials)}</td>
          <td>
            <button onClick={() => handleDelete(product)}>Delete</button>
            <button onClick={() => handleEdit(product)}>Edit</button>
          </td>
        </tr>
      ))}
    </tbody>
  );
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
        {renderProducts()}
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