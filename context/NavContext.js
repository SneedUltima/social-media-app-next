"use client";
import { useState, createContext, useContext } from "react";

const NavContext = createContext();
const SetNavContext = createContext();

export function useUser() {
  return useContext(NavContext);
}
export function useSetUser() {
  return useContext(SetNavContext);
}

export function UserProvider({ children }) {
  const [nav, setNav] = useState(false);

  return (
    <NavContext.Provider value={nav}>
      <SetNavContext.Provider value={setNav}>{children}</SetNavContext.Provider>
    </NavContext.Provider>
  );
}
