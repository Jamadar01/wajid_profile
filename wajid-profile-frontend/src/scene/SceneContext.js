import React, { createContext, useContext, useState } from 'react';

const SceneContext = createContext(null);
export const useScene = () => useContext(SceneContext);

export function SceneProvider({ children }) {
  const [active, setActive] = useState('hero');
  return (
    <SceneContext.Provider value={{ active, setActive }}>
      {children}
    </SceneContext.Provider>
  );
}
