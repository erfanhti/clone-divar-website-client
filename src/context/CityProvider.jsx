import { createContext, useState } from "react";

const CityContext = createContext();

const CityProvider = ({ children }) => {
  const [selectedCities, setSelectedCities] = useState(["تهران"]);

  return (
    <CityContext.Provider value={{ selectedCities, setSelectedCities }}>
      {children}
    </CityContext.Provider>
  );
};

export { CityContext, CityProvider };
