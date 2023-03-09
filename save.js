import React, { useEffect } from "react";

function LocalStorageHandler({ materials, products }) {
    useEffect(() => {
      localStorage.setItem('materials', JSON.stringify(materials));
    }, [materials]);
  
    useEffect(() => {
      localStorage.setItem('products', JSON.stringify(products));
    }, [products]);
  
    return null;
  }
  
  

export default LocalStorageHandler;
