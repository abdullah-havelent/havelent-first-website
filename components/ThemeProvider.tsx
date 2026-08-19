"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "charcoal";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("havelent-theme") as Theme | null;

    if (savedTheme === "charcoal") {
      setTheme("charcoal");
      document.documentElement.classList.add("charcoal");
    } else {
      setTheme("dark");
      document.documentElement.classList.remove("charcoal");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "charcoal" : "dark";

    setTheme(newTheme);
    localStorage.setItem("havelent-theme", newTheme);

    document.documentElement.classList.toggle(
      "charcoal",
      newTheme === "charcoal"
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}