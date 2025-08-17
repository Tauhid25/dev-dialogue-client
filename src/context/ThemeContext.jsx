import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext("light");

export const ThemeProvider = ({ children }) => {
  const [darkMood, setDarkMood] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if(darkMood){
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }else{
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMood]);
  return (
    <ThemeContext.Provider value={{ darkMood, setDarkMood }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useDarkMood=()=>useContext(ThemeContext)

