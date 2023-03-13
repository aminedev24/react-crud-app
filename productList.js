import React, { useState } from 'react';
import ProductForm from './productForm';
import ProductQuantityForm from './productQuantityForm'

function ProductList({ products, onDelete, onUpdate, materials }) {
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [productsList, setProductsList] = useState(products);
  const [materialsList, setMaterialsList] = useState(materials);

  const handleEdit = (product) => {
    setProductToUpdate(product);
    console.log('handleEdit', product);
  };

  const handleCancel = () => {
    setProductToUpdate(null);
  };

  const handleProductUpdate = (productToUpdate, updatedProduct) => {
    const updatedProducts = productsList.map((product) =>
      product === productToUpdate ? updatedProduct : product

    );
    console.log(productToUpdate,'pl')
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

  const getMaterialsInfo = (selectedMaterials) => {
  if (!selectedMaterials || typeof selectedMaterials !== 'object') {
    return '';
  }

  const materialsArray = Object.values(selectedMaterials).map(
    (material) => (
      <span key={material.name}>
        {`${material.name}: ${material.quantity}`}
      </span>
    )
  );

  if (materialsArray.length === 0) {
    return '';
  }

  return <div className="material-list">{materialsArray}</div>;
};

function calculateCosts(products) {
  let result = "";
  products.forEach((product) => {
    product.materials.forEach((material) => {
      const costPerUnit = material.price * material.quantity / product.quantity;
      result += `${material.name}: ${costPerUnit.toFixed(2)}\n`;
    });
  });
  console.log(result)
  return result;
}

/*
  const renderProducts = () => {
    return (
      <tbody>
        {productsList.map((product, index) => (
          <tr key={`${product.name}-${index}`}>
            <td>{product.name}</td>
            <td>{getMaterialsInfo(product.materials)}</td>
            
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
        {productToUpdate && (
        <tr>
          <td>
            <input type="text" value={productToUpdate.name} disabled />
          </td>
          <td>
            <input
              type="number"
              value={productToUpdate.quantity}
              onChange={(event) => {
                const value = Number(event.target.value);
                const updatedMaterial = { ...productToUpdate, quantity: value };
                setproductToUpdate(updatedMaterial);
              }}
            />
          </td>
          <td>
            <input
              type="number"
              value={productToUpdate.price}
              onChange={(event) => {
                const value = Number(event.target.value);
                const updatedMaterial = { ...productToUpdate, price: value };
                setproductToUpdate(updatedMaterial);
              }}
            />
          </td>
          
          <td>
            <button className='btn btn-info' onClick={() => handleMaterialUpdate(productToUpdate, productToUpdate)}>Save</button>
            <button className='btn btn-secondary' onClick={handleCancel}>Cancel</button>
          </td>
        </tr>
        
      )}
      </tbody>
    );
  };
*/

const [showMaterials, setShowMaterials] = useState(false);

const toggleMaterials = () => {
  setShowMaterials(!showMaterials);
}

const renderProducts = () => {
  return (
    <tbody>
      {productsList.map((product, index) => (
        <tr key={`${product.name}-${index}`}>
          <td>{product.name}</td>
          <td>
            {showMaterials && (
              <table className='table table-sm table-bordered table-dark'>
                <thead>
                  <tr>
                    <th>name</th>
                    <th>qty</th>
                    <th>price</th>
                  </tr>
                </thead>
                <tbody>
                  {product.materials.map((material) => (
                    <tr key={material.name}>
                      <td>{material.name}</td>
                      <td>{material.quantity}</td>
                      <td>{material.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <button className='btn-mt btn btn-secondary btn-sm' onClick={toggleMaterials}>
              {showMaterials ? 'Hide Materials' : <i className='fas fa-list-alt' />}
            </button>

          </td>
          <td>{product.quantity}</td>
          <td>{product.price}</td>
          <td className='btn-action'>
            <button className='btn btn-danger btn-sm' onClick={() => handleProductDelete(product)}>
            <i className='fas fa-trash' />
            </button>
            <button className='btn btn-info btn-sm' onClick={() => handleEdit(product)}><i className='fas fa-pen' /></button>
          </td>
        </tr>
      ))}
      {productToUpdate && (
        <tr>
          <td>
            <input type="text" value={productToUpdate.name} disabled />
          </td>
          <td>
            <input
              type="number"
              value={productToUpdate.quantity}
              onChange={(event) => {
                const value = Number(event.target.value);
                const updatedMaterial = { ...productToUpdate, quantity: value };
                setproductToUpdate(updatedMaterial);
              }}
            />
          </td>
          <td>
            <input
              type="number"
              value={productToUpdate.price}
              onChange={(event) => {
                const value = Number(event.target.value);
                const updatedMaterial = { ...productToUpdate, price: value };
                setproductToUpdate(updatedMaterial);
              }}
            />
          </td>
          <td></td>
          <td>
            <button className='btn btn-info'onClick={() => handleMaterialUpdate(productToUpdate, productToUpdate)}>Save</button>
            <button className='btn btn-secondary' onClick={handleCancel}>Cancel</button>
          </td>
        </tr>
      )}
    </tbody>
  );
};

return (
  <div>
  <div className='table-responsive'>
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
    <ProductQuantityForm products={products} />
    </div>
  );
}

export default ProductList;
