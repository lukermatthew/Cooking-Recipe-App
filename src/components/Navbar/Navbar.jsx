import { useContext } from "react";
import { Link } from "react-router-dom";
import Searchbar from "../SearchBar/SearchBar";
import { useTheme } from "../../hooks/useTheme";
import "./navbar.css";

const Navbar = () => {
  // const { color } = useContext(ThemeContext);
  const { color, changeColor } = useTheme();
  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1>Cooking Recipe</h1>
        </Link>
        <Searchbar />
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
};

export default Navbar;
