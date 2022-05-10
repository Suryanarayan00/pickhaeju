import React, { useContext, useEffect } from 'react';
import { TabContext } from '#components/TabScene/index';

 const TabScreens = ({ type, children }) => {
  const { setScreens, index, onChangeIndex } = useContext(TabContext);

  const screens = React.Children.toArray(children);

  useEffect(() => {
    setScreens(screens);
  }, [children]);

  return <>{screens[index || 0]}</>;
};

export default TabScreens;
