"use client";
import { useState, createContext } from "react";

const NavContext = createContext();

export function NavProvider({ children }) {
  const [nav, setNav] = useState(false);

  return (
    <NavContext.Provider value={{ nav, setNav }}>
      {children}
    </NavContext.Provider>
  );
}

export default NavContext;
