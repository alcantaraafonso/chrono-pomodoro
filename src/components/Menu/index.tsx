import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from "lucide-react";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { RouterLink } from "../RouterLink";

type AvailabeThemes = "dark" | "light";

export function Menu() {
  const [theme, setTheme] = useState<AvailabeThemes>(() => {
    return (localStorage.getItem("theme") as AvailabeThemes) || "dark";
  });

  function handleThemeClick(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault(); //Não executa o link
    setTheme((prevState) => {
      const nextTheme = prevState === "dark" ? "light" : "dark";
      return nextTheme;
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]); //Diz que este useEffect executa quando theme muda

  //Lookup Table
  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  return (
    <nav className={styles.menu}>
      {/* <Link
        className={styles.menuLink}
        to="/"
        aria-label="Ir para home"
        title="Ir para home"
      >
        <HouseIcon />
      </Link> */}
      <RouterLink
        className={styles.menuLink}
        href="/"
        aria-label="Ir para home"
        title="Ir para home"
      >
        <HouseIcon />
      </RouterLink>
      <RouterLink
        className={styles.menuLink}
        href="/history"
        aria-label="Ver histórico"
        title="Ver histórico"
      >
        <HistoryIcon />
      </RouterLink>
      <RouterLink
        className={styles.menuLink}
        href="/settings"
        aria-label="Configurações"
        title="Configurações"
      >
        <SettingsIcon />
      </RouterLink>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Mudar tema"
        title="Mudar tema"
        onClick={handleThemeClick}
      >
        {nextThemeIcon[theme]}
      </a>
    </nav>
  );
}
