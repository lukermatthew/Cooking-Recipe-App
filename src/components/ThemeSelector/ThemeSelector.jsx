import "./themeSelector.css";
import { useTheme } from "../../hooks/useTheme";
import DarkModeIcon from "../../assets/dark.svg";
import LightModeIcon from "../../assets/light.svg";

const themeColors = ["#249c6b", "#b70233", "#00337C"];

const ThemeSelector = () => {
  const { mode, changeColor, changeMode } = useTheme();

  const toggleMode = () => {
    changeMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        {mode === "light" ? (
          <img
            onClick={toggleMode}
            src={DarkModeIcon}
            style={{
              cursor: "pointer",
            }}
            alt="dark/light toggle icon"
          />
        ) : (
          <img
            onClick={toggleMode}
            src={LightModeIcon}
            style={{
              filter: mode === "dark" ? "invert(100%)" : "invert(20%)",
              cursor: "pointer",
            }}
            alt="dark/light toggle icon"
          />
        )}
      </div>
      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
