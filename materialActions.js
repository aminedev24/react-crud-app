import React, { useState } from 'react';

const MaterialActions = ({ material, onDelete, handleEdit }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="material-actions-container">
      <button className="material-actions-toggle" onClick={toggleMenu}>
        <i className="fas fa-ellipsis-v"></i>
      </button>
      {showMenu && (
        <div className="material-actions-menu">
          <button className="btn btn-sm btn-danger" onClick={() => onDelete(material)}>
            <i className="fas fa-trash"></i> 
          </button>
          <button className="btn btn-sm btn-info" onClick={() => handleEdit(material)}>
            <i className="fas fa-pen"></i> 
          </button>
          {/* add additional options here */}
        </div>
      )}
    </div>
  );
};

export default MaterialActions;
