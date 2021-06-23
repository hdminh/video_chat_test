import React, { useState, createContext } from "react";

export const RestaurantContext = createContext(null);

export const RestaurantProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [total, setTotal] = useState(0);
  const [restaurant, setRestaurant] = useState(null);
  const [params, setParams] = useState({})
  const [open, setOpen] = useState(false);
  return (
    <RestaurantContext.Provider
      value={{
        restaurants: [list, setList],
        recommendedContext: [recommended, setRecommended],
        totalPage: [total, setTotal],
        paramQuery: [params, setParams],
        loadings: [loading, setLoading],
        restaurantContext: [restaurant, setRestaurant],
        paramsContext: [params, setParams],
        dialogContext: [open, setOpen]

      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
