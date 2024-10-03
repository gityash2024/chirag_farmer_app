import React, { createContext, useState, useContext } from 'react';

const GlobalRefreshContext = createContext();

export const useGlobalRefresh = () => useContext(GlobalRefreshContext);

export const GlobalRefreshProvider = ({ children }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async (refreshFunction) => {
    setRefreshing(true);
    if (refreshFunction) {
      await refreshFunction();
    }
    setRefreshing(false);
  };

  return (
    <GlobalRefreshContext.Provider value={{ refreshing, onRefresh }}>
      {children}
    </GlobalRefreshContext.Provider>
  );
};