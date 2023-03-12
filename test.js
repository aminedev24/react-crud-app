import { useState } from 'react';

const ProductsTable = ({ productsList, handleProductDelete, handleEdit, handleMaterialUpdate, handleCancel }) => {
  const [showMaterials, setShowMaterials] = useState(false);

  const toggleMaterials = () => {
    setShowMaterials(!showMaterials);
  };

  const renderProducts = () => {
    return (
      <tbody>
        {productsList.map((product, index) => (
          <tr key={`${product.name}-${index}`}>
            <td>{product.name}</td>
            <td className='m-cell'>
              {showMaterials &&
                product.materials.map((material) => (
                  <p className='m-list' key={material.name}>
                    {material.name} | <strong> prix:</strong> {(material.quantity * material.price / product.quantity)} | <strong> qty</strong>: {material.quantity}
                  </p>
                ))}
            </td>
            <td>{product.quantity}</td>
            <td>{product.price}</td>
            <td>
              <button className='btn btn-danger btn-sm' onClick={() => handleProductDelete(product)}>
                Delete
              </button>
              <button className='btn btn-info btn-sm' onClick={() => handleEdit(product)}>
                Edit
              </button>
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
              <button className='btn btn-info' onClick={() => handleMaterialUpdate(productToUpdate, productToUpdate)}>
                Save
              </button>
              <button className='btn btn-secondary' onClick={handleCancel}>
                Cancel
              </button>
            </td>
          </tr>
        )}
      </tbody>
    );
  };

  return (
    <div className='table-responsive'>
      <h2>Products:</h2>
      <button className='btn btn-info' onClick={toggleMaterials}>
        {showMaterials ? 'Hide Materials' : 'Show Materials'}
      </button>
      <table className='table table-bordered'>
        <thead className='table-dark'>
          <tr>
            <th>Name</th>
            <th>{showMaterials ? 'Materials' : ''}</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
          {showMaterials && (
            <tr>
              <th></th>
              <th>Qty</th>
              <th>Price</th>
              <th></th>
              <th></th>
            </tr>
          )}
        </thead>
        {renderProducts()}
      </table>
      
      </div>
      )
}