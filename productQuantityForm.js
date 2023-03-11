import React, { useState } from 'react';

function renderModal(materials, onClose) {
  console.log(materials,'renderModal')
  const show = materials ? "show" : "";
  return (
    <div className={`modal ${show}`} onClick={onClose}>
      <div className="modal-dialog">
        <div className="modal-content">
          <h2>Required Materials</h2>
          {Object.entries(materials).map(([material, quantity]) => (
            <div key={material}>
              {material}: {quantity}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductQuantityForm(props) {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [desiredQuantity, setDesiredQuantity] = useState('');
  const [requiredMaterials, setRequiredMaterials] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setDesiredQuantity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedProduct && desiredQuantity) {
      const product = props.products.find((p) => p.name === selectedProduct);
      if (product) {
        const materials = calculateRequiredMaterials(product, desiredQuantity);
        setRequiredMaterials(materials);
        setIsModalOpen(true);
      }
    }
  };

  const calculateRequiredMaterials = (product, desiredQuantity) => {
    const materials = {};
    product.materials.forEach((material) => {
      materials[material.name] = material.quantity * desiredQuantity;
    });
    return materials;
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRequiredMaterials(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
  }

  return (
    <div className='mqc-c'>
      <form className="mqc form-group" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="product-select">Select a product:</label>
          <select
            className="form-control"
            id="product-select"
            value={selectedProduct}
            onChange={handleProductChange}
          >
            <option value="">-- Select a product --</option>
            {props.products.map((product) => (
              <option key={product.name} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quantity-input">Desired quantity:</label>
          <input
            type="number"
            className="form-control"
            id="quantity-input"
            value={desiredQuantity}
            onChange={handleQuantityChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Calculate
        </button>
      </form>
      {isModalOpen && renderModal(requiredMaterials, closeModal)}
    </div>
  );
}

export default ProductQuantityForm;
