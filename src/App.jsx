import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/HomePage";
import Create from "./pages/create/CreatePage";
import Edit from "./pages/edit/EditPage";
import Recipe from "./pages/recipe/RecipePage";
import Navbar from "./components/Navbar/Navbar";
import SearchPage from "./pages/search/SearchPage";
import "./App.css";
import ThemeSelector from "./components/ThemeSelector/ThemeSelector";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { mode } = useTheme();

  return (
    <div className={`App ${mode}`}>
      <Router>
        <Navbar />
        <ThemeSelector />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/recipes/:id" element={<Recipe />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
