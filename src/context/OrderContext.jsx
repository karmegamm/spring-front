import React, { createContext, useContext, useState } from "react";

const OrderContext = createContext();

// Create a provider component
export function OrderProvider({ children }) {
  const [select, setSelect] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  
  return (
    <OrderContext.Provider value={{ select, setSelect,selectedItems,setSelectedItems}}>
      {children}
    </OrderContext.Provider>
  );
}

// Create a custom hook to use the context
export function useOrder() {
  return useContext(OrderContext);
}
