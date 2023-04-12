// create an order context provider 
import React,{ createContext, useState, useEffect } from 'react';

export const OrderContext = createContext();

const OrderContextProvider = (props) => {
  const [order, setOrder] = useState([]);

  const [total, setTotal] = useState(0);
  const [tip, setTip] = useState(0);
  const [processingFee, setProcessingFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [note,setNote] = useState('');

  useEffect(() => {
    setTotal(parseFloat(order.reduce((acc, item) => {
      return acc + item.price * item.count;
    }, 0)))

    const tipValue = 0.05
    const processingFeeValue = 0.05
    setTip(parseFloat((total * tipValue).toFixed(2)))
    setProcessingFee(parseFloat((total * processingFeeValue).toFixed(2)))
    setTotalAmount(parseFloat((total + tip + processingFee).toFixed(2)))

  }, [order, processingFee, tip, total, totalAmount]);

  
  const addToOrder = ({name,price,count = 1}) => {
    if (!order.find(item => item.name === name)) {
      setOrder([...order, { name, price, count, isEditing: false }]);
      console.log("ITEM:::",order)
      return false;
    }

    setOrder(
      order.map(item =>
        item.name === name ? { ...item, count: item.count + 1 } : { ...item }
      )
    );
    console.log("ITEM:::",order)
  }

  const removeFromOrder = ({name}) => {
    if (order.find(item => item.name === name)) {
      setOrder(
        order.map(item =>
          item.name === name && item.count > 0
          ? { ...item, count: item.count - 1 }
          : item
        ).filter(item => item.count !== 0)
      );
    }
  }

  const value = {
    order,
    setOrder,
    note,
    setNote,
    addToOrder,
    removeFromOrder,
    total, 
    tip,
    processingFee, 
    totalAmount
}

  return (
    <OrderContext.Provider value={value}>
      {props.children}
    </OrderContext.Provider>
  );
}

export default OrderContextProvider;
