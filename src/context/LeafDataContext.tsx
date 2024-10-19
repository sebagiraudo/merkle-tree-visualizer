import React, { createContext, useState } from 'react';

interface LeafDataContextType {
  leafData: string[];
  setLeafData: React.Dispatch<React.SetStateAction<string[]>>;
}

export const LeafDataContext = createContext<LeafDataContextType | undefined>(
  undefined
);

export const LeafDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [leafData, setLeafData] = useState<string[]>([]);

  return (
    <LeafDataContext.Provider value={{ leafData, setLeafData }}>
      {children}
    </LeafDataContext.Provider>
  );
};
