import React, { useState } from 'react';

export const TabContext = React.createContext();
const TabProvider = ({ index, onChangeIndex, children }) => {
  const [screens, setScreens] = useState();

  return (
    <TabContext.Provider
      value={{
        screens,
        setScreens,
        index,
        onChangeIndex,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

export default TabProvider;
