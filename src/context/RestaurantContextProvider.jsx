// Create a context provider for Retaurant name,address,phone number,images and logo

import React,{ createContext, useState, useEffect } from 'react';

export const RestaurantContext = createContext();

const RestaurantContextProvider = (props) => {
  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    setRestaurant({
      name: "Burger House",
      address: "1234 Main St, Anytown, CA 12345",
      openTime: "11:00 am",
      closeTime: "10:00 pm",
      openDays: "Mon - Sun",
      phone: "555-555-5555",
      logo: "logo.png",
      image: "restaurant.jpg",
      paymentMethods:["MoMo",'Vodafone Cash','tigoCash','VISA','MasterCard']
    });
  }, []);
  

  const value = {
    restaurant,
    setRestaurant
  }

  return (
    <RestaurantContext.Provider value={value}>
      {props.children}
    </RestaurantContext.Provider>
  );
}

export default RestaurantContextProvider;

